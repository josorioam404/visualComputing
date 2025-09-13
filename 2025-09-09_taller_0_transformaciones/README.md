# Taller 0 - Transformaciones Básicas en Computación Visual
## Fecha
`2025-09-12` 

---

## Objetivo del Taller

Explorar conceptos de transforamciones geométricas, generando un "Hola mundo" visual en el que se muestran objetos y se les aplica transformaciones estáticas y animadas en función del tiempo.

---

## Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [X] Transformaciones geométricas (escala, rotación, traslación)
- [X] Generación de GIFs.
- [X] Generación de animaciones.
- [X] Un poco de las librerias y aplicaciones utilizadas.

---

## Herramientas y Entornos

- Python (`numpy`, `imageio`, `mathplotlib`, etc.)
- Unity (versión LTS)
- Three.js / React Three Fiber
- Processing.

---

## Estructura del Proyecto

```
2025-09-09_taller_0_transformaciones/
├── processing/               # código, gif
├── python/                 # python notebook, gif
├── threejs/            # proyecto, gif
├── unity/            # proyecto, gif
├── README.md
``` 
---

## Implementación

### Etapas realizadas
1. Instalación de herramientas de trabajo.
2. Aplicación de conceptos de transformaciones vistos en clase.
3. Investigación sobre utilidades para generación de gifs y librerías en python.
4. Almacenamiento de resultados.

### Código relevante

Aplicación de transformaciones en python:

```python
    # creacion de matrices de transformación
    M_rotacion = rotationMatrix(theta)
    M_traslacion = translationMatrix(tx, ty)
    M_escala = scalingMatrix(escala, escala)
    # combinación de transformaciones
    M_combinada = M_traslacion @ M_rotacion @ M_escala
    # aplicación de transformaciones
    transformedTriangle = applyTransform(initialTriangle, M_combinada)
    transformedSquare = applyTransform(initialSquare, M_combinada)
```

---

## Prompts Usados

Se usaron bastantes prompts a lo largo del desarrollo del taller, inicialmente para la instalación de las herramientas y configuración de entornos, junto con instalación de utilidades para generación de GIFs (Peek no es del todo compatible con mi sistema).

---

## Reflexión Final

En este taller aprendí a aplicar conceptos de álgebra lineal para la generación de transformaciones lineales, allí también aprendí la importancia de estos métodos desde el punto de vista de la computación visual.

La parte más compleja de la actividad fue lograr instalar y ejecutar los programas requeridos para la práctica. Además de los ajustes y configuraciones necesarias para que estos funcionen correctamente.

En los próximos proyectos mejoraría el manejo del tiempo y el registro del control de versiones.

---

## Checklist de Entrega

- [x] Carpeta `2025-09-09_taller_0_transforaciones`
- [x] Código limpio y funcional.
- [x] GIFs incluido con nombre descriptivo.
- [x] Visualizaciones o métricas exportadas.
- [x] README completo y claro.
- [x] Commits descriptivos en inglés.

---

