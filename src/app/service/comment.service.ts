import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url = 'https://localhost:8443/comment/';
  //url = 'http://localhost:8080/comment/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.url + 'list');
  }

  public detail(id: number): Observable<Comment> {
    return this.httpClient.get<Comment>(this.url + `detail/${id}`);
  }

  public detailUsername(comment: string): Observable<Comment> {
    return this.httpClient.get<Comment>(this.url + `detail-Comment/${comment}`);
  }

  public save(comment: Comment): Observable<any> {
    return this.httpClient.post<any>(this.url + 'create', comment);
  }

  public update(id: number, comment: Comment): Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, comment);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }
  
}
