
# Guía de Uso: Cajón de Navegación (Navigation Drawer)

El cajón de navegación (Navigation Drawer) es un panel que se desliza desde el lateral de la pantalla para proporcionar acceso a los destinos principales de la aplicación y a funcionalidades adicionales, como cambiar de cuenta o acceder a la configuración.

## Cuándo Usar un Cajón de Navegación

*   **Múltiples Destinos:** Recomendado para aplicaciones con cinco o más destinos de nivel superior, o con múltiples niveles de navegación.
*   **Navegación Rápida:** Para permitir una navegación rápida entre secciones no relacionadas de la aplicación.

## Tipos de Cajones de Navegación

Material Design 3 define dos tipos principales de cajones de navegación:

### 1. Standard Navigation Drawer (Cajón de Navegación Estándar)

![Ejemplo de Standard Navigation Drawer](https://m3.material.io/assets/images/components/navigation-drawer/standard-navigation-drawer.png)

*   **Descripción:** A menudo es visible de forma permanente en pantallas más grandes (como tabletas o escritorios), coexistiendo con el contenido principal.
*   **Cuándo usarlo:** Cuando el usuario necesita cambiar frecuentemente entre destinos y el espacio en pantalla lo permite.

### 2. Modal Navigation Drawer (Cajón de Navegación Modal)

![Ejemplo de Modal Navigation Drawer](https://m3.material.io/assets/images/components/navigation-drawer/modal-navigation-drawer.png)

*   **Descripción:** Aparece temporalmente, bloqueando la interacción con el resto de la aplicación con un "scrim" (una capa oscura que cubre el fondo). Se cierra al tocar fuera de él o al seleccionar un destino.
*   **Cuándo usarlo:** Principalmente en pantallas más pequeñas (móviles) donde el espacio es limitado y el cajón no puede estar siempre visible.

## ¡Importante: Componente en Desuso!

**Material Design 3 está desaconsejando el uso del Cajón de Navegación (Navigation Drawer) en favor de otros componentes.**

La alternativa recomendada es el **Navigation Rail** (Barra de Navegación Lateral Expandida) para pantallas más grandes, y la **Navigation Bar** (Barra de Navegación Inferior) para móviles.

Si bien aún puedes encontrarlo en algunas aplicaciones, la tendencia es a usar soluciones de navegación más integradas y menos intrusivas.

## Resumen Rápido

*   **Qué es:** Un panel lateral para navegación principal y funcionalidades.
*   **Tipos:** Estándar (visible) y Modal (temporal).
*   **¡Atención!:** Está siendo reemplazado por `Navigation Rail` y `Navigation Bar`.
