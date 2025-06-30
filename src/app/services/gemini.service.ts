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
private systemPrompt: string = ``;

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

