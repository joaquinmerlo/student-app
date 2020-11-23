import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../models/alumno.model';
import { environment } from 'src/environments/environment';

const baseURL = `${environment.apiURL}/students`;

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Alumno[]>(baseURL);
  }

  getById(id: string) {
    return this.http.get<Alumno>(`${baseURL}/${id}`);
  }

  create(params) {
    return this.http.post<Alumno>(`${baseURL}/add`, params, {
      headers: this.headers,
    });
  }

  update(id: string, params) {
    return this.http.put<Alumno>(`${baseURL}/edit/${id}`, params, {
      headers: this.headers,
    });
  }

  delete(id: string) {
    return this.http.delete<string>(`${baseURL}/${id}`);
  }
}
