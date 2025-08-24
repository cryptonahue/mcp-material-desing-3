
# Guía de Uso: Tooltips (Consejos de Herramienta)

Los "tooltips" son mensajes breves que aparecen cuando el usuario interactúa con un elemento de la interfaz de usuario (UI), proporcionando contexto adicional o una etiqueta. Son útiles para aclarar el propósito de un icono o un control que no tiene una etiqueta de texto visible.

## Cuándo Usar un Tooltip

*   **Contexto Adicional:** Para proporcionar una descripción corta o el nombre de un elemento de la UI.
*   **Botones de Solo Icono:** Son especialmente útiles para botones que solo tienen un icono, ya que el tooltip puede mostrar el nombre de la acción (ej: un icono de disquete con el tooltip "Guardar").
*   **Elementos Poco Comunes:** Para explicar brevemente la función de un elemento de UI menos familiar.

## Cuándo NO Usar un Tooltip

*   **Información Crítica:** Nunca ocultes información crítica o esencial dentro de un tooltip, ya que el usuario podría no verlo. La información importante debe ser visible por defecto.
*   **Elementos con Etiquetas Claras:** Si un elemento ya tiene una etiqueta de texto clara, un tooltip es redundante.

## Tipos de Tooltips

Material Design 3 define dos tipos principales de tooltips:

### 1. Plain Tooltip (Tooltip Simple)

![Ejemplo de Plain Tooltip](https://m3.material.io/assets/images/components/tooltips/plain-tooltip.png)

*   **Descripción:** Son mensajes cortos y concisos que aparecen sobre un elemento. Contienen solo texto.
*   **Cuándo usarlo:** Para etiquetas breves o descripciones de elementos de UI, especialmente botones de solo icono.

### 2. Rich Tooltip (Tooltip Rico)

![Ejemplo de Rich Tooltip](https://m3.material.io/assets/images/components/tooltips/rich-tooltip.png)

*   **Descripción:** Ofrecen información más detallada, definiciones o explicaciones. Pueden incluir subtítulos, botones o enlaces, y son más grandes que los tooltips simples.
*   **Cuándo usarlo:** Para proporcionar más contexto sobre una característica, explicar un término o guiar al usuario a una acción relacionada. Por ejemplo, un tooltip que explica una nueva función y ofrece un botón para "Más información".

## Resumen Rápido

*   **Qué es:** Mensaje breve que aparece al interactuar con un elemento de UI.
*   **Uso:** Contexto adicional, etiquetas para iconos.
*   **Tipos:** Simple (texto corto) o Rico (más detalles, puede incluir acciones).
*   **Regla de oro:** No ocultes información crítica en ellos.
