import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {


  private urlApi: string = environment.endpoit + "Viaje/"
  constructor(private http: HttpClient) { }
  private apiKey = 'a456ed5dee0bcc1a618f3e922a5b914b'; // Reemplaza con tu propia clave de API
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  // ?q=London,uk&appid=a456ed5dee0bcc1a618f3e922a5b914b

  // https://openweathermap.org/img/wn/10d@2x.png


  getLluvia(ico: string): Observable<any> {
    const url = ` https://openweathermap.org/img/wn/${ico}@2x.png`;
    return this.http.get(url);
  }

  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  lista(): Observable<any> {
    return this.http.get<any>(`${this.urlApi}GetAllViaje/1`);
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
