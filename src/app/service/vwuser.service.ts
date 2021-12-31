import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VwUser } from '../models/vwuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VwUserService {

  url = 'https://localhost:8443/vwuser/';
 //url = 'http://localhost:8080/vwuser/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<VwUser[]> {
    return this.httpClient.get<VwUser[]>(this.url + 'list');
  }

  public detail(id: number): Observable<VwUser> {
    return this.httpClient.get<VwUser>(this.url + `detail/${id}`);
  }
  
}
