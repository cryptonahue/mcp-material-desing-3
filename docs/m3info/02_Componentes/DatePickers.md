
# Guía de Uso: Selectores de Fecha (Date Pickers)

Los selectores de fecha son componentes que permiten a los usuarios elegir una fecha o un rango de fechas de forma sencilla y visual. Son esenciales en formularios, calendarios y cualquier aplicación que requiera la entrada de fechas.

## Cuándo Usar un Selector de Fecha

*   **Selección de una fecha específica:** Para citas, fechas de nacimiento, fechas de eventos.
*   **Selección de un rango de fechas:** Para reservas de hotel, periodos de tiempo en informes.
*   **Dentro de formularios:** Como parte de un campo de texto o un diálogo.

## Tipos de Selectores de Fecha

Material Design 3 ofrece diferentes tipos de selectores de fecha, cada uno adecuado para distintos contextos:

### 1. Docked Date Picker (Selector de Fecha Acoplado)

![Ejemplo de Docked Date Picker](https://m3.material.io/assets/images/components/date-pickers/docked-date-picker.png)

*   **Descripción:** Se muestra como un calendario que se acopla a la interfaz, a menudo dentro de un campo de texto o un menú desplegable. Permite una navegación rápida entre meses y años cercanos.
*   **Cuándo usarlo:** Para selecciones de fechas en el pasado o futuro cercano. Es útil cuando el usuario necesita ver el calendario mientras interactúa con otros elementos de la pantalla.

### 2. Modal Date Picker (Selector de Fecha Modal)

![Ejemplo de Modal Date Picker](https://m3.material.io/assets/images/components/date-pickers/modal-date-picker.png)

*   **Descripción:** Aparece como un diálogo emergente que bloquea la interacción con el resto de la pantalla hasta que se selecciona una fecha o se cierra. Ofrece una navegación más amplia entre meses y años.
*   **Cuándo usarlo:** Cuando la selección de la fecha es una acción principal y el usuario necesita concentrarse solo en el calendario. Es ideal para navegar por meses y años, pero no para fechas muy lejanas.

### 3. Modal Date Input (Entrada de Fecha Modal)

![Ejemplo de Modal Date Input](https://m3.material.io/assets/images/components/date-pickers/modal-date-input.png)

*   **Descripción:** Permite al usuario introducir la fecha directamente en un campo de texto, pero con la opción de abrir un selector de calendario modal si lo prefiere. Es una combinación de entrada manual y selección visual.
*   **Cuándo usarlo:** Cuando la entrada manual de la fecha es común o preferida, pero se quiere ofrecer la comodidad de un calendario para aquellos que lo necesiten.

## Selección de Rango de Fechas

Los selectores de fecha también pueden configurarse para permitir al usuario seleccionar un rango de fechas (una fecha de inicio y una fecha de fin). Esto es útil para reservas, filtros por periodo, etc.

![Ejemplo de Date Range Picker](https://m3.material.io/assets/images/components/date-pickers/date-range-picker.png)

## Resumen Rápido

*   **Docked:** Para fechas cercanas, integrado en la interfaz.
*   **Modal:** Para selección de fecha principal, bloquea la interacción, navegación amplia.
*   **Modal Input:** Permite entrada manual y selección visual.
*   **Rango de Fechas:** Para seleccionar un periodo de tiempo.
