# Ejemplo: Uso de get_version

La herramienta `get_version` permite conocer información detallada sobre la versión y capacidades del Material Tailwind MCP.

## Uso Básico

```typescript
// Llamada simple sin parámetros
const versionInfo = await client.request({
  method: "tools/call",
  params: {
    name: "get_version",
    arguments: {}
  }
});
```

## Respuesta Típica

```json
{
  "success": true,
  "data": {
    "version": "0.1.0",
    "name": "material-tailwind-mcp",
    "description": "Model Context Protocol server for Material Design 3 + Tailwind CSS components",
    "buildDate": "2025-08-19",
    "features": {
      "scientificHCT": true,
      "componentCount": 5,
      "toolCount": 6,
      "materialDesignVersion": "3.0"
    },
    "dependencies": {
      "materialColorUtilities": "^0.2.7",
      "mcpSdk": "^0.4.0",
      "zod": "^3.22.4",
      "typescript": "^5.0.0"
    },
    "capabilities": [
      "Scientific HCT Color Generation",
      "Material Design 3 Components",
      "Tailwind CSS Integration",
      "Alpine.js Support",
      "Icon Search (Material Design)",
      "Responsive Layout Generation",
      "Light/Dark Theme Support",
      "CSS & Tailwind Output",
      "Component Information Lookup",
      "Real-time Component Preview"
    ],
    "changelog": {
      "latest": "Implemented scientific HCT algorithm for accurate Material Design 3 colors",
      "major": [
        "v0.1.0 - Initial MCP implementation with 5 tools and scientific HCT",
        "v0.1.0 - Added Material Design 3 component library",
        "v0.1.0 - Integrated @material/material-color-utilities",
        "v0.1.0 - Scientific color validation and testing"
      ]
    }
  },
  "message": "Material Tailwind MCP v0.1.0 - Model Context Protocol server for Material Design 3 + Tailwind CSS components"
}
```

## Casos de Uso

### 1. Verificar Capacidades Disponibles
```typescript
const info = await getVersion();
if (info.data.features.scientificHCT) {
  console.log("✅ Algoritmo HCT científico disponible");
  // Usar generate_theme con confianza
}
```

### 2. Debugging y Soporte
```typescript
const version = await getVersion();
console.log(`Usando MCP v${version.data.version}`);
console.log(`Dependencias: ${JSON.stringify(version.data.dependencies, null, 2)}`);
```

### 3. Verificar Herramientas Disponibles
```typescript
const info = await getVersion();
console.log(`Total de herramientas disponibles: ${info.data.features.toolCount}`);
console.log("Capacidades:", info.data.capabilities);
```

### 4. Compatibilidad de Versiones
```typescript
const info = await getVersion();
const majorVersion = info.data.version.split('.')[0];

if (majorVersion === '0') {
  console.log("⚠️ Versión de desarrollo - API puede cambiar");
} else {
  console.log("✅ Versión estable");
}
```

## Información Clave Retornada

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `version` | Versión semántica del MCP | "0.1.0" |
| `scientificHCT` | Si está habilitado el algoritmo científico | `true` |
| `toolCount` | Número total de herramientas | `6` |
| `capabilities` | Lista de capacidades disponibles | Array de strings |
| `dependencies` | Versiones de dependencias clave | Objeto con versiones |
| `changelog.latest` | Último cambio importante | String descriptivo |

## Beneficios

1. **Debugging**: Verificar qué versión está ejecutándose
2. **Compatibilidad**: Confirmar que las características necesarias están disponibles
3. **Soporte**: Información completa para reportar problemas
4. **Desarrollo**: Tracking de capacidades entre versiones

Esta herramienta es especialmente útil cuando se integra el MCP en aplicaciones que necesitan verificar capacidades específicas antes de hacer llamadas a otras herramientas.