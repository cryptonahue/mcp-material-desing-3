
# Guía de Uso: Indicadores de Carga y Progreso (Loading Indicators)

Los indicadores de carga y progreso comunican al usuario el estado de un proceso en curso, como la carga de una aplicación, el envío de un formulario o la descarga de un archivo. Son esenciales para mantener al usuario informado y reducir la frustración durante los tiempos de espera.

## Cuándo Usar un Indicador de Progreso

*   **Procesos Largos (más de 5 segundos):** Usa un indicador de progreso para procesos que tardan más de 5 segundos en completarse. Esto le asegura al usuario que la aplicación no está congelada.
*   **Esperas Cortas (200ms - 5 segundos):** Para esperas más cortas, un simple indicador de carga (como un spinner) es suficiente.
*   **Acciones Instantáneas (menos de 200ms):** Para acciones que se completan casi al instante, no es necesario ningún indicador.

## Tipos Visuales

Existen dos tipos visuales principales de indicadores de progreso:

### 1. Linear Progress Indicator (Indicador de Progreso Lineal)

![Ejemplo de Linear Progress Indicator](https://m3.material.io/assets/images/components/progress-indicators/linear-progress-indicator.png)

*   **Descripción:** Una barra horizontal que se llena para mostrar el progreso.
*   **Cuándo usarlo:** Ideal para procesos donde el progreso es fácil de visualizar, como descargas de archivos o la carga de una página web.

### 2. Circular Progress Indicator (Indicador de Progreso Circular)

![Ejemplo de Circular Progress Indicator](https://m3.material.io/assets/images/components/progress-indicators/circular-progress-indicator.png)

*   **Descripción:** Un círculo giratorio o un arco que se llena.
*   **Cuándo usarlo:** Para procesos que no tienen un progreso lineal claro, o cuando el espacio es limitado. Comúnmente usado para indicar que algo está "cargando" o "procesando".

## Estados de Progreso

Los indicadores de progreso pueden ser de dos tipos según si se conoce o no el tiempo total del proceso:

### 1. Determinate (Determinado)

![Ejemplo de Determinate Progress Indicator](https://m3.material.io/assets/images/components/progress-indicators/determinate-progress-indicator.png)

*   **Descripción:** El progreso se muestra de 0% a 100%. El usuario sabe cuánto falta para que termine el proceso.
*   **Cuándo usarlo:** Cuando se conoce la duración total del proceso (ej: "Descargando 50%", "Subiendo 3 de 6 archivos").

### 2. Indeterminate (Indeterminado)

![Ejemplo de Indeterminate Progress Indicator](https://m3.material.io/assets/images/components/progress-indicators/indeterminate-progress-indicator.png)

*   **Descripción:** El indicador muestra movimiento continuo sin un final claro, ya que el tiempo total del proceso es desconocido.
*   **Cuándo usarlo:** Cuando no se puede calcular el progreso exacto (ej: "Cargando contenido...", "Procesando solicitud...").

### Nuevas Formas Onduladas (Wavy Shapes) para Indeterminados

Material Design 3 introduce formas más expresivas y "onduladas" para los indicadores indeterminados. Esto hace que las esperas más largas se sientan menos estáticas y más dinámicas, mejorando la experiencia del usuario.

## Resumen Rápido

*   **Propósito:** Informar al usuario sobre procesos en curso.
*   **Tipos Visuales:** Lineal (barra) o Circular (círculo).
*   **Estados:** Determinado (se conoce el progreso) o Indeterminado (progreso desconocido).
*   **Novedad:** Formas onduladas para indicadores indeterminados.
