
# Guía de Uso: Deslizadores (Sliders)

Los deslizadores, o "sliders", permiten a los usuarios seleccionar un valor de un rango predefinido moviendo un "pulgar" (handle) a lo largo de una barra. Son ideales para ajustar configuraciones donde los cambios tienen un efecto inmediato y el usuario necesita ver el impacto visualmente.

## Cuándo Usar un Deslizador

*   **Ajuste de Configuraciones:** Para controlar el volumen, el brillo, el tamaño de la fuente, la intensidad de un filtro de imagen.
*   **Selección de un Valor en un Rango:** Cuando el usuario necesita elegir un valor dentro de un espectro continuo o discreto.

## Tipos de Deslizadores

Material Design 3 define varios tipos de deslizadores, adaptados a diferentes necesidades de selección:

### 1. Standard Slider (Deslizador Estándar)

![Ejemplo de Standard Slider](https://m3.material.io/assets/images/components/sliders/standard-slider.png)

*   **Descripción:** Permite seleccionar un único valor de un rango, típicamente comenzando desde cero o el inicio de una secuencia. Es el más común y se usa para valores continuos.
*   **Cuándo usarlo:** Para ajustes como el volumen, el brillo o el progreso de una reproducción.

### 2. Centered Slider (Deslizador Centrado)

![Ejemplo de Centered Slider](https://m3.material.io/assets/images/components/sliders/centered-slider.png)

*   **Descripción:** Selecciona un valor de un rango que incluye tanto valores positivos como negativos, con el cero o un valor predeterminado en el centro.
*   **Cuándo usarlo:** Para ajustes que tienen un punto neutral o central, como el balance de audio (izquierda/derecha) o la temperatura (frío/calor).

### 3. Range Slider (Deslizador de Rango)

![Ejemplo de Range Slider](https://m3.material.io/assets/images/components/sliders/range-slider.png)

*   **Descripción:** Permite seleccionar dos valores en un mismo deslizador para definir un rango mínimo y máximo.
*   **Cuándo usarlo:** Para filtros de precios (ej: "entre $10 y $50"), rangos de edad o cualquier selección que requiera un inicio y un fin dentro de un espectro.

### Deslizadores Discretos

![Ejemplo de Discrete Slider](https://m3.material.io/assets/images/components/sliders/discrete-slider.png)

*   **Descripción:** A diferencia de los deslizadores continuos, los discretos tienen "indicadores de parada" (ticks) que muestran valores predeterminados a los que el pulgar se ajusta. Esto es útil cuando solo se permiten ciertos valores.
*   **Cuándo usarlo:** Para selecciones de tamaño (S, M, L, XL), niveles de dificultad (Fácil, Medio, Difícil) o cualquier ajuste que tenga pasos definidos.

## Resumen Rápido

*   **Standard:** Para un solo valor en un rango continuo.
*   **Centered:** Para valores positivos/negativos con un punto central.
*   **Range:** Para seleccionar un rango (mínimo y máximo).
*   **Discreto:** Para valores predefinidos con "paradas".
