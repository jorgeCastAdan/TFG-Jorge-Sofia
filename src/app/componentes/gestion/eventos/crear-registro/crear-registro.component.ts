import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-registro',
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './crear-registro.component.html',
  styleUrl: './crear-registro.component.css'
})
export class CrearRegistroComponent {
  @Inject(MAT_DIALOG_DATA) public dataSource: any;
}
