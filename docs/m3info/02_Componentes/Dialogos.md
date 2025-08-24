
# Guía de Uso: Diálogos (Dialogs)

Un diálogo es una pequeña ventana que aparece sobre el contenido principal para solicitar al usuario que tome una decisión o para presentar información crítica. Debido a que interrumpen al usuario, deben usarse con moderación.

## Cuándo Usar un Diálogo

Úsalos solo para situaciones importantes que requieren la atención inmediata del usuario. Un buen diálogo:

*   **Requiere una acción:** El usuario debe tomar una decisión para poder continuar (ej: confirmar o cancelar).
*   **Es relevante al contexto actual:** Aparece como resultado directo de una acción que el usuario acaba de realizar.
*   **Es bloqueante:** Impide la interacción con el resto de la aplicación hasta que se cierra.

**Importante:** No uses diálogos para notificaciones que no son críticas (como "Mensaje enviado"). Para eso, es mejor usar un componente menos intrusivo como un `Snackbar`.

## Estructura de un Diálogo

Un diálogo efectivo es simple y directo. Generalmente contiene:

1.  **Icono (Opcional):**
    *   Un icono en la parte superior puede ayudar a comunicar rápidamente el propósito del diálogo (ej: un icono de advertencia para una acción destructiva).

2.  **Título:**
    *   Debe ser una pregunta o una frase corta y clara. Evita títulos ambiguos como "¿Estás seguro?". Es mejor ser específico: "¿Descartar los cambios no guardados?".

3.  **Texto de Soporte:**
    *   Un texto breve que proporciona más detalles sobre las consecuencias de la acción. No siempre es necesario.

4.  **Acciones (Botones):**
    *   El elemento más importante. Aquí es donde el usuario toma la decisión.
    *   **Recomendación:** Limita las acciones a dos opciones para evitar la parálisis por análisis. Por ejemplo, una acción de confirmación y una de descarte.

![Ejemplo de un Diálogo](https://m3.material.io/assets/images/components/dialogs/dialog-usage.png)

## Buenas Prácticas para las Acciones

*   **Jerarquía:** La acción principal (la que confirma o la más probable) debe tener más énfasis. Generalmente se usa un `Text Button` para ambas, pero la de confirmación se coloca a la derecha.
*   **Etiquetas Claras:** Usa verbos específicos en los botones. En lugar de "OK", usa "Guardar", "Eliminar" o "Permitir".
*   **Acción de Descarte:** La acción que cierra el diálogo sin hacer nada (la opción segura) suele ser "Cancelar".

## Tipos de Diálogos

*   **Basic Dialog (Diálogo Básico):** Es el más común, como el descrito arriba.
*   **Full-Screen Dialog (Diálogo de Pantalla Completa):** Se usa principalmente en móviles para tareas más complejas que no justifican una pantalla nueva, como añadir un evento al calendario. En pantallas más grandes, este tipo de diálogo debería transformarse en un diálogo básico o un pop-up más grande.

## Resumen Rápido

*   **¿Es una interrupción necesaria?** Si no, no uses un diálogo.
*   **Título claro y conciso.**
*   **Máximo dos acciones (botones).**
*   **Etiquetas de botones con verbos específicos.**
*   **La acción de confirmación a la derecha.**
