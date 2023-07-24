import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MapaComponent } from './components/mapa/mapa.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [MapaComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MaterialModule,
  ],
  exports: [MapaComponent],
})
export class GoogleMapModule {}
