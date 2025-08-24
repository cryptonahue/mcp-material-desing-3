
# Guía de Uso: Campos de Texto (Text Fields)

Los campos de texto permiten a los usuarios introducir y editar texto. Son una pieza fundamental de los formularios y de cualquier lugar donde se requiera la entrada de información por parte del usuario.

## Estilos Principales

Material Design 3 ofrece dos estilos principales. La elección entre ellos es mayormente estética, pero es crucial ser consistente y no mezclarlos dentro del mismo formulario.

*   **Filled (Relleno):** El campo tiene un fondo de color suave que lo diferencia de la superficie de la pantalla. Es una buena opción por defecto.
*   **Outlined (Contorneado):** El campo tiene un borde claro a su alrededor. Funciona bien en interfaces donde se prefiere un diseño más "limpio" o minimalista.

![Ejemplo de Filled y Outlined Text Fields](https://m3.material.io/assets/images/components/text-fields/text-field-types.png)

## Elementos Clave de un Campo de Texto

Un campo de texto bien diseñado debe incluir los siguientes elementos para ser claro y fácil de usar:

1.  **Label (Etiqueta):**
    *   **Qué es:** Un texto corto que le dice al usuario qué información debe introducir (ej: "Nombre", "Correo electrónico").
    *   **Recomendación:** La etiqueta debe ser siempre visible. M3 lo soluciona haciendo que la etiqueta "flote" hacia la parte superior del campo cuando el usuario empieza a escribir.

2.  **Placeholder (Texto de Ejemplo):**
    *   **Qué es:** Un texto de ejemplo dentro del campo que desaparece al empezar a escribir.
    *   **Cuándo usarlo:** Para dar una pista sobre el formato esperado (ej: "ejemplo@correo.com"). No debe reemplazar a la etiqueta.

3.  **Supporting Text (Texto de Ayuda):**
    *   **Qué es:** Un texto persistente debajo del campo para dar instrucciones adicionales.
    *   **Ejemplo:** "La contraseña debe tener al menos 8 caracteres."

4.  **Error Message (Mensaje de Error):**
    *   **Qué es:** Cuando el usuario introduce información no válida, el texto de ayuda se reemplaza por un mensaje de error claro y conciso. El color del campo y del mensaje cambia para llamar la atención.
    *   **Recomendación:** Acompaña el mensaje con un icono de error para mayor visibilidad.

![Ejemplo de estados de un Text Field](https://m3.material.io/assets/images/components/text-fields/states.png)

## Buenas Prácticas

*   **Campos Obligatorios:** Si un campo es obligatorio, indícalo claramente añadiendo un asterisco `*` al final de la etiqueta.
*   **Iconos:** Puedes usar iconos dentro de los campos para acciones comunes:
    *   Un icono de calendario para abrir un selector de fechas.
    *   Un icono de "ojo" para mostrar/ocultar la contraseña.
    *   Un icono de "X" para borrar rápidamente el contenido del campo.
*   **Tamaño:** En pantallas grandes, evita que los campos de texto sean excesivamente anchos, ya que dificulta la lectura. Ajústalos al tamaño esperado del contenido.
