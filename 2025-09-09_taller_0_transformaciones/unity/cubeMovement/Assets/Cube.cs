using UnityEngine;

public class Cube : MonoBehaviour
{
    // Parámetros personalizables
    public float intervaloMovimiento = 2f;    // Tiempo entre movimientos aleatorios
    public float distanciaMovimiento = 1f;    // Magnitud del movimiento aleatorio
    public float velocidadRotacion = 90f;     // Grados por segundo
    public float escalaBase = 1f;             // Tamaño base
    public float escalaAmplitud = 0.5f;       // Oscilación de escala

    // Tiempo para el próximo movimiento aleatorio
    private float tiempoProximoMovimiento;

    void Start()
    {
        // Inicializa el tiempo para el primer movimiento
        tiempoProximoMovimiento = Time.time + intervaloMovimiento;
    }

    void Update()
    {
        // transform.Translate(Vector3.right * Time.deltaTime);
        // === 1. Movimiento aleatorio por eje X o Y ===
        if (Time.time >= tiempoProximoMovimiento)
        {
            Vector3 direccion = Vector3.zero;

            // Elige aleatoriamente mover en X o Y
            if (Random.value > 0.5f)
            {
                direccion = new Vector3(Random.Range(-1f, 1f), 0f, 0f); // Movimiento en X
            }
            else
            {
                direccion = new Vector3(0f, Random.Range(-1f, 1f), 0f); // Movimiento en Y
            }

            transform.Translate(direccion.normalized * distanciaMovimiento, Space.World);

            // Actualiza el tiempo para el próximo movimiento
            tiempoProximoMovimiento = Time.time + intervaloMovimiento;
        }

        // === 2. Rotación constante ===
        transform.Rotate(Vector3.forward * velocidadRotacion * Time.deltaTime);

        // === 3. Escalado oscilante ===
        float escalaActual = escalaBase + Mathf.Sin(Time.time) * escalaAmplitud;
        transform.localScale = new Vector3(escalaActual, escalaActual, escalaActual);
    }
}
