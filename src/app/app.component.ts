import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';  //linea 3 incluida de primeng

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule], //linea 7 añadido "ButtonModule"
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'augra';
}
