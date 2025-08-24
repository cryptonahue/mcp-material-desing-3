
# Guía de Uso: Bottom Sheets (Hojas Inferiores)

Las "Bottom Sheets" son paneles que se deslizan desde la parte inferior de la pantalla para mostrar contenido secundario o acciones relacionadas con el contexto actual. Son muy comunes en aplicaciones móviles para ofrecer opciones sin cambiar completamente de pantalla.

## Cuándo Usar un Bottom Sheet

*   **Mostrar contenido secundario:** Para información adicional que no necesita una pantalla completa (ej: detalles de un elemento seleccionado).
*   **Ofrecer acciones contextuales:** Para listas de opciones o acciones relacionadas con un elemento (ej: opciones al tocar un elemento en una lista).
*   **Alternativa a menús o diálogos:** Cuando una lista de opciones es muy larga o cuando un diálogo sería demasiado intrusivo.

## Tipos de Bottom Sheets

Material Design 3 define dos tipos principales de Bottom Sheets:

### 1. Standard Bottom Sheet (Hoja Inferior Estándar)

![Ejemplo de Standard Bottom Sheet](https://m3.material.io/assets/images/components/bottom-sheets/standard-bottom-sheet.png)

*   **Descripción:** Coexiste con el contenido principal de la pantalla. El usuario puede ver e interactuar con ambos al mismo tiempo.
*   **Cuándo usarlo:** Para contenido complementario que no bloquea la interacción con la pantalla principal. Por ejemplo, un reproductor de música que se mantiene visible mientras navegas por la aplicación, o un panel de filtros que puedes ajustar mientras ves los resultados.

### 2. Modal Bottom Sheet (Hoja Inferior Modal)

![Ejemplo de Modal Bottom Sheet](https://m3.material.io/assets/images/components/bottom-sheets/modal-bottom-sheet.png)

*   **Descripción:** Aparece por encima del contenido de la aplicación, oscureciendo el fondo y deshabilitando la interacción con el resto de la pantalla hasta que se cierra.
*   **Cuándo usarlo:** Para acciones o información que requieren la atención exclusiva del usuario antes de continuar. Es una alternativa a los menús contextuales o diálogos simples, especialmente útil para listas largas de opciones (ej: compartir en redes sociales, opciones de edición).

## Resumen Rápido

*   **Standard:** Para contenido complementario que no interrumpe la interacción con la pantalla principal.
*   **Modal:** Para acciones o información que requieren la atención exclusiva del usuario y bloquean la interacción con el fondo.
