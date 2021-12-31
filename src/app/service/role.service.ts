import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = 'https://localhost:8443/role/';
 // url = 'http://localhost:8080/role/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(this.url + 'list');
  }

  public detail(id: number): Observable<Role> {
    return this.httpClient.get<Role>(this.url + `detail/${id}`);
  }

  public detailUsername(rolename: string): Observable<Role> {
    return this.httpClient.get<Role>(this.url + `detail-rolename/${rolename}`);
  }

  
}
