# Taller 1 - Mundo 3D

## Fecha
`2025-10-01` 

---

## Objetivo del Taller

Diseñar y curar un mundo virtual en el que la apariencia de los materiales cambie de forma coherente según la iluminación y el modelo de color, integrando modelos 3D (GLB), texturas (incluidas procedurales), movimiento animado, y cambio de cámara entre vista perspectiva y ortográfica.

---

## Conceptos Aprendidos

Lista los principales conceptos aplicados:

- [X] Transformaciones geométricas (escala, rotación, traslación).
- [X] Generación de GIFs.
- [X] Generación de animaciones.
- [X] Generación de modelos 3D.
- [X] Generación de shaders.
- [X] Generación de iluminación.
- [X] Generación de control y lógica de movimiento de cámara.

---

## Herramientas y Entornos

- Fnm (`live-server`)
- Javascript
- three.js
- meshy.ai

---

## Estructura del Proyecto

```
2025-10-01_taller_1_materiales_iluminacion_color/
├── threejsModels/
│   ├── index.html
│   ├── index.js
│   └── assets/
│       ├── therizinosaurus.glb
│       ├── dragon.glb
│       ├── mecaJarly.glb
│       ├── acropolis.glb
│       ├── evening.jpg
│       ├── grass.jpg
│       └── sky.jpeg
├── capturas/
│   ├── perspectiva_dia.png
│   ├── ortografica_dia.png
│   ├── ortografica_sunset.png
│   ├── perspectiva_sunset.png
│   └── shaders.png
├── video/
│   └── escena.mp4
└── README.MD
```

---

## Implementación

### Etapas realizadas

1. Investigación de funcionalidades de three.js en YouTube, principalmente para animaciones básicas y uso de modelos 3D.
2. Uso de meshy.ai para generación de modelos 3D con sus respectivas texturas.
3. Implementación de algoritmos y funcionalidades requeridas para el desarrollo del taller.
4. Grabación de videos, toma de capturas de pantalla y registro de resultados.

### Código relevante

Cargue de modelos 3D de formato GLB en three.js:

```javascript
// MODEL 1: THERIZINOSAURUS - ORGANIC 
loader.load("assets/therizinosaurus.glb", function(glb){
  models.dino = glb.scene;
  models.dino.scale.set(1, 1, 1);
  models.dino.position.set(0, -2.75, 0);
  
  models.dino.traverse(function(node) {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
      if (node.material) {
        node.material.roughness = 0.7;
        node.material.metalness = 0.1;
      }
    }
  });
  
  scene.add(models.dino);
  console.log("Modelo 1: (roughness=0.7, metalness=0.1)");
}, function(xhr){
  console.log("Modelo 1: " + (xhr.loaded/xhr.total * 100).toFixed(2) + "% loaded");
}, function(error){
  console.error("Error cargando modelo 1");
});
```

---

## Explicaciones

#### Mundo generado

El mundo generado representa algunas monturas de World Of Warcraft, un terizinosaurio y una acropolis. Además de los ejemplos de la generación de shaders de Bandas y Damero, y un icosahedro giratorio sobre uno de los puntos principales de la acropolis.

#### Modelos GLB Usados

Se usaron modelos GLB generados en meshy.ai por medio de imágenes buscadas en internet para las búsquedas "vial de arenas png", "mecajarly png", "terizionosaurio png". No se realizaron modificaciones en los formatos de generación, todas las modificaciones se manejaron en el código en javascript, ajustando un tamaño grande para la acropolis, mediano para el dragón y pequeño para la moto y el dinosaurio.

#### Iluminación

Se generaron presets de día y atardecer, para estos se carga una textura en el fondo de la escena. Estos presets se pueden alternar presionando la tecla "L". Para las luces key, fill y rim, la luz rim que se implementó se mueve sobre los ejes XY, generando ligeros cambios en las sombras de los objetos.

#### Materiales y texturas

Se manejaron distintos parámetros de metalness y roughness para cada uno de los modelos cargados, pues cada uno de estos debe transmitir características muy distintas. Por la naturaleza de la moto se usó un material con bastante metalness en esta. En cambio, para los materiales del dinosaurio y el dragón, se manejaron valores de roughness elevados.

#### Shaders procedurales

Se aplicaron shaders de tipo damero y de bandas en dos objetos ajenos al diseño principal del mundo 3D: un eje similar a un tablero de ajedrez con shaders damero y una agrupación de tablillas para el shader de bandas.

#### Modelo de color

En general, las funciones de three.js que se manejaron usan formato RGB.

---

## Prompts Usados

Se usaron bastantes prompts a lo largo del taller para aplicar funcionalidades específicas (Ejemplo: "¿Cómo introduzco un plano que pueda representar el piso en mi escena?; ¿Cómo defino cámaras ortográficas y de perspectiva en js usando three.js?"). No obstante, gran parte de la ayuda en internet provino de tutoriales de YouTube:

- https://www.youtube.com/watch?v=yPA2z7fl4J8
- https://www.youtube.com/watch?v=XPhAR1YdD6o

---

## Reflexión Final

En este taller aprendí a introducir modelos 3D en páginas web usando three.js, hice uso de herramientas de IA para la generación de los modelos 3d (meshy.ai) junto con sus respectivas texturas y apliqué distintas animaciones, shaders, texturas e iluminaciones por código en Javascript.

La parte más compleja de la actividad fue ubicar los objetos de manera coherente en el sistema de coordenadas, hasta que descubrí que podía imprimir en consola la posición y ángulo de la cámara constantemente para tener un marco de referencia al ajustar la posición de los objetos.

En los próximos proyectos mejoraré el manejo del tiempo y crearé escenas más complejas.

---

## Checklist de Entrega

- [x] Carpeta `2025-10-01_taller_1_materiales_iluminacion_color`
- [x] Esquema de iluminación con dos presets diferentes (día, atardecer).
- [x] Materiales PBR aplicados correctamente, coherentes con la iluminación.
- [x] Uso de al menos dos shaders procedurales bien parametrizados (Bandas y Damero).
- [x] Alternancia entre cámara perspectiva y ortográfica funcional.
- [x] Animaciones (cámara, luz y objetos) integradas y relevantes.
- [x] Carpeta y estructura del repositorio ordenada.
- [x] GIFs incluido con nombre descriptivo.
- [x] README completo y claro.
- [x] Commits descriptivos en inglés.
- [x] Documentación clara.

---
