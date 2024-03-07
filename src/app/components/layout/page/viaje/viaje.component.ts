import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViajeService } from 'src/app/services/viaje.service';
import { ModalViajeComponent } from '../../modales/modalViaje/modalViaje.component';
import Swal from 'sweetalert2';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  dataInicio: any[] = [];
  columnaTabla: string[] = [
    'acciones',
    'viajeID',
    'fechaLlegada',
    'fechaSalida',
    'tipoVehiculo',
    'patente',

    'ciudadOrigen',
    'ciudadDestino',
    'status',

];

  dataLista = new MatTableDataSource(this.dataInicio)
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  constructor(
    private utilidadService: UtilidadService,
    private vajeService:ViajeService,private dialogo: MatDialog,) { }

  ngOnInit() {
    this.getAllViajes()

  }
  nuevoCl() {
    this.dialogo.open(ModalViajeComponent, {
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getAllViajes();
    })
  }
  editarCl(viaje: any) {
    console.log("editar", viaje)
    this.dialogo.open(ModalViajeComponent, {
      disableClose: true,
      data: viaje
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getAllViajes();
    })
  }
  eliminarCl(viaje: any) {
    console.log()
    Swal.fire({
      title: "Desea eliminar el viaje",
      text: viaje.descripcion,
      icon: "warning",
      confirmButtonColor: "#3085b6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No,volver"
    }).then((res) => {
      if (res.isConfirmed) {

        this.vajeService.eliminar(viaje.viajeID).subscribe({
          next: (data) => {
            if (data) {
              this.utilidadService.mostrarAlerta("El Viaje fue eliminado", "Listo!");
              this.getAllViajes();
            } else {
              this.utilidadService.mostrarAlerta("NO se pudo Viaje", "Error")
            }
          },
          error(err) {

          }
        })
      }
    })
  }

  getAllViajes(){
    this.vajeService.lista().subscribe(
      data=>{
        this.dataLista=data
      }
    )
  }


}
