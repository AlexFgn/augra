import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './header.component.html', //Archivo de plantilla HTML
  styleUrls: ['./header.component.css'], // Archivo de stilos css
  encapsulation: ViewEncapsulation.None // Desabilita encapsulacion para poder aplicar estilos globalos
})
export class HeaderComponent {
  //Bandera que indica el modo oscuro (true) o claro (false)
  darkMode = false;

  // Alterna el tema de la aplicacion entre claro y oscuro
  toggleTheme(){
    this.darkMode = !this.darkMode; // cambia el estado de darkMode
    document.body.classList.toggle('dark', this.darkMode);// Aplica o remueve clase en el body
  }
}
