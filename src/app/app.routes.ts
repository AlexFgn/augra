import { Routes } from '@angular/router';
import { ChatComponent } from './feature/chat/chat.component';

export const routes: Routes = [
    //Ruta raiz que redirige automaticamente a chat
    {path: '', redirectTo: 'chat', pathMatch: 'full'},

    //Ruta /chat que renderiza ChatComponent
    {path: 'chat', component: ChatComponent}, 

    // Ruta comodin que redirige cualquier otra ruta a 'chat'
    {path : '**', redirectTo: 'chat'}
];
