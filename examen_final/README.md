# EXAMEN FINAL -- Procesamiento de Imágenes y Three.js

Este repositorio contiene dos partes independientes:

1. **Punto 1 -- Python:** filtros, transformaciones y morfología
    utilizando Google Colab.\
2. **Punto 2 -- Three.js:** construcción de una escena 3D interactiva
    con geometría básica, texturas, animación y cambio de perspectiva.

------------------------------------------------------------------------

# **Punto 1 -- Python (Procesamiento de Imágenes)**

## Enfoque utilizado

El notebook `examen_final_python.ipynb` desarrolla una serie de
operaciones clásicas de procesamiento digital de imágenes utilizando
Python.\
El flujo general fue:

1. **Carga de imagen** desde `python/data/animalextincion.jpg`.
2. **Aplicación de filtros espaciales** (suavizado, detección de
    bordes).
3. **Transformaciones morfológicas**:
    - Erosión
    - Dilatación
    - Apertura
    - Cierre
4. **Creación de una animación GIF** mostrando la evolución del
    procesamiento paso a paso.

## Resultados

![GIF filtros y morfología](python/gifs/resultado_animacion.gif)

------------------------------------------------------------------------

# **Punto 2 -- Three.js (Escena 3D con interacción)**

## Descripción general

La escena 3D creada con **React + Three.js + React Three Fiber**
incluye:

- Múltiples formas geométricas (cubos, toroide, esferas).
- Montón de cajas texturizadas.
- Toroide colocado horizontalmente sobre ellas.
- Sistema de planetas orbitando (Mercurio, Venus, Tierra, Marte,
    Júpiter).
- Animación continua con `useFrame`.
- Menú interactivo (Leva) para cambiar la perspectiva de cámara.
- OrbitControls para rotar y hacer zoom.
- Varias luces: ambiental, direccional y dos luces puntuales.

## 🎥 GIFs de la escena

``` markdown
```

------------------------------------------------------------------------

# **Instrucciones de ejecución**

## Ejecutar Python

1. Abrir Google Colab.
2. Cargar `python/examen_final_python.ipynb`.
3. Asegurar que la imagen `python/data/animalextincion.jpg` está en el
    directorio.
4. Ejecutar todas las celdas.

## Ejecutar Three.js

Proyecto creado con Vite:

    npm create vite@latest threejs -- --template react
    npm install three @react-three/fiber @react-three/drei leva

### Pasos

    cd threejs
    npm install
    npm run dev

Abrir en:

    http://localhost:5173

------------------------------------------------------------------------

# Estructura del repositorio

    .
    ├── python
    │   ├── data
    │   │   └── animalextincion.jpg
    │   ├── examen_final_python.ipynb
    │   └── gifs
    │       └── resultado_animacion.gif
    ├── threejs
    │   ├── src
    │   ├── textures
    │   ├── gifs
    │   ├── package.json
    │   └── ...
    └── README.md
