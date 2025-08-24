
# 01: Color y Temas en Material Design 3

El sistema de color es una de las piedras angulares de Material Design 3. Está diseñado para ser dinámico, cohesivo y personal, permitiendo que las interfaces se sientan como una extensión del estilo del usuario.

## El Concepto de "Seed Color" (Color Semilla)

Todo el sistema de color de M3 parte de un único **color semilla** (`seed color`). Este es el color base que se utiliza para generar una paleta tonal completa.

*   **¿De dónde viene?** En los dispositivos Android, este color puede extraerse dinámicamente del fondo de pantalla del usuario. Sin embargo, para tu marca, puedes elegir un color semilla que represente tu identidad (por ejemplo, el color principal de tu logo).

*   **¿Cómo funciona?** A partir de este color semilla, el sistema genera un conjunto de paletas tonales (una gama de 13 tonos, desde el más claro al más oscuro) para los roles de color clave.

## Los Roles de Color

Una vez generadas las paletas, los colores se asignan a "roles" semánticos. Esto significa que en lugar de pensar "usa el color azul", piensas "usa el color primario". Esto hace que el diseño sea más flexible y fácil de mantener.

Los roles principales son:

*   **Primary (Primario):** Es el color base, utilizado para los componentes más importantes y de mayor impacto visual, como un botón de "Comprar ahora" o el botón de acción flotante (FAB).

*   **Secondary (Secundario):** Se usa para componentes de menor énfasis visual que aún son importantes, como chips de filtros o botones menos destacados.

*   **Tertiary (Terciario):** Se utiliza para acentos de color que pueden crear contrastes y resaltar elementos de menor importancia o que complementan a los primarios y secundarios.

### Colores "On" y "Container"

Para cada rol de color (Primary, Secondary, Tertiary), existen variantes importantes:

*   **`On-Primary`, `On-Secondary`, etc.:** Este es el color que se debe usar para el texto y los íconos que se colocan *encima* del color de su rol correspondiente. Por ejemplo, el texto de un botón con fondo `Primary` debería usar el color `On-Primary` para garantizar la legibilidad.

*   **`Primary-Container`, `Secondary-Container`, etc.:** Son colores de fondo para componentes que necesitan destacarse menos que el color principal, pero más que el fondo general. Por ejemplo, el fondo de una notificación o un elemento seleccionado en una lista.

### Colores de Superficie (Surface)

Estos colores se utilizan para los fondos de la interfaz, como el fondo general de la app, las tarjetas (cards), los menús y las hojas de diálogo. Proporcionan el lienzo sobre el cual se dibuja el resto de la interfaz.

## Aplicación Práctica con Herramientas

No necesitas calcular todo esto manualmente. La herramienta `generate_theme` está diseñada para hacer exactamente este trabajo.

*   **Tu tarea:** Solo necesitas proporcionar un `seedColor` (un código de color hexadecimal, ej: `#6750A4`).
*   **La herramienta hace:** Genera toda la paleta de colores con todos los roles (`Primary`, `On-Primary`, `Primary-Container`, `Surface`, etc.) en el formato que necesites (CSS o Tailwind).

Al pedir la creación de componentes, en lugar de decir "quiero un botón azul", puedes decir "quiero un botón `Filled` (relleno) que use el color `Primary` de nuestro tema". Esto asegura que todos los elementos de la interfaz sean consistentes y se adapten automáticamente si decides cambiar el tema en el futuro.
