import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CondicionLaboral } from 'src/app/interfaces/condicionLaboral';
import { UtilidadService } from 'src/app/reutilizable/utilidad.service';
import { CondicionLaboralService } from 'src/app/services/condicionLaboral.service';

@Component({
  selector: 'app-modalCondicionLaboral',
  templateUrl: './modalCondicionLaboral.component.html',
  styleUrls: ['./modalCondicionLaboral.component.css']
})
export class ModalCondicionLaboralComponent implements OnInit {

  formularioCl: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  // listaCategoria: Categoria[] = [];
  constructor(
    private modalActual: MatDialogRef<ModalCondicionLaboralComponent>,
    @Inject(MAT_DIALOG_DATA) public datosCl: CondicionLaboral,
    private fb: FormBuilder,
    // private categoriaService: CategoriaService,
    private utilitidService: UtilidadService,
    private clService: CondicionLaboralService,
  ) {

    this.formularioCl = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      HorasMensualesMaximo: ['', Validators.required],
      HorasMensualesMinimo: ['', Validators.required],
      HorasDiariasMaximo: ['', Validators.required],
      HorasDiariasMinimo: ['', Validators.required],
      DiasDescansoMaximo: ['', Validators.required],
      DiasDescansoGD: ['', Validators.required],
      DiasDescansoGN: ['', Validators.required],
      CombineGuardRule: ['1', Validators.required],
    });
    if (this.datosCl != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }


  }

  ngOnInit() {
    if (this.datosCl != null) {
      this.formularioCl.patchValue({
        codigo: this.datosCl.codigo,
        nombre: this.datosCl.descripcion,
        HorasMensualesMaximo: this.datosCl.horasMensualesMaximo,
        HorasMensualesMinimo: this.datosCl.horasMensualesMinimo,
        HorasDiariasMaximo: this.datosCl.horasDiariasMaximo,
        HorasDiariasMinimo: this.datosCl.horasDiariasMinimo,
        DiasDescansoMaximo: this.datosCl.diasDescansoMaximo,
        DiasDescansoGD: this.datosCl.diasDescansoGd,
        DiasDescansoGN: this.datosCl.diasDescansoGn,
        CombineGuardRule: this.datosCl.combineGuardRule.toString(),
      })
    }
  }

  guardarEditar_Cl() {
    const condicionLaboral: CondicionLaboral = {
      idCondicionLaboral: this.datosCl == null ? 0 : this.datosCl.idCondicionLaboral,
      codigo: this.formularioCl.value.codigo,
      descripcion: this.formularioCl.value.nombre,
      horasMensualesMaximo: this.formularioCl.value.HorasMensualesMaximo,
      horasMensualesMinimo: this.formularioCl.value.HorasMensualesMinimo,
      horasDiariasMaximo: this.formularioCl.value.HorasDiariasMaximo,
      horasDiariasMinimo: this.formularioCl.value.HorasDiariasMinimo,
      diasDescansoMaximo: this.formularioCl.value.DiasDescansoMaximo,
      diasDescansoGd: this.formularioCl.value.DiasDescansoGD,
      diasDescansoGn: this.formularioCl.value.DiasDescansoGN,
      combineGuardRule: parseInt(this.formularioCl.value.CombineGuardRule)
    }

    if (this.datosCl == null) {
      console.log("JSON", condicionLaboral)
      this.clService.guardar(condicionLaboral).subscribe(
        {
          next: (data) => {
            if (data.status) {
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
      console.log("JSON", condicionLaboral)
      this.clService.editar(condicionLaboral).subscribe(
        {
          next: (data) => {
            if (data.status) {
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
