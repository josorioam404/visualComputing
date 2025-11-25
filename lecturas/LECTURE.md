
# Parte 1: Estudio Individual del Material de Clase

# Actividad

# SLAM

## ¿Qué es SLAM?
SLAM resuelve el problema de ubicación de una máquina autónoma. De forma reducida, consiste en generar un mapa (por ejemplo, un laberinto) y permitir que el agente pueda localizarse dentro de él.

## Tipos de enfoques de SLAM
- Visual
- LIDAR (Laser Imaging Detection)

## Visual Monocular

### Flujo de operación (Pipeline)
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
   - Trayectoria de la cámara

Visual SLAM convierte un flujo de video en un mapa 3D. El front-end hace estimaciones iniciales; el back-end realiza optimizaciones para obtener un resultado consistente.

### Explicación del Pipeline

#### Front-End

**Extracción de características**  
Utiliza SIFT y ORB:
- SIFT: preciso, lento, licencia privada.
- ORB: rápido, menos preciso, libre.

**Coincidencia de características**  
Usa geometría epipolar para restringir la relación entre dos vistas de una misma escena 3D.

**Triangulación**  
Con dos cámaras se proyectan rayos y su intersección determina la posición 3D.

### Ventajas frente a técnicas tradicionales
- Procesa video en tiempo real
- Proporciona trayectoria y localización precisas
- Rápido y eficiente

### Campos de aplicación
- Robótica y vehículos autónomos
- Realidad aumentada y mixta
- Reconstrucción 3D y gemelos digitales

---

# SIFT

## ¿Qué problema resuelve?
Encuentra puntos clave (keypoints) y genera descriptores robustos frente a escala, iluminación y rotación.

## Pipeline
1. Detección de extremos en el espacio de escalas
2. Localización precisa de keypoints
3. Asignación de orientación
4. Generación del descriptor

## Explicación del Pipeline

### Paso 1: Detección en múltiples escalas
1. Imagen inicial  
2. Pirámide gaussiana  
3. Diferencia de gaussianas  
4. Selección de máximos y mínimos locales (keypoints candidatos)

### Paso 2: Refinamiento
Elimina puntos con bajo contraste y bordes ambiguos.

### Paso 3: Asignación de orientación
1. Analiza región del keypoint  
2. Calcula gradientes  
3. Genera histograma de orientaciones  
4. El pico define la orientación

### Paso 4: Descriptor
1. Selección del keypoint  
2. Vecindad 16×16  
3. División en subregiones 4×4  
4. Histograma de 8 orientaciones por subregión  
5. Descriptor final de 128 elementos

## Ventajas
- Muy robusto  
- Base de otros algoritmos  
- Superior a ORB en calidad

## Campos de aplicación
- Sistemas de percepción  
- Reconocimiento de objetos  
- Reconstrucción 3D  
- Benchmarking

---

# ORB

## ¿Qué problema resuelve?
Proporciona un detector y descriptor rápido, eficiente y libre de patentes, ideal para SLAM.

## Pipeline
1. Detección de puntos clave (FAST)
2. Creación del descriptor (BRIEF)
3. Steered BRIEF (invariancia rotacional)

## Explicación del Pipeline

### Paso 1: FAST
1. Círculo de 16 píxeles  
2. Comparación de intensidades  
3. Umbral **t**  
4. Si existen N píxeles contiguos más brillantes u oscuros, es keypoint

### Paso 2: BRIEF
1. Parche alrededor del keypoint  
2. Selección de pares de píxeles  
3. Comparación de intensidades  
4. Generación de cadena binaria (descriptor)

### Steered BRIEF
1. Cálculo de orientación del keypoint  
2. Rotación del patrón BRIEF  
3. Cálculo del descriptor rotado

## Ventajas
- Extremadamente rápido  
- Libre de patentes  
- Ideal para sistemas embebidos y móviles

## Campos de aplicación
- Realidad aumentada  
- Reconocimiento de objetos  
- Reconstrucción 3D  
- Panorámicas  
- Odometría visual
