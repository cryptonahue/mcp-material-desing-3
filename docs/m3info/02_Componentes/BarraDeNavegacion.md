
# Guía de Uso: Barra de Navegación (Navigation Bar)

La barra de navegación es un componente fundamental para la arquitectura de una aplicación móvil. Aparece en la parte inferior de la pantalla y permite a los usuarios moverse entre los destinos principales de la app de forma rápida y consistente.

![Ejemplo de Barra de Navegación](https://m3.material.io/assets/images/components/navigation-bar/navigation-bar-usage.png)

## Cuándo Usar una Barra de Navegación

*   **Para la navegación principal:** Úsala para las 3 a 5 secciones más importantes de tu aplicación.
*   **Solo en móvil y tablet:** Este componente está diseñado específicamente para pantallas de tamaño pequeño a mediano. En pantallas de escritorio, se deben usar otros patrones de navegación como un `Navigation Rail` (barra lateral) o `Tabs` (pestañas).

**Importante:** No la uses si tienes menos de 3 destinos o más de 5. Si tienes solo 2, usa `Tabs`. Si tienes más de 5, considera usar un `Navigation Drawer` (menú lateral deslizable).

## Estructura y Comportamiento

Una barra de navegación bien implementada sigue estas reglas:

1.  **Destinos:**
    *   Cada destino se representa con un **icono** y una **etiqueta de texto**.
    *   **Recomendación:** Siempre muestra la etiqueta de texto. Es crucial para la accesibilidad y para que los usuarios entiendan claramente a dónde lleva cada icono. No uses solo iconos.

2.  **Estado Activo:**
    *   El destino actualmente seleccionado debe estar claramente diferenciado del resto. Esto se logra usando un icono relleno (en lugar de contorneado) y un indicador visual en forma de píldora.

3.  **Comportamiento al Tocar:**
    *   Al tocar un destino, el usuario navega inmediatamente a esa sección.
    *   Si el usuario vuelve a tocar el destino que ya está activo, la vista de esa sección debería volver al inicio (por ejemplo, subiendo al principio de una lista).

4.  **Comportamiento al Desplazar (Scroll):**
    *   La barra de navegación puede ocultarse cuando el usuario se desplaza hacia abajo para darle más espacio al contenido.
    *   Debe reaparecer en cuanto el usuario empieza a desplazarse hacia arriba.

## Notificaciones (Badges)

Puedes añadir un "badge" (una pequeña insignia) a un icono de la barra de navegación para indicar que hay contenido nuevo o notificaciones sin leer en esa sección. Puede ser un simple punto o un número.

![Ejemplo de Badge en Barra de Navegación](https://m3.material.io/assets/images/components/navigation-bar/navigation-bar-badge.png)

## Resumen Rápido

*   **Uso:** 3 a 5 destinos principales en móvil/tablet.
*   **Siempre:** Muestra iconos y etiquetas de texto.
*   **Indica claramente:** Cuál es el destino activo.
*   **No uses:** Para menos de 3 o más de 5 destinos.
*   **En escritorio:** Usa `Navigation Rail` o `Tabs` en su lugar.
