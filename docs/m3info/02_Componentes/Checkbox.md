
# Guía de Uso: Checkbox (Casillas de Verificación)

Las casillas de verificación, o checkboxes, permiten a los usuarios seleccionar una o más opciones de un conjunto, o activar/desactivar una característica. Son ideales cuando las opciones son independientes entre sí.

## Cuándo Usar un Checkbox

*   **Selección Múltiple:** Cuando el usuario puede elegir varias opciones de una lista (ej: seleccionar varios ingredientes en una pizza).
*   **Activar/Desactivar:** Para activar o desactivar una configuración o característica (ej: "Recordarme", "Recibir notificaciones").

## Estados de un Checkbox

Un checkbox puede tener tres estados principales:

1.  **Unchecked (Sin Marcar):**
    *   **Descripción:** La opción no está seleccionada.
    *   **Apariencia:** Un cuadrado vacío.

2.  **Checked (Marcado):**
    *   **Descripción:** La opción está seleccionada.
    *   **Apariencia:** Un cuadrado con una marca de verificación (tick).

3.  **Indeterminate (Indeterminado):**
    *   **Descripción:** Este estado se usa cuando un checkbox "padre" representa un grupo de opciones, y algunas (pero no todas) de esas opciones están seleccionadas.
    *   **Apariencia:** Un cuadrado con un guion.
    *   **Ejemplo:** Si tienes un checkbox "Seleccionar todo" para una lista de elementos, y el usuario ha seleccionado solo algunos, el checkbox "Seleccionar todo" se mostrará en estado indeterminado. Al hacer clic en él, se marcarán todas las opciones.

![Ejemplo de estados de Checkbox](https://m3.material.io/assets/images/components/checkbox/checkbox-states.png)

## Resumen Rápido

*   **Unchecked:** Opción no seleccionada.
*   **Checked:** Opción seleccionada.
*   **Indeterminate:** Algunas opciones de un grupo están seleccionadas, pero no todas.
*   **Uso principal:** Para selecciones múltiples o activar/desactivar características.
