import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uri: string = 'http://127.0.0.1:8000';
  httpClient: any;

  constructor(private http: HttpClient) { }

  public uploadGroups(data: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const options = {
      headers: headers,
    };

    return this.http.post<any>(this.uri + '/api/groups/import', data, options);
  }
}
