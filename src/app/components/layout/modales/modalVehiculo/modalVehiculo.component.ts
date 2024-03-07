import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-modalVehiculo',
  templateUrl: './modalVehiculo.component.html',
  styleUrls: ['./modalVehiculo.component.css']
})
export class ModalVehiculoComponent implements OnInit {

  formularioCl: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  constructor( private modalActual: MatDialogRef<ModalVehiculoComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private utilitidService: UtilidadService,
    private VehiculoService:VehiculoService,
    private fb: FormBuilder,) {
      console.log(this.datos)
    this.formularioCl = this.fb.group({
      TipoVehiculo: [''],
      Patente: [''],
      Marca: [''],
      Modelo: [''],
      Color: ['']
    });
    if (this.datos != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
   }
   ngOnInit() {
    if (this.datos != null) {
      this.formularioCl.patchValue({
        TipoVehiculo: this.datos.tipoVehiculo,
        Patente: this.datos.patente,
        Marca: this.datos.marca,
        Modelo: this.datos.modelo,
        Color: this.datos.color,
      })
    }
  }

  guardarEditar_Cl() {
    const vehiculo: any = {
      VehiculoID: this.datos == null ? 0 : this.datos.vehiculoID,
      TipoVehiculo: this.formularioCl.value.TipoVehiculo,
      Patente: this.formularioCl.value.Patente,
      Marca: this.formularioCl.value.Marca,
      Modelo: this.formularioCl.value.Modelo,
      Color: this.formularioCl.value.Color
    }

    if (this.datos == null) {
      console.log("JSON", vehiculo)
      this.VehiculoService.guardar(vehiculo).subscribe(
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
      console.log("JSON", vehiculo)
      this.VehiculoService.editar(vehiculo).subscribe(
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
