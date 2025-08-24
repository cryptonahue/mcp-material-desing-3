/**
 * Manual test script to verify MCP tools work correctly
 */

import { executeToolCall } from '../dist/tools/executor.js';

async function testGenerateComponent() {
  console.log('🧪 Testing generate_component...');
  
  const result = await executeToolCall('generate_component', {
    type: 'button',
    variant: 'filled',
    props: {
      text: 'Test Button',
      size: 'large'
    }
  });
  
  console.log('✅ Component generation result:', result.success);
  if (result.success) {
    console.log('📝 Generated HTML length:', result.data.html.length);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function testGenerateTheme() {
  console.log('\n🧪 Testing generate_theme...');
  
  const result = await executeToolCall('generate_theme', {
    seedColor: '#FF5722',
    name: 'test-theme'
  });
  
  console.log('✅ Theme generation result:', result.success);
  if (result.success) {
    console.log('🎨 Theme name:', result.data.name);
    console.log('📝 CSS length:', result.data.css.length);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function testSearchIcons() {
  console.log('\n🧪 Testing search_icons...');
  
  const result = await executeToolCall('search_icons', {
    query: 'home'
  });
  
  console.log('✅ Icon search result:', result.success);
  if (result.success) {
    console.log('🔍 Found icons:', result.data.total);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function testGetComponentInfo() {
  console.log('\n🧪 Testing get_component_info...');
  
  const result = await executeToolCall('get_component_info', {
    component: 'button'
  });
  
  console.log('✅ Component info result:', result.success);
  if (result.success) {
    console.log('📚 Component:', result.data.name);
    console.log('🎭 Variants:', result.data.variants.length);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function testCreateLayout() {
  console.log('\n🧪 Testing create_layout...');
  
  const result = await executeToolCall('create_layout', {
    type: 'section',
    components: ['button', 'card'],
    responsive: true
  });
  
  console.log('✅ Layout creation result:', result.success);
  if (result.success) {
    console.log('📱 Layout type:', result.data.type);
    console.log('📝 HTML length:', result.data.html.length);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function testGetVersion() {
  console.log('\n🧪 Testing get_version...');
  
  const result = await executeToolCall('get_version', {});
  
  console.log('✅ Version tool result:', result.success);
  if (result.success) {
    console.log('📦 MCP Version:', result.data.version);
    console.log('🧬 Scientific HCT:', result.data.features.scientificHCT ? 'Enabled' : 'Disabled');
    console.log('🛠️ Total Tools:', result.data.features.toolCount);
  } else {
    console.log('❌ Error:', result.message);
  }
}

async function runAllTests() {
  console.log('🚀 Starting Material Tailwind MCP Tests\n');
  
  try {
    await testGenerateComponent();
    await testGenerateTheme();
    await testSearchIcons();
    await testGetComponentInfo();
    await testCreateLayout();
    await testGetVersion();
    
    console.log('\n🎉 All tests completed!');
  } catch (error) {
    console.error('\n💥 Test failed:', error);
  }
}

runAllTests();