
# Guía de Uso: Selectores de Hora (Time Pickers)

Los selectores de hora son componentes de interfaz de usuario que ayudan a los usuarios a seleccionar y establecer una hora específica. Son comúnmente utilizados en diálogos o formularios para tareas como configurar alarmas, programar reuniones o establecer recordatorios.

## Cuándo Usar un Selector de Hora

*   **Selección de Hora Específica:** Para cualquier situación donde se necesite una hora precisa (ej: 9:30 AM, 14:00).
*   **Programación:** Para eventos, citas, alarmas.
*   **No para Precisión Extrema:** No son adecuados para selecciones de tiempo de alta precisión (como milisegundos).

## Tipos de Selectores de Hora

Material Design 3 ofrece dos tipos principales de selectores de hora, cada uno con una forma diferente de interacción:

### 1. Dial Selector (Selector de Dial / Reloj)

![Ejemplo de Dial Selector](https://m3.material.io/assets/images/components/time-pickers/dial-selector.png)

*   **Descripción:** Imita la esfera de un reloj, permitiendo al usuario tocar o arrastrar para seleccionar la hora y los minutos. Es muy visual e intuitivo para la mayoría de los usuarios.
*   **Cuándo usarlo:** Cuando la selección visual es preferida y la precisión no es crítica al milisegundo. Es ideal para móviles y tabletas.

### 2. Input Picker (Selector de Entrada / Teclado Numérico)

![Ejemplo de Input Picker](https://m3.material.io/assets/images/components/time-pickers/input-picker.png)

*   **Descripción:** Permite la entrada numérica directa de la hora y los minutos a través de un teclado. A menudo se combina con un selector de dial para ofrecer ambas opciones.
*   **Cuándo usarlo:** Cuando la entrada manual es más rápida o preferida por el usuario, o cuando se necesita una precisión ligeramente mayor. Es útil en entornos de escritorio o cuando el usuario ya sabe la hora exacta que quiere introducir.

## Consideraciones Adicionales

*   **Formato de 12/24 horas:** Asegúrate de que el selector de hora sea compatible con el formato de hora preferido por el usuario (AM/PM o 24 horas).
*   **Combinación con Date Pickers:** A menudo, los selectores de hora se usan junto con los selectores de fecha para permitir al usuario elegir una fecha y hora completas.

## Resumen Rápido

*   **Uso:** Seleccionar una hora específica.
*   **Dial Selector:** Interacción visual tipo reloj.
*   **Input Picker:** Entrada numérica directa.
