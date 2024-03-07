import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private urlApi: string = environment.endpoit + "Vehiculos/"
  constructor(private http: HttpClient) { }


  lista(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}GetAllVehiculo/1`);
  }
  guardar(request: any): Observable<any> {
    return this.http.post<any>(`${this.urlApi}Create`, request);
  }
  editar(request: any): Observable<any> {
    return this.http.put<any>(`${this.urlApi}Update`, request);
  }
  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlApi}Delete/${id}`);
  }

}
