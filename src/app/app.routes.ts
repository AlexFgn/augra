// Importa el tipo Routes para definir rutas de la aplicación
import { Routes } from '@angular/router';
// Importa el componente de chat que se mostrará en la ruta '/chat'
import { ChatComponent } from './feature/chat/chat.component';

// Definición del array de rutas de la aplicación
export const routes: Routes = [
    //Ruta raiz que redirige automaticamente a chat
    {path: '', redirectTo: 'chat', pathMatch: 'full'},

    //Ruta /chat que renderiza ChatComponent
    {path: 'chat', component: ChatComponent}, 

    // Ruta comodin que redirige cualquier otra ruta a 'chat'
    {path : '**', redirectTo: 'chat'}
];
