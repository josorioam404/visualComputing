void setup() {
  size(600, 600, P3D);  // Ventana 3D
  noStroke();
}

void draw() {
  background(30);

  // Luz
  lights();
  
  // Movimiento basado en el tiempo
  float angle = radians(frameCount);        // Rotación continua
  float scaleFactor = 1 + 0.5 * sin(radians(frameCount)); // Escala cíclica
  float waveX = 100 * sin(radians(frameCount));           // Movimiento ondulado
  
  // Centrar en pantalla
  translate(width/2, height/2, 0);

  // Aislar transformaciones
  pushMatrix();

  // Aplicar transformaciones
  translate(waveX, 0, 0);    // Movimiento ondulado
  rotateX(angle);            // Rotación en X
  rotateY(angle * 1.2);      // Rotación en Y
  scale(scaleFactor);        // Escala oscilante
  
  // Dibujar el cubo
  fill(0, 150, 255);
  box(100); // Cubo de 100x100x100

  popMatrix(); // Restaurar la matriz para futuros objetos
}
