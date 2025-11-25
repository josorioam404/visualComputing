# Parte 1: Estudio Individual del Material de Clase
# Actividad

## SLAM 
Resuelve el problema de ubicación de una máquina autónoma, de manera muy reduccionista, genera un laberinto en el que es capaz de identificarse a si mismo.

### Tipos de enfoques de SLAM:
- Visual
- LIDAR (Laser imagin detection)

### Visual Monocular:
¿Cuál es su flujo de operación (pipeline)?
1. Captura de imágenes
2. Front-End (Odometría visual)
- Extracción de características 
- Coincidencia de características
- Estimación de pose
- Triangulación
3. Back-End (Optimización)
- Mapeo local
- Detección de cierre de bucle
- Optimización de grafo
4. Salida
- Mapa 3D del entorno
- Trayectoria de la cámra

Convierte un flujo de video en un mapa 3D, el front-end lo hace de por medio de estimaciones, el back-end hace optimizaciones para generar consistencia en el mapeo.

### Explicación del pipeline:
#### Front-end:
Extracción de características:
Para la extracción de características hace uso de algoritmos como SIFT y ORB; estos son muy distintos, SIFT es lento, muy preciso y de licencia privada, ORB es rápido, menos preciso y de licencia pública.

Coincidencia de características:
Se usa geometría epipolar para describir la restricción geométrica entre dos vistas de una misma escena 3D.

Triangulación:
Haciendo uso de dos cámaras, se pueden proyectar rayos desde estas, tomando su intersección como la ubicacioón en el espacio 3D.

### ¿Qué ventajas presenta frente a técnicas tradicionales?
Analiza secuencias de video en tiempo real.
Ofrece una trayectoria y Localización precisa del agente.
Es rápido y eficiente.

### Campos de aplicación:
- Robótica y vehículos autónomos.
- Realidad aumentada y mixta.
- Recosntrucción 3D y gemelos digitales.

## SIFT
### ¿Qué problema resuelve este algoritmo?
Su objetivo es encontrar keypoints (puntos de interés) y asignarles una "huella dactilar" o "ADN visual" (identificador) único y robusto: el descriptor SIFT.
Es robusto a cambios de escala, iluminación y color.


### ¿Cuál es su flujo de operación (pipeline)?
1. Detección de extremos en el espacio de escalas: Encontrar puntos estables.
2. Localización precisa de keypoints: Refinar y filtrar puntos.
3. Asignación de orientación: Lograr invariancia a la rotación.
4. Generación del descriptor: Crear la huella digital única.

### Explicación del pipeline:
#### Paso 1: Búsqueda de puntos clave en múltiples escalas
Para que el algoritmo sea invariante de escala, se generan features constantes en varios níveles de desenfoque.
Esta parte tiene su propio pipeline específico:
1. Extracción de la imagen inicial.
2. Generación de pirámide gaussiana (diferentes escalas de desenfoque en la imagen).
3. Se calcula la diferencia entre las gaussianas (la pirámide).
4. Se seleccionan máximos y mínimos locales para la detección de extremos 3D, estos son keypoints candidatos.

#### Paso 2: Refinamiento y filtrado de puntos clave
Se filtran puntos sensibles al ruido (se eliminan aquellos que tengan bajo contraste).
Adicional a esto, se eliminan aquellos bordes que sean ambiguos.

#### Paso 3: Asignación de una orientación canónica 
Para que el algoritmo sea invariante en rotación, debe asignarle una orientación a cada keypoint identificado.
Este parte tiene su propio pipeline específico:
1. Se analiza la región alrededor de cada keypoint.
2. Se calculan la magnitud y orientación de los gradientes de cada píxel en la región.
3. Se crea un histograma de orientaciones (ponderado por la magnitud del gradiente y una ventana Gaussiana).
4. El pico (o picos) de este histograma define la orientación principal del punto clave.

