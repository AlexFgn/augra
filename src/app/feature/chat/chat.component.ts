// Importaciones de Angular y módulos necesarios
import {
  Component,            // Decorador para definir componentes
  AfterViewChecked,     // Ciclo de vida para acciones tras la detección de cambios en la vista
  ElementRef,           // Referencia a elementos del DOM
  ViewChild             // Decorador para obtener referencias a elementos dentro de la plantilla
} from '@angular/core';
import { CommonModule, NgForOf, NgClass } from '@angular/common'; // Módulos estructurales y de directivas
import { FormsModule } from '@angular/forms';                   // Soporte para formularios y ngModel
import { CardModule } from 'primeng/card';                       // Componente de tarjeta de PrimeNG
import { ScrollPanelModule } from 'primeng/scrollpanel';         // Panel con scroll de PrimeNG
import { InputTextModule } from 'primeng/inputtext';             // Campo de texto de PrimeNG
import { ButtonModule } from 'primeng/button';                   // Botón de PrimeNG
import { ProgressSpinnerModule } from 'primeng/progressspinner'; // Spinner de carga de PrimeNG
import { SimpleMarkdownPipe } from '../../shared/pipes/markdown.pipe'; // Pipe para renderizar Markdown simple
import { GeminiService } from '../../services/gemini.service';    // Servicio para comunicarse con la API Gemini

// Definición de la estructura de un mensaje
interface Message {
  from: 'user' | 'ia';   // Origen del mensaje: usuario o IA
  text: string;          // Contenido del mensaje
  timestamp?: Date;      // Marca de tiempo opcional
}

@Component({
  selector: 'app-chat',                // Selector del componente en templates
  standalone: true,                    // Componente independiente (sin módulo NgModule)
  imports: [                           // Módulos y pipes que importa este componente
    CommonModule,
    NgForOf,
    NgClass,
    FormsModule,
    CardModule,
    ScrollPanelModule,
    InputTextModule,
    ButtonModule,
    ProgressSpinnerModule,
    SimpleMarkdownPipe
  ],
  templateUrl: './chat.component.html', // Archivo de plantilla HTML
  styleUrls: ['./chat.component.css']    // Archivo de estilos CSS
})
export class ChatComponent {
  // referencia al ScrollPanel!
  @ViewChild('scroll') scrollPanel!: ElementRef;

  messages: Message[] = []; //array almacena los mensajes del chat
  userInput = ''; //Modelo vinculado al campo entrada del usuario
  loading = false; //Estado del spinner
  private shouldScroll = false; //indicador para desplazar al final tres nuevos mensajes

  constructor(private gemini: GeminiService){}//Inyeccion del servicio Gemini

  //Metodo para invocar enviar un mensaje
  send(): void{
    const text = this.userInput.trim(); //Eliminar espacios en blanco
    if(!text)return; //no enviar si el texto esta vacio
  
  //Añade el mensaje del ususario al array con timestamp actual
  this.messages.push({from: 'user', text, timestamp: new Date()});
  this.userInput = ''; //limpia el campo de entrada
  this.loading = true; //Activa el spiner y carga
  this.shouldScroll = true; //Marcar para hacer scroll al final

  //llamada al servicio Gemini para generar respuesta
  this.gemini.generate(text).subscribe({
    next: resp =>{
      //estrae el texto de la primera respuesta valida o mensaje de error
      const reply =
      resp.candidates?.[0]?.content.parts[0].text ||
      'no se recibio respuesta valida';
      //añade la respuesta de la IA al chat
      this.messages.push({from: 'ia', text: reply, timestamp: new Date()});
      this.loading = false //Desactivar el spinner
      this.shouldScroll = true; //Marcar para scroll
    },
    error: err=>{
      //En caso de error, mostrar mensaje de error en el chat
      this.messages.push({
        from: 'ia', 
        text: `Error: ${err.messages}`,
        timestamp: new Date()
      });
      this.loading = false; //Desactiva el spinner
      this.shouldScroll = true; //marcar para scroll
    }
  });
  }
  //Ciclo de vida que se ejecuta tras cada deteccion de cambios de vista
  ngAfterViewChecked(): void{
    if (this.shouldScroll && this.scrollPanel){
      //Obtiene el comtenedor interno del ScrollPanel
      const el: HTMLElement = this.scrollPanel.nativeElement.querySelector(
        '.p-scrollpanel-content'
      );
      //Desplaza el scroll hasta el final para ver el ultimo mensaje
      el.scrollTop = el.scrollHeight;
      this.shouldScroll = false; // reset del indicador
    }
  }
}
