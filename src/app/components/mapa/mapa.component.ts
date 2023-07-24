import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Marker } from 'src/app/interfaces/marker-interface';
import { MatSnackBar } from '@angular/material/snack-bar';

// Google Maps API Key: AIzaSyCyqwyiRUKwI6VAPOs35LjbQgoOT2_fdIw

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent {
  apiLoaded: Observable<boolean>;

  options: google.maps.MapOptions = {
    center: { lat: -28.678565, lng: -66.95809 },
    zoom: 14,
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerEditing = false;
  coordinatesToAdd: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  fullMarkers: Marker[] = [];
  markerToEdit: Marker = { lat: 0, lng: 0, nombre: '' };

  editorDeMarcadoresStyle = {
    position: 'absolute',
    top: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerEditing = true;
      this.coordinatesToAdd = event.latLng.toJSON();
    }
  }

  agregarNombreMarcador(nombre: string) {
    if (nombre === '') {
      return;
    } else {
      this.markerPositions.push(this.coordinatesToAdd);
      this.fullMarkers.push({
        lat: this.markerPositions[this.markerPositions.length - 1].lat,
        lng: this.markerPositions[this.markerPositions.length - 1].lng,
        nombre: nombre,
      });
      this.markerEditing = false;
      this.localStoreAllMarkers();
      let snackBarRef = this._snackBar.open('Marcador agregado', 'Entendido');
      snackBarRef.onAction().subscribe(() => {
        console.log('The snackbar action was triggered!');
        snackBarRef.dismiss();
      });
    }
  }

  cancelarNombreMarcador() {
    this.markerEditing = false;
    this.markerToEdit = { lat: 0, lng: 0, nombre: '' };
  }

  markerClick(event: google.maps.MapMouseEvent) {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    this.fullMarkers.forEach((fullMarker) => {
      if (fullMarker.lat === lat && fullMarker.lng === lng) {
        this.markerEditing = true;
        this.markerToEdit = fullMarker;
      }
    });
    console.log(event.latLng?.lat(), event.latLng?.lng());
  }

  eliminarMarcador(markerToDelete: Marker) {
    this.fullMarkers.forEach((fullMarker, index) => {
      if (
        fullMarker.lat === markerToDelete.lat &&
        fullMarker.lng === markerToDelete.lng
      ) {
        this.fullMarkers.splice(index, 1);
      }
      this.localStoreAllMarkers();
    });

    this.markerPositions.forEach((markerPosition, index) => {
      if (
        markerPosition.lat === markerToDelete.lat &&
        markerPosition.lng === markerToDelete.lng
      ) {
        this.markerPositions.splice(index, 1);
      }
    });

    this.markerEditing = false;
    let snackBarRef = this._snackBar.open('Marcador eliminado', 'Entendido');
      snackBarRef.onAction().subscribe(() => {
        console.log('The snackbar action was triggered!');
        snackBarRef.dismiss();
      });
    
  }

  localStoreAllMarkers() {
    localStorage.setItem('mapasFullMarkers', JSON.stringify(this.fullMarkers));
    localStorage.setItem(
      'mapasMarkerPositions',
      JSON.stringify(this.markerPositions)
    );
  }

  constructor(httpClient: HttpClient, private _snackBar: MatSnackBar) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyqwyiRUKwI6VAPOs35LjbQgoOT2_fdIw',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );

    const fullMarkers = localStorage.getItem('mapasFullMarkers');
    if (fullMarkers !== null) {
      this.fullMarkers = JSON.parse(fullMarkers);
    }
    const markerPositions = localStorage.getItem('mapasMarkerPositions');
    if (markerPositions !== null) {
      this.markerPositions = JSON.parse(markerPositions);
    }
  }
}
