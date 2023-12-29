import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService) { }
  private getHeaders(): HttpHeaders {
    const token = this.tokenStorageService.getToken();

    if (!token) {
      return new HttpHeaders();
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAllCours(): Observable<Cours[]> {
    const headers = this.getHeaders();
    return this.http.get<Cours[]>(`${this.apiUrl}user/cours`,{ headers });
  }
  createCours(cours: Cours): Observable<Cours> {
    const headers = this.getHeaders();
    return this.http.post<Cours>(`${this.apiUrl}admin/cours/create`, cours, { headers });
  }

    uploadPhotos(id: number, coursPhoto: File, title: string): Observable<string> {
      const headers = this.getHeaders();
  
      const formData: FormData = new FormData();
      formData.append('coursPhoto', coursPhoto, coursPhoto.name);
  
      return this.http.post<string>(`${this.apiUrl}admin/uploadPhotos/${id}?title=${title}`, formData, { headers });
    }
    deleteCoursById(id: number): Observable<string> {
      const headers = this.getHeaders();
      return this.http.delete<string>(`${this.apiUrl}admin/cours/${id}`, { headers });
    }
    updateCoursById(id: number, coursModel: any): Observable<Cours> {
      const headers = this.getHeaders();
      return this.http.put<Cours>(`${this.apiUrl}admin/cours/update/${id}`, coursModel, { headers });
    }
}
