
# 03: Layout y Diseño Responsivo

El layout es la estructura que organiza todos los elementos en una pantalla. Un buen layout guía al usuario, crea jerarquía visual y hace que la información sea fácil de digerir. En el mundo actual, con tantos tamaños de pantalla diferentes, es crucial que este layout sea "responsivo" o "adaptativo".

Material Design 3 se enfoca en crear diseños adaptativos que se sientan naturales en cualquier dispositivo, desde un móvil pequeño hasta una pantalla de escritorio gigante.

## El Principio: Adaptarse al Espacio Disponible

En lugar de pensar en un diseño fijo, la idea es crear un sistema que se adapte de manera inteligente al ancho de la pantalla. Para simplificar esto, Material Design 3 define **Clases de Tamaño de Ventana (Window Size Classes)**. Son 5 rangos de anchos de pantalla:

1.  **Compact (Compacto):** La mayoría de los teléfonos en modo vertical.
2.  **Medium (Medio):** Tabletas pequeñas o teléfonos grandes en modo horizontal.
3.  **Expanded (Expandido):** La mayoría de las tabletas en modo horizontal y pantallas de portátiles.
4.  **Large (Grande):** Pantallas de escritorio.
5.  **Extra-large (Extra Grande):** Pantallas de escritorio muy anchas.

La idea no es diseñar para cada uno, sino entender que tu diseño debe cambiar en estos puntos de ruptura (breakpoints) para aprovechar mejor el espacio.

## Canonical Layouts (Diseños Canónicos)

Para ayudar en este proceso, M3 sugiere usar "diseños canónicos", que son plantillas o patrones de diseño probados para organizar el contenido.

*   **En pantallas `Compact` (móviles):** Generalmente se usa un diseño de una sola columna. El contenido fluye verticalmente. Para la navegación, se usa una `Barra de Navegación` en la parte inferior.

*   **En pantallas `Medium` y `Expanded` (tabletas y escritorio):** El espacio extra permite diseños más complejos. En lugar de una sola columna, puedes usar múltiples "paneles" (panes) de contenido. Por ejemplo:
    *   Un panel a la izquierda para la navegación (un `Navigation Rail`).
    *   Un panel principal en el centro para el contenido.
    *   Un panel a la derecha para información secundaria o detalles.

![Ejemplo de layout adaptativo](https://m3.material.io/assets/images/foundations/layout/responsive-layout-grid.png)

## La Grilla (Grid) de 8dp

Para mantener la consistencia en los espaciados y la alineación, Material Design usa una grilla base de 8dp (density-independent pixels). Esto significa que todos los márgenes, paddings y tamaños de los elementos deberían ser múltiplos de 8 (8, 16, 24, 32, etc.). Esto crea un ritmo visual agradable y ordenado.

## Aplicación Práctica con Herramientas

La herramienta `create_layout` está diseñada para ayudarte a aplicar estos principios.

*   **Tu tarea:** En lugar de pensar en pixeles, puedes pedir un layout basado en su estructura.
*   **Ejemplos de petición:**
    *   "Crea una `page` (página) que sea `responsive`."
    *   "Necesito una sección con un `grid` (grilla) de 2 columnas en pantallas grandes y 1 columna en móviles."
    *   "Genera un layout de tipo `flex` para alinear estos tres componentes horizontalmente."

Al pedir un layout, piensa en la **estructura** y la **relación** entre los elementos, y deja que la herramienta se encargue de los detalles de implementación para que se adapte a los diferentes tamaños de pantalla.
