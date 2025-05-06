import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./shared/nav/nav.component";
import { ComponenteBaseComponent } from "./layout/componente-base/componente-base.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavComponent, ComponenteBaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'santanica';
}
