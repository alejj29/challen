import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ModalVehiculoComponent } from '../../modales/modalVehiculo/modalVehiculo.component';
import Swal from 'sweetalert2';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  columnaTabla: string[] = ['acciones', 'vehiculoID', 'tipoVehiculo', 'patente', 'marca', 'modelo', 'color', 'status']
  dataInicio: any[] = [];
  dataListaCl = new MatTableDataSource(this.dataInicio)
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  constructor(private VehiculoService:VehiculoService,private dialogo: MatDialog,private utilidadService: UtilidadService) { }

  ngOnInit() {
    this.getVehculo()
  }
  nuevoCl() {
    this.dialogo.open(ModalVehiculoComponent, {
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getVehculo();
    })
  }
  editarCl(ciudad: any) {
    console.log("editar", ciudad)
    this.dialogo.open(ModalVehiculoComponent, {
      disableClose: true,
      data: ciudad
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getVehculo();
    })
  }
  eliminarCl(cl: any) {
    Swal.fire({
      title: "Desea eliminar El Vehiculo",
      text: cl.descripcion,
      icon: "warning",
      confirmButtonColor: "#3085b6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No,volver"
    }).then((res) => {
      if (res.isConfirmed) {

        this.VehiculoService.eliminar(cl.vehiculoID).subscribe({
          next: (data) => {
            if (data) {
              this.utilidadService.mostrarAlerta("El Vehiculo fue eliminado", "Listo!");
              this.getVehculo();
            } else {
              this.utilidadService.mostrarAlerta("NO se pudo eliminar el Vehiculo", "Error")
            }
          },
          error(err) {

          }
        })
      }
    })
  }

  getVehculo(){
    this.VehiculoService.lista().subscribe(
      data=>{
        console.log(data)
        this.dataListaCl.data = data
      }
    )
  }
}
