
# Guía de Uso: Pestañas (Tabs)

Las pestañas, o "tabs", son componentes que organizan contenido relacionado en secciones distintas dentro de la misma pantalla. Permiten a los usuarios navegar fácilmente entre diferentes categorías o vistas de contenido sin cambiar de pantalla.

## Cuándo Usar Pestañas

*   **Organizar Contenido:** Para categorizar grupos de contenido que pertenecen a la misma jerarquía y que el usuario puede querer ver de forma independiente.
    *   **Ejemplos:** En una aplicación de música, pestañas para "Canciones", "Artistas", "Álbumes"; en una tienda, pestañas para "Novedades", "Ofertas", "Categorías".
*   **No para Contenido Secuencial:** No uses pestañas para contenido que debe leerse en un orden específico (para eso, usa un `Stepper` o un flujo de pantallas).

## Tipos de Pestañas

Material Design 3 define dos tipos principales de pestañas, según su nivel de jerarquía y ubicación:

### 1. Primary Tabs (Pestañas Primarias)

![Ejemplo de Primary Tabs](https://m3.material.io/assets/images/components/tabs/primary-tabs.png)

*   **Descripción:** Se colocan en la parte superior de la pantalla, a menudo debajo de una barra de aplicación. Representan los destinos principales de contenido de una aplicación.
*   **Cuándo usarla:** Para la navegación de nivel superior dentro de una sección principal de la aplicación. Son las pestañas más prominentes.

### 2. Secondary Tabs (Pestañas Secundarias)

![Ejemplo de Secondary Tabs](https://m3.material.io/assets/images/components/tabs/secondary-tabs.png)

*   **Descripción:** Se utilizan dentro de un área de contenido para separar aún más el contenido relacionado. Siempre se colocan debajo de las pestañas primarias si ambas están presentes.
*   **Cuándo usarla:** Para organizar subcategorías o vistas dentro de una sección ya definida por pestañas primarias. Por ejemplo, dentro de la pestaña "Configuración", podrías tener pestañas secundarias para "General", "Notificaciones", "Privacidad".

## Consideraciones Importantes

*   **Etiquetas Claras:** Las etiquetas de las pestañas deben ser concisas y describir claramente el contenido de cada sección.
*   **Consistencia:** Mantén el número de pestañas manejable (idealmente 3-5) para evitar el desplazamiento horizontal excesivo.
*   **Indicador de Selección:** La pestaña activa debe tener un indicador visual claro (generalmente una línea debajo de la etiqueta).

## Resumen Rápido

*   **Uso:** Organizar contenido relacionado en secciones.
*   **Primary:** Navegación principal, en la parte superior.
*   **Secondary:** Subcategorías, debajo de las primarias.
