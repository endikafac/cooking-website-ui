import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from "../models/login-user";
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/auth/';

  constructor(private httpClient: HttpClient) { }

  public create(newUser: User): Observable<any> {
    return this.httpClient.post<any>(this.url + 'new', newUser);
  }

  public adminCreate(newUser: User): Observable<any> {
    return this.httpClient.post<any>(this.url + 'admin-new', newUser);
  }  

  public login(loginUser: LoginUser): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.url + 'login', loginUser);
  }

  public list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + 'list');
  }

  public detail(id: number): Observable<User> {
    return this.httpClient.get<User>(this.url + `detail/${id}`);
  }

  public detailUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(this.url + `detail-username/${username}`);
  }

  public detailEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(this.url + `detail-email/${email}`);
  }

  public save(user: User): Observable<any> {
    return this.httpClient.post<any>(this.url + 'create', user);
  }

  public update(id: number, user: User): Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, user);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

}
