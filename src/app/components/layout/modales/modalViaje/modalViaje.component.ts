import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajeService } from 'src/app/services/viaje.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modalViaje',
  templateUrl: './modalViaje.component.html',
  styleUrls: ['./modalViaje.component.css']
})
export class ModalViajeComponent implements OnInit {

  formularioCl: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  constructor(private modalActual: MatDialogRef<ModalViajeComponent>,
    @Inject(MAT_DIALOG_DATA) public datos: any, private VehiculoService: VehiculoService,

    private ciudadServices: CiudadService,
    private utilitidService: UtilidadService,
    private ViajeService: ViajeService,
    private fb: FormBuilder,) {
    console.log(this.datos)
    this.formularioCl = this.fb.group({
      FechaSalida: [''],
      FechaLlegada: [''],
      VehiculoID: ['', Validators.required],
      CiudadOrigenID: ['', Validators.required],
      CiudadDestinoID: ['', Validators.required],
    });
    if (this.datos != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    this.getvehiculos()
    this.getCiudad()
    this.getCiudadDestino()
  }


  ngOnInit() {


    if (this.datos != null) {
      this.formularioCl.patchValue({
        FechaSalida: this.datos.fechaSalida,
        FechaLlegada: this.datos.fechaLlegada,
        VehiculoID: this.datos.vehiculoID,
        CiudadOrigenID: this.datos.ciudadOrigenID,
        CiudadDestinoID: this.datos.ciudadDestinoID
      })
    }
  }
  lluvia: any[] = []
  getWeatherData(city: string): void {
    this.ViajeService.getWeatherForecast(city).subscribe(
      data => {
        this.lluvia = data.weather
        console.log('Datos del pronóstico del tiempo:', data);
        // Aquí puedes manejar los datos de respuesta de la API
      },
      error => {
        console.error('Error al obtener datos del pronóstico del tiempo:', error);
      }
    );
  }
  vehiculosLista: any[] = [];
  getvehiculos() {
    this.VehiculoService.lista().subscribe(
      data => {
        this.vehiculosLista = data
      }
    )
  }
  ciudadListaDestino: any[] = [];
  getCiudadDestino() {
    this.ciudadServices.lista().subscribe(
      data => {
        this.ciudadListaDestino = data
      }
    )
  }
  ciudadLista: any[] = [];
  getCiudad() {
    this.ciudadServices.lista().subscribe(
      data => {
        this.ciudadLista = data
      }
    )
  }
  guardarEditar_Cl() {
    const selectedCiudad = this.formularioCl.get('CiudadDestinoID')?.value;

    if (selectedCiudad) {
      console.log('Ciudad ID:', selectedCiudad.ciudadID);
      console.log('Nombre Ciudad:', selectedCiudad.nombreCiudad);
    } else {
      console.error('Ninguna ciudad seleccionada.');
    }
    const viaje: any = {
      ViajeID: this.datos == null ? 0 : this.datos.viajeID,
      FechaSalida: moment(this.formularioCl.value.FechaSalida).format('YYYY-MM-DD'),
      FechaLlegada: moment(this.formularioCl.value.fechaLlegada).format('YYYY-MM-DD'),
      VehiculoID: this.formularioCl.value.VehiculoID,
      CiudadOrigenID: this.formularioCl.value.CiudadOrigenID,
      CiudadDestinoID: selectedCiudad.ciudadID
    }
    console.log("viaje", viaje)
    this.ViajeService.getWeatherForecast(selectedCiudad.nombreCiudad).subscribe(
      data => {
        this.lluvia = data.weather
        console.log("llluvia", this.lluvia)
        console.log('Datos del pronóstico del tiempo:', data.weather);

        let descrLluvia: string = 'LLuvioso'

        if (this.lluvia[0].icon != "09d") {
          if (this.datos == null) {
            console.log("JSON", viaje)
            this.ViajeService.guardar(viaje).subscribe(
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
            console.log("JSON", viaje)
            this.ViajeService.editar(viaje).subscribe(
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
        } else {
          Swal.fire({
            title: 'Detalles de Cliama',
            html: `<p><strong></strong> ${descrLluvia}</p>`,
            icon: 'info'
          });
        }

      },
      error => {
        console.error('Error al obtener datos del pronóstico del tiempo:', error);
      }
    );
    return;

  }
}
