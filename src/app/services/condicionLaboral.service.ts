import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/responseApi';
import { CondicionLaboral } from '../interfaces/condicionLaboral';
@Injectable({
  providedIn: 'root'
})
export class CondicionLaboralService {

  private urlApi: string = environment.endpoit + "CondicionLaborales/"
  constructor(private http: HttpClient) { }


  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}lista`);
  }
  guardar(request: CondicionLaboral): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}guardar`, request);
  }
  editar(request: CondicionLaboral): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}editar`, request);
  }
  eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}eliminar/${id}`);
  }
}
