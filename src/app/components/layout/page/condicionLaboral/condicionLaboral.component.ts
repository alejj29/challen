import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CondicionLaboral } from 'src/app/interfaces/condicionLaboral';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { CondicionLaboralService } from 'src/app/services/condicionLaboral.service';
import Swal from 'sweetalert2';
import { ModalCondicionLaboralComponent } from '../../modales/modalCondicionLaboral/modalCondicionLaboral.component';

@Component({
  selector: 'app-condicionLaboral',
  templateUrl: './condicionLaboral.component.html',
  styleUrls: ['./condicionLaboral.component.css']
})
export class CondicionLaboralComponent implements OnInit {

  columnaTabla: string[] = ['acciones', 'Codigo', 'Nombre', 'HorasMensualesMaximo', 'HorasMensualesMinimo', 'HorasDiariasMaximo', 'HorasDiariasMinimo', 'DiasDescansoMaximo', 'DiasDescansoGD', 'DiasDescansoGN']
  dataInicio: CondicionLaboral[] = [];
  dataListaCl = new MatTableDataSource(this.dataInicio)
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator
  constructor(
    private dialogo: MatDialog,
    private clServices: CondicionLaboralService,
    private utilidadService: UtilidadService
  ) { }

  ngOnInit() {
    this.obtenerCl();
  }
  obtenerCl() {
    this.clServices.lista().subscribe(
      {
        next: (data) => {
          console.log(data)
          if (data.status) { this.dataListaCl.data = data.value } else { this.utilidadService.mostrarAlerta("NO se pudo encontrar datos", 'Opps!') }
        },
        error: () => { }
      });
  }
  ngAfterViewInit(): void {
    this.dataListaCl.paginator = this.paginacionTabla
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event?.target as HTMLInputElement).value
    this.dataListaCl.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoCl() {
    this.dialogo.open(ModalCondicionLaboralComponent, {
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.obtenerCl();
    })
  }

  editarCl(cl: CondicionLaboral) {
    console.log("editar", cl)
    this.dialogo.open(ModalCondicionLaboralComponent, {
      disableClose: true,
      data: cl
    }).afterClosed().subscribe(res => {
      if (res === 'true') this.obtenerCl();
    })
  }

  eliminarCl(cl: any) {
    Swal.fire({
      title: "Desea eliminar La Condicion Laboral",
      text: cl.descripcion,
      icon: "warning",
      confirmButtonColor: "#3085b6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No,volver"
    }).then((res) => {
      if (res.isConfirmed) {

        this.clServices.eliminar(cl.idCondicionLaboral).subscribe({
          next: (data) => {
            if (data.status) {
              this.utilidadService.mostrarAlerta("El Condicion Laboral fue eliminado", "Listo!");
              this.obtenerCl();
            } else {
              this.utilidadService.mostrarAlerta("NO se pudo eliminar el Condicion Laboral", "Error")
            }
          },
          error(err) {

          }
        })
      }
    })
  }

}