#### Paso 4: Creación del descriptor o huella digital visual
Para este punto, ya se tiene una escala. ubicación y orientación estables. Es por ello que se debe generar una huella digital.
Este parte tiene su propio pipeline específico:
1. Se selecciona un keypoint.
2. Se toma una vecindad de 16x16 píxeles alrededor del keypoint, esta cuadrícula tiene una orientación igual a la del keypoint.
3. La cuadrícula del paso 2 se divide en subregiones de 4x4.
4. Para cada subregión se crea un histograma de 8 orientaciones de gradiente.
5. Se genera una huella digital, esta cuenta con 16 suregiones, cada una con 8 orientaciones. Es decir, 128 valores.

### ¿Qué ventajas presenta frente a técnicas tradicionales?
Este algoritmo es usado en otros algoritmos de sistemas de percepción (SLAM por ejemplo).
Frente a ORB presenta ventajas por su alta robustez a la escala, rotación e iluminación. En términos de calidad es muy superior.

### Campos de aplicación:
- Sistemas de percepción.
- Reconocimiento de objetos.
- Reconstrucción 3D offline.
- Benchmarking.

## ORB
### ¿Qué problema resuelve este algoritmo?
Para el algoritmo SLAM, se buscaba un algoritmo de reconocimiento de características que fuera rápido y a su vez, libre. ORB resuelve este problema.
ORB es una síntesis de dos algoritmos rapidos y eficientes:
- Detector: Utiliza FAST (Features from Accelerated Segment Test) para identificar keypoints a una alta velocidad.
- Descriptor: Emplea BRIEF (Binary Robust Independent Elementary Features) para crera una huella digital o descriptor.
ORB combina ambos enfoques y añade un paso adicional que mantiene la invariancia a la rotación.

### ¿Cuál es su flujo de operación (pipeline)?
1. Detección de puntos clave.
2. Creación de huella digital.
3. Steered brief para mantener invariancia a rotación.

### Explicación del pipeline:
#### Paso 1: Encontrar puntos clave a alta velocidad con FAST
Para la detección de esquinas (keypoints), se sigue este pipeline específico para cada píxel **p** en la imagen: 
1. Seleccionar un círculo: Generación de un círculo de 16 píxeles de radio 3 alrededor de **p**.
2. Comparación de intensidades: Se compara la intensidad de **p** con la de los 16 píxeles del círculo.
3. Establecimiento de umbral: Se define un umbral de brillo **t**.
4. Detección de esquinas: Si en el círculo existe un arcon con **N** píxeles contiguos (Normalmente se maneja N=9 o N=12) que son todos más brillantes que **p + t** o todos más oscuros que **p - t**, entonces **p** es un keypoint.

Este paso es considerablemente rápido porque evita cálculos complejos y solo maneja comparaciones. 

#### Paso 2: Crear una huella digital o descriptor con BRIEF 
Para la creación de huellas digitales, se sigue este pipeline específico para cada keypoint en la imagen:
1. Tomar un parche: Selección de un parche de píxeles alrededor del keypoint.
2. Pares de píxeles: Dentro del parque, se selecciona un conjunto predefinido de pares de píxeles.
3. Comparación simple: Para cada par de píxeles **(p1, p2)**, se comparan las intensidades:
- Si intensidad(**p1**) > intensidad(**p2**), se asigna un **1**.
- Si no, se asigna un **0**.
4. Construcción de descriptor: El resultado es una cadena de bits que será tomada como descriptor BRIEF.

#### Modificación de ORB: Orientación del descripción BRIEF (Steered BRIEF)
ORB añade una modificación para lograr invariancia de rotación. Para esto, se sigue este pipeline específico para cada keypoint en la imagen:
1. Cálculo de orientación del keypoint: Se calcula una orientación basada en el centroide de intensidad del parche del keypoint.
2. Rotación del patrón BRIEF: Antes de construir un descriptor, el patrón BRIEF se rota para alinearse con la orientación calculada del keypoint.
3. Cálculo del descriptor: Se calcula el descriptor teniendo el patrón ya rotado.

### ¿Qué ventajas presenta frente a técnicas tradicionales?
Es extremadamente rápido, por lo que es ideal para aplicaciones de tiempo real. Adicionalmente, es de código abierto y está libre de patentes (a diferencia de SIFT).

### Campos de aplicación:
- Realidad aumentada.
- Reconocimiento de objetos.
- Reconstrucción 3D.
- Composición de panorámicas.
- Odometría visual.

