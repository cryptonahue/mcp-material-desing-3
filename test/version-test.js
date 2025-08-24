/**
 * Test para validar la herramienta get_version
 */

import { executeToolCall } from '../dist/tools/executor.js';

async function testGetVersion() {
  console.log('🧪 Testing get_version tool...\n');
  
  const result = await executeToolCall('get_version', {});
  
  if (result.success) {
    const versionInfo = result.data;
    
    console.log('✅ Version tool executed successfully!\n');
    
    console.log('📦 Basic Info:');
    console.log(`  Name: ${versionInfo.name}`);
    console.log(`  Version: ${versionInfo.version}`);
    console.log(`  Description: ${versionInfo.description}`);
    console.log(`  Build Date: ${versionInfo.buildDate}\n`);
    
    console.log('🚀 Features:');
    console.log(`  Scientific HCT: ${versionInfo.features.scientificHCT ? '✅' : '❌'}`);
    console.log(`  Component Count: ${versionInfo.features.componentCount}`);
    console.log(`  Tool Count: ${versionInfo.features.toolCount}`);
    console.log(`  Material Design Version: ${versionInfo.features.materialDesignVersion}\n`);
    
    console.log('📚 Dependencies:');
    console.log(`  Material Color Utilities: ${versionInfo.dependencies.materialColorUtilities}`);
    console.log(`  MCP SDK: ${versionInfo.dependencies.mcpSdk}`);
    console.log(`  Zod: ${versionInfo.dependencies.zod}`);
    console.log(`  TypeScript: ${versionInfo.dependencies.typescript}\n`);
    
    console.log('🛠️ Capabilities:');
    versionInfo.capabilities.forEach((capability, index) => {
      console.log(`  ${index + 1}. ${capability}`);
    });
    
    console.log('\n📝 Latest Changes:');
    console.log(`  ${versionInfo.changelog.latest}\n`);
    
    console.log('🏆 Major Milestones:');
    versionInfo.changelog.major.forEach((milestone, index) => {
      console.log(`  ${index + 1}. ${milestone}`);
    });
    
    // Validate expected fields are present
    const requiredFields = [
      'version', 'name', 'description', 'buildDate', 'features', 
      'dependencies', 'capabilities', 'changelog'
    ];
    
    const missingFields = requiredFields.filter(field => !versionInfo[field]);
    
    if (missingFields.length === 0) {
      console.log('\n✅ All required fields present in version info');
    } else {
      console.log(`\n❌ Missing fields: ${missingFields.join(', ')}`);
    }
    
    // Validate scientific HCT feature is properly flagged
    if (versionInfo.features.scientificHCT) {
      console.log('✅ Scientific HCT feature correctly enabled');
    } else {
      console.log('❌ Scientific HCT feature not flagged as enabled');
    }
    
    console.log(`\n📊 Total message length: ${result.message.length} characters`);
    
  } else {
    console.log(`❌ Version tool failed: ${result.message}`);
  }
}

async function runVersionTest() {
  console.log('🚀 Material Tailwind MCP - Version Tool Test\n');
  console.log('=' .repeat(60));
  
  try {
    await testGetVersion();
    
    console.log('\n' + '=' .repeat(60));
    console.log('🎉 Version tool test completed successfully!');
    
    console.log('\n💡 Usage examples:');
    console.log('  • Claude Desktop: Use "get_version" to check MCP status');
    console.log('  • Debugging: Verify which features are available');
    console.log('  • Support: Share version info when reporting issues');
    console.log('  • Development: Track capability changes over time');
    
  } catch (error) {
    console.error('\n💥 Version test failed:', error);
  }
}

runVersionTest();