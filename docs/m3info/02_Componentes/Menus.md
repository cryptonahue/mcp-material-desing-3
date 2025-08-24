
# Guía de Uso: Menús

Los menús son componentes que muestran una lista de opciones o acciones en una superficie temporal. Son una forma eficiente de presentar múltiples opciones sin ocupar espacio permanente en la pantalla, apareciendo solo cuando el usuario los necesita.

## Cuándo Usar un Menú

*   **Selección de Opciones:** Cuando el usuario necesita elegir una opción de una lista (ej: seleccionar un idioma, una opción de ordenación).
*   **Acciones Contextuales:** Para mostrar acciones relacionadas con un elemento o una sección específica (ej: opciones de "más" en una tarjeta).
*   **Alternativa a otros selectores:** Son menos prominentes y ocupan menos espacio que otros métodos de selección como botones de radio o chips, lo que los hace ideales para listas largas o cuando el espacio es limitado.

## Tipos de Menús

Material Design 3 define varios tipos de menús, cada uno con un propósito y comportamiento específico:

### 1. Dropdown Menu (Menú Desplegable)

![Ejemplo de Dropdown Menu](https://m3.material.io/assets/images/components/menus/dropdown-menu.png)

*   **Descripción:** Se extiende directamente desde un elemento principal (como un botón, un icono o un campo de entrada) y aparece justo debajo de él.
*   **Cuándo usarlo:** Para listas de opciones que se activan al hacer clic en un elemento específico. Comúnmente usado para selectores de opciones en formularios o para menús de "más opciones".

### 2. Exposed Dropdown Menu (Menú Desplegable Expuesto / Filtrado)

![Ejemplo de Exposed Dropdown Menu](https://m3.material.io/assets/images/components/menus/exposed-dropdown-menu.png)

*   **Descripción:** También conocido como autocompletar o combobox. Permite al usuario escribir para filtrar las opciones de la lista, ayudando a encontrar rápidamente un elemento de una lista grande.
*   **Cuándo usarlo:** Cuando la lista de opciones es muy larga y el usuario podría beneficiarse de escribir para encontrar lo que busca (ej: selector de países, búsqueda de productos).

### 3. Context Menu (Menú Contextual)

![Ejemplo de Context Menu](https://m3.material.io/assets/images/components/menus/context-menu.png)

*   **Descripción:** Aparece cuando el usuario realiza una acción específica sobre un elemento, como mantener pulsado (long press) en un móvil o hacer clic derecho en un escritorio.
*   **Cuándo usarlo:** Para mostrar acciones relevantes al elemento sobre el que se ha interactuado (ej: opciones al mantener pulsado un mensaje en un chat: "Copiar", "Eliminar", "Responder").

### 4. Submenu (Submenú / Menú en Cascada)

![Ejemplo de Submenu](https://m3.material.io/assets/images/components/menus/submenu.png)

*   **Descripción:** Son menús que aparecen al lado de un elemento de un menú padre, permitiendo una organización jerárquica de las opciones.
*   **Cuándo usarlo:** Cuando tienes categorías de opciones dentro de un menú principal. Por ejemplo, un menú "Archivo" con submenús para "Nuevo", "Abrir", "Guardar como".

## Resumen Rápido

*   **Dropdown:** Para listas de opciones que se abren desde un elemento.
*   **Exposed Dropdown:** Para listas largas con filtrado por escritura.
*   **Context:** Para acciones relevantes a un elemento específico (long press/clic derecho).
*   **Submenu:** Para organizar opciones en categorías jerárquicas.
