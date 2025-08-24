/**
 * Material Tailwind MCP Usage Examples
 * 
 * This file demonstrates how to use the Material Tailwind MCP
 * in various scenarios and with different tools.
 */

// Example: Generate a simple button
const buttonExample = {
  tool: "generate_component",
  params: {
    type: "button",
    variant: "filled",
    props: {
      text: "Get Started",
      size: "large"
    }
  },
  expectedOutput: {
    success: true,
    data: {
      type: "button",
      variant: "filled",
      framework: "css-only",
      html: `<button class="btn btn--filled btn--large">
  <span class="btn-content">
    <span class="btn-label">Get Started</span>
  </span>
</button>`,
      css: "/* Button styles are included in the main CSS file */",
    }
  }
};

// Example: Generate a button with Alpine.js
const alpineButtonExample = {
  tool: "generate_component",
  params: {
    type: "button",
    variant: "outlined",
    props: {
      text: "Click me",
      icon: "leading",
      iconName: "add"
    },
    framework: "alpine"
  },
  expectedOutput: {
    success: true,
    data: {
      framework: "alpine",
      html: `<button class="btn btn--outlined btn--icon-leading">
  <span class="btn-content">
    <span class="btn-icon material-icons">add</span>
    <span class="btn-label">Click me</span>
  </span>
</button>`,
      js: "// Button Alpine.js behavior"
    }
  }
};

// Example: Generate a custom theme
const themeExample = {
  tool: "generate_theme",
  params: {
    seedColor: "#FF5722",
    name: "orange-sunset",
    darkMode: true,
    outputFormat: "both"
  },
  expectedOutput: {
    success: true,
    data: {
      name: "orange-sunset",
      seedColor: "#FF5722",
      css: ":root { /* Generated CSS variables */ }",
      tailwind: "// Tailwind config extension",
      palette: {
        primary: ["#2D1B0F", "#4A2C1A", "..."],
        secondary: ["...", "..."],
        tertiary: ["...", "..."],
        neutral: ["...", "..."]
      }
    }
  }
};

// Example: Search for icons
const iconSearchExample = {
  tool: "search_icons",
  params: {
    query: "home",
    style: "filled",
    size: 24
  },
  expectedOutput: {
    success: true,
    data: {
      query: "home",
      total: 3,
      icons: [
        {
          name: "home",
          categories: ["action"],
          tags: ["house", "main", "start"],
          styles: ["filled", "outlined", "round", "sharp"],
          unicode: "e88a",
          svg: "<svg>...</svg>"
        }
      ]
    }
  }
};

// Example: Create a complete page layout
const layoutExample = {
  tool: "create_layout",
  params: {
    type: "page",
    components: ["button", "card", "textfield", "navigation-bar"],
    responsive: true,
    theme: "orange-sunset"
  },
  expectedOutput: {
    success: true,
    data: {
      type: "page",
      html: "<!DOCTYPE html>...",
      css: "/* Page layout styles */",
      components: ["button", "card", "textfield", "navigation-bar"],
      responsive: true
    }
  }
};

// Example: Get component information
const componentInfoExample = {
  tool: "get_component_info",
  params: {
    component: "button"
  },
  expectedOutput: {
    success: true,
    data: {
      name: "Button",
      description: "Versatile button component with Material Design 3 styling",
      category: "Actions",
      variants: ["filled", "outlined", "text", "elevated", "tonal"],
      props: [
        {
          name: "text",
          type: "string",
          description: "Button text content",
          default: "Button",
          required: false
        }
      ],
      features: ["Multiple variants", "Icon support", "Size variants"],
      examples: [
        {
          title: "Basic Button",
          description: "Simple filled button",
          code: '<button class="btn btn--filled">Click me</button>'
        }
      ]
    }
  }
};

// Example conversation flow with Claude
const conversationExample = {
  user: "I need a login form with Material Design",
  
  llm_reasoning: `
    The user wants a login form with Material Design. I should:
    1. Use Material Design 3 components
    2. Include text fields for username/password
    3. Add buttons for login action
    4. Make it responsive and accessible
    
    I'll use the Material Tailwind MCP to generate the components.
  `,
  
  mcp_calls: [
    {
      tool: "generate_component",
      params: {
        type: "textfield",
        variant: "outlined",
        props: {
          label: "Email",
          type: "email"
        }
      }
    },
    {
      tool: "generate_component", 
      params: {
        type: "textfield",
        variant: "outlined",
        props: {
          label: "Password",
          type: "password"
        }
      }
    },
    {
      tool: "generate_component",
      params: {
        type: "button",
        variant: "filled",
        props: {
          text: "Sign In",
          size: "large"
        }
      }
    },
    {
      tool: "create_layout",
      params: {
        type: "section",
        components: ["textfield", "button"],
        responsive: true
      }
    }
  ],
  
  llm_response: `
    Here's a Material Design 3 login form for you:
    
    [Generated HTML code with proper Material Design styling]
    
    This form includes:
    - Outlined text fields with floating labels
    - Proper validation styling
    - Responsive design
    - Accessibility features
    - Material Design 3 color scheme
  `
};

// Example: Building a dashboard
const dashboardExample = {
  scenario: "Building an admin dashboard",
  
  steps: [
    {
      step: 1,
      description: "Generate a custom theme",
      tool: "generate_theme",
      params: {
        seedColor: "#1976D2",
        name: "admin-blue"
      }
    },
    {
      step: 2,
      description: "Create navigation",
      tool: "generate_component",
      params: {
        type: "navigation-bar",
        props: {
          items: ["Dashboard", "Users", "Settings"]
        }
      }
    },
    {
      step: 3,
      description: "Create metric cards",
      tool: "generate_component",
      params: {
        type: "card",
        variant: "elevated",
        props: {
          title: "Total Users",
          content: "1,234"
        }
      }
    },
    {
      step: 4,
      description: "Assemble the layout",
      tool: "create_layout",
      params: {
        type: "page",
        components: ["navigation-bar", "card", "table", "button"],
        theme: "admin-blue"
      }
    }
  ]
};

export {
  buttonExample,
  alpineButtonExample,
  themeExample,
  iconSearchExample,
  layoutExample,
  componentInfoExample,
  conversationExample,
  dashboardExample
};