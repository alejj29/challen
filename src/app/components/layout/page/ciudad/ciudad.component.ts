import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ModalCiudadComponent } from '../../modales/modalCiudad/modalCiudad.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  columnaTabla: string[] = ['acciones', 'ciudadID', 'nombreCiudad', 'pais', 'poblacion', 'status']
  dataInicio: any[] = [];
  dataLista = new MatTableDataSource(this.dataInicio)
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  constructor(private CiudadService: CiudadService,private dialogo: MatDialog,private utilidadService: UtilidadService) { }

  ngOnInit() {
    this.getAllCiudad()
  }
  nuevoCl() {
    this.dialogo.open(ModalCiudadComponent, {
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getAllCiudad();
    })
  }
  editarCl(ciudad: any) {
    console.log("editar", ciudad)
    this.dialogo.open(ModalCiudadComponent, {
      disableClose: true,
      data: ciudad
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.getAllCiudad();
    })
  }
  eliminarCl(cl: any) {
    Swal.fire({
      title: "Desea eliminar La CCiudad",
      text: cl.descripcion,
      icon: "warning",
      confirmButtonColor: "#3085b6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No,volver"
    }).then((res) => {
      if (res.isConfirmed) {

        this.CiudadService.eliminar(cl.ciudadID).subscribe({
          next: (data) => {
            if (data) {
              this.utilidadService.mostrarAlerta("La ciudad fue eliminado", "Listo!");
              this.getAllCiudad();
            } else {
              this.utilidadService.mostrarAlerta("NO se pudo eliminar la Ciudad", "Error")
            }
          },
          error(err) {

          }
        })
      }
    })
  }

  getAllCiudad() {

    this.CiudadService.lista().subscribe(
      data => {
        console.log(data)
        this.dataLista.data = data
      }
    )
  }
}
