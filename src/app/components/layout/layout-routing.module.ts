import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { CondicionLaboralComponent } from './page/condicionLaboral/condicionLaboral.component';
import { CiudadComponent } from './page/ciudad/ciudad.component';
import { ViajeComponent } from './page/viaje/viaje.component';
import { VehiculoComponent } from './page/vehiculo/vehiculo.component';




const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [

      {
        path: "cl",
        component: CondicionLaboralComponent
      },
      {
        path: "ciudad",
        component: CiudadComponent
      },
      {
        path: "viaje",
        component: ViajeComponent
      },
      {
        path: "vehiculo",
        component: VehiculoComponent
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
