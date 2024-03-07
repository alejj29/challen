import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { CiudadService } from 'src/app/services/ciudad.service';

@Component({
  selector: 'app-modalCiudad',
  templateUrl: './modalCiudad.component.html',
  styleUrls: ['./modalCiudad.component.css']
})
export class ModalCiudadComponent implements OnInit {
  formularioCl: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  constructor( private modalActual: MatDialogRef<ModalCiudadComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private utilitidService: UtilidadService,
    private ciudadServices:CiudadService,
    private fb: FormBuilder,) {
      console.log(this.datos)
    this.formularioCl = this.fb.group({
      NombreCiudad: ['', Validators.required],
      Pais: ['', Validators.required],
      Poblacion: ['', Validators.required],

    });
    if (this.datos != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
   }

  ngOnInit() {
    if (this.datos != null) {
      this.formularioCl.patchValue({
        NombreCiudad: this.datos.nombreCiudad,
        Pais: this.datos.pais,
        Poblacion: this.datos.poblacion,

      })
    }
  }

  guardarEditar_Cl() {
    const ciudad: any = {
      CiudadID: this.datos == null ? 0 : this.datos.ciudadID,
      NombreCiudad: this.formularioCl.value.NombreCiudad,
      Pais: this.formularioCl.value.Pais,
      Poblacion: this.formularioCl.value.Poblacion
    }

    if (this.datos == null) {
      console.log("JSON", ciudad)
      this.ciudadServices.guardar(ciudad).subscribe(
        {
          next: (data) => {
            if (data) {
              this.utilitidService.mostrarAlerta("Fue registrado", "Exito")
              this.modalActual.close("true");
            } else {
              this.utilitidService.mostrarAlerta("No se pudo registrar ", "Error");

            }
          },
          error: (e) => { }
        }
      )
    } else {
      console.log("JSON", ciudad)
      this.ciudadServices.editar(ciudad).subscribe(
        {
          next: (data) => {
            if (data) {
              this.utilitidService.mostrarAlerta("Fue editado", "Exito")
              this.modalActual.close("true");
            } else {
              this.utilitidService.mostrarAlerta("No se pudo editar", "Error");

            }
          },
          error: (e) => { }
        }
      )
    }
  }
}
