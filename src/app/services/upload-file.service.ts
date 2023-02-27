import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8086/api/csv';
  constructor(private http: HttpClient) { }

  //Upload a csv file
  upload(file: File): Observable<HttpEvent<any>>{
      const formData: FormData = new FormData();

      formData.append('file',file);

      const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

      return this.http.request(req);
  }

  //Fetch the data from the csv file
  getTutorials(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tutorials`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }


  getColumnsHeader(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file',file);

    const req = new HttpRequest('GET',`${this.baseUrl}/header`,formData);
    return this.http.get(`${this.baseUrl}/header`);
  }
  
}
