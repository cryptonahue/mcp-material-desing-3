
# Guía de Uso: Snackbars

Los Snackbars son mensajes pequeños y temporales que aparecen en la parte inferior de la pantalla para informar a los usuarios sobre un proceso de la aplicación. Están diseñados para ser mínimamente intrusivos, lo que significa que no interrumpen el flujo de trabajo del usuario y desaparecen automáticamente después de un corto período de tiempo.

## Cuándo Usar un Snackbar

*   **Información de Procesos:** Para confirmar que una acción se ha completado (ej: "Correo archivado", "Elemento eliminado").
*   **Mensajes de Baja Prioridad:** Cuando la información no requiere una respuesta inmediata del usuario.
*   **Errores No Críticos:** Para notificar errores que no impiden al usuario continuar usando la aplicación (ej: "No hay conexión a internet").

## Características Clave

*   **Brevedad:** Los mensajes deben ser concisos y directos.
*   **Temporalidad:** Aparecen por un corto tiempo y luego desaparecen automáticamente.
*   **No Interrumpen:** No bloquean la interacción del usuario con el resto de la aplicación.
*   **Acciones Opcionales:** Pueden incluir una acción de texto (ej: "Deshacer") que permite al usuario revertir la acción o realizar una acción relacionada. Si incluyen una acción, el snackbar permanecerá visible hasta que el usuario interactúe con él o se agote un tiempo límite más largo.

![Ejemplo de Snackbar](https://m3.material.io/assets/images/components/snackbar/snackbar.png)

## Cuándo NO Usar un Snackbar

*   **Mensajes Críticos:** Para información que requiere una decisión inmediata o que bloquea el flujo del usuario (usa un `Diálogo` en su lugar).
*   **Mensajes Persistentes:** Para información que necesita permanecer en pantalla por un tiempo indefinido (usa una `Banner` o `Toast` si tu plataforma lo soporta y es apropiado).

## Resumen Rápido

*   **Qué es:** Mensaje temporal en la parte inferior de la pantalla.
*   **Cuándo usarlo:** Para informar sobre procesos o errores no críticos.
*   **Características:** Breve, temporal, no intrusivo, puede tener una acción opcional.
