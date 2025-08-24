
# Guía de Uso: Barra de Navegación Lateral (Navigation Rail)

La Barra de Navegación Lateral (Navigation Rail) es un componente de interfaz de usuario que permite a los usuarios cambiar entre diferentes vistas o secciones de una aplicación. Se coloca verticalmente a lo largo del borde lateral de la pantalla y es una alternativa eficiente a la barra de navegación inferior en pantallas más grandes.

## Cuándo Usar una Navigation Rail

*   **Pantallas Medianas a Grandes:** Ideal para tamaños de ventana de 600dp o más, como tabletas en modo horizontal o escritorios. Es una excelente opción para aplicaciones que se adaptan a diferentes tamaños de pantalla.
*   **Navegación Principal:** Para aplicaciones con 3 a 7 destinos de nivel superior.
*   **Alternativa al Navigation Drawer:** En Material Design 3, se recomienda como una alternativa más moderna y visible al `Navigation Drawer` (cajón de navegación).

**Importante:** Para pantallas más pequeñas (móviles), la `Navigation Bar` (barra de navegación inferior) sigue siendo la opción recomendada.

## Tipos de Navigation Rail

Material Design 3 define dos tipos principales de Navigation Rail:

### 1. Collapsed Navigation Rail (Barra de Navegación Lateral Colapsada)

![Ejemplo de Collapsed Navigation Rail](https://m3.material.io/assets/images/components/navigation-rail/collapsed-navigation-rail.png)

*   **Descripción:** Es una versión compacta que se ejecuta a lo largo del borde principal de la ventana. Contiene solo los iconos y, opcionalmente, etiquetas de texto.
*   **Cuándo usarla:** Cuando el espacio es limitado en pantallas medianas, o cuando quieres una navegación discreta pero siempre visible.

### 2. Expanded Navigation Rail (Barra de Navegación Lateral Expandida)

![Ejemplo de Expanded Navigation Rail](https://m3.material.io/assets/images/components/navigation-rail/expanded-navigation-rail.png)

*   **Descripción:** Una versión más ancha que muestra tanto los iconos como las etiquetas de texto de forma prominente. Puede ser estándar (colocada junto al contenido) o modal (superponiéndose al contenido).
*   **Cuándo usarla:** Para pantallas más grandes donde hay suficiente espacio, o cuando necesitas que todos los destinos de navegación sean muy claros y visibles. Es ideal para aplicaciones con muchos elementos de navegación.

## Resumen Rápido

*   **Uso:** Navegación principal en tabletas y escritorios (pantallas medianas a grandes).
*   **Tipos:** Colapsada (compacta) o Expandida (más visible).
*   **Alternativa:** Reemplaza al `Navigation Drawer` en M3.
