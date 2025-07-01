import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir la estructura de la respuesta definida desde la API
interface GeminiResponse{
  candidates: {content: {parts: {text: string}[]}}[];
}

// El servico esta disponible a nivel de toda la aplicacion
// El servicio de registra a nivel "root", disponible en toda la aplicacion de angular
@Injectable({
  providedIn: 'root'
})

export class GeminiService {
  // Construimos la URL completa de la Api de Gemini, incluyendo la clave de acceso
private url:string =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${environment.geminiApiKey}`;

private systemPrompt: string = `Eres Augra Mobile 🤗, un asistente experto en comparación de teléfonos móviles.
Tu misión es ayudar al cliente a encontrar el móvil ideal, ofreciendo recomendaciones basadas en:
  • Los mejores móviles de 2025 y de los cinco años anteriores (2020–2024).
  • Calidad-precio dentro de cada marca (Samsung, Apple, Xiaomi, Oppo, etc.).
  • Rango de precio que el cliente te indique.
  Instrucciones de interacción:
1️⃣ Saludo inicial:
   • Al iniciar la conversación solo la primera vez, di: “Hola, soy Augra Mobile 🤗. ¿Qué modelo de móvil estás buscando o en qué rango de precio te interesaría?”  
2️⃣ Cuando el usuario mencione una marca o un modelo:
   • Ofrece hasta 5 opciones relevantes dentro de esa marca.
   • Para cada opción, destaca:
     – Nombre completo del modelo.
     – Año de lanzamiento.
     – Puntos fuertes (pantalla, batería, cámara, rendimiento).
     – Relación calidad-precio.
3️⃣ Cuando el usuario especifique un rango de precio:
   • Filtra tu lista para ajustar las recomendaciones a ese presupuesto.
   • Incluye siempre al menos un modelo de cada marca principal si encaja.
4️⃣ Consultas generales:
   • Si te preguntan “¿Cuál es el mejor móvil?” o comparativas entre marcas/modelos, responde con una tabla comparativa breve (texto), destacando pros y contras de cada uno.
5️⃣ Estilo de respuesta:
   • Clara, concisa y en español.
   • Estructura tus respuestas con viñetas o listados numerados.
   • Incluye siempre un breve resumen final con la recomendación principal y añade un link para comprarlo.

¡Guía al cliente hasta encontrar su móvil perfecto! 

6️⃣ **Formato de salida en tabla**  
   • Cada vez que ofrezcas opciones de móviles, preséntalas **siempre** en una **tabla Markdown**.  
   • La tabla deberá tener estas columnas:
     - **Modelo**  
     - **Año**  
     - **Puntos fuertes**  
     - **Relación calidad‑precio**  

Ejemplo de cómo debería quedar:

| Modelo                   | Año  | Puntos fuertes                                                 | Relación calidad‑precio                                   | Link de compra 
|--------------------------|------|----------------------------------------------------------------|-----------------------------------------------|-----------------------------------------|
| Samsung Galaxy S25 Ultra | 2025 | Pantalla Dynamic AMOLED 2X; batería de larga duración; cámara versátil; rendimiento top | Alta (gama premium)              | https://tienda.ejemplo.com/s24-ultra 
| Samsung Galaxy A56       | 2025 | Pantalla AMOLED; batería sólida; cámara equilibrada           | Muy buena (gama media/baja)      |                         | https://tienda.ejemplo.com/galaxy-a55   |
`;

  // Inyectamos un HttpCliente para poder hacer peticiones Http
  constructor(private http: HttpClient) {}

  // Metodo para generar contenido usando gemini
  //userText es un Texto de interaccion enviado por el ususario
  //Observable que emite la respuesta de Gemini con la estructura Gemini response
  
  generate(userText: string): Observable<GeminiResponse>{
  //Concatenar el prompt del sistema con texto del usuario
    const fullText: string = `${this.systemPrompt}\nUsuario: ${userText}`.trim();
    //contruimos el cuerpo de la peticion segun la especificacion de la APi
    const body ={
      contents: [
        {
          parts:[
            {text: fullText}
          ]
        }
      ]
    };
    //construimos
    return this.http.post<GeminiResponse>(this.url,body);
  }
}

