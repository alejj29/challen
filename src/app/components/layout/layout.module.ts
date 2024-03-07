import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LayoutRoutingModule } from './layout-routing.module';

import { SharedModule } from 'src/app/reutilizable/shared/shared.module';
import { CondicionLaboralComponent } from './page/condicionLaboral/condicionLaboral.component';
import { ModalCondicionLaboralComponent } from './modales/modalCondicionLaboral/modalCondicionLaboral.component';
import { CiudadComponent } from './page/ciudad/ciudad.component';
import { ViajeComponent } from './page/viaje/viaje.component';
import { VehiculoComponent } from './page/vehiculo/vehiculo.component';
import { ModalCiudadComponent } from './modales/modalCiudad/modalCiudad.component';
import { ModalVehiculoComponent } from './modales/modalVehiculo/modalVehiculo.component';
import { ModalViajeComponent } from './modales/modalViaje/modalViaje.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ],
  declarations: [
    CondicionLaboralComponent,
    ModalCondicionLaboralComponent,
    CiudadComponent,
    ViajeComponent,
    VehiculoComponent,
    ModalCiudadComponent,
    ModalVehiculoComponent,
    ModalViajeComponent
  ]
})
export class LayoutModule { }
