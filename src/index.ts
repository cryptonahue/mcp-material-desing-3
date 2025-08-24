#!/usr/bin/env node

/**
 * Material Tailwind MCP Server
 * 
 * A Model Context Protocol server that provides tools and resources
 * for working with Material Design 3 components built with Tailwind CSS.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { setupTools } from './tools/index.js';
import { setupResources } from './resources/index.js';
import { logger } from './utils/logger.js';

/**
 * Main MCP Server class
 */
class MaterialTailwindMCPServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'material-tailwind-mcp',
        version: '0.1.0',
      }
    );

    this.setupHandlers();
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: await setupTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      try {
        logger.info(`Executing tool: ${name}`, { args });
        
        // Import and execute the appropriate tool
        const { executeToolCall } = await import('./tools/executor.js');
        const result = await executeToolCall(name, args);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Error executing tool ${name}:`, error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
          isError: true,
        };
      }
    });

    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: await setupResources(),
      };
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;
      
      try {
        logger.info(`Reading resource: ${uri}`);
        
        const { readResource } = await import('./resources/reader.js');
        const content = await readResource(uri);
        
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(content, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Error reading resource ${uri}:`, error);
        throw error;
      }
    });
  }

  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    logger.info('Material Tailwind MCP Server started');
  }
}

// Start the server
const server = new MaterialTailwindMCPServer();
server.start().catch((error) => {
  logger.error('Failed to start server:', error);
  process.exit(1);
});