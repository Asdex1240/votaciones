import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  @Output() DNI = new EventEmitter<string>();

  form: FormGroup

  constructor(private fb: FormBuilder ){
    this.form = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  sendDNI(){
    const value = this.form.value;
    this.DNI.emit(value.dni);
  }






}
