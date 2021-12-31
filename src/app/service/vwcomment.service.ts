import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VwComment } from '../models/vwcomment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VwCommentService {

  url = 'https://localhost:8443/vwcomment/';
 // url = 'http://localhost:8080/vwcomment/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<VwComment[]> {
    return this.httpClient.get<VwComment[]>(this.url + 'list');
  }

  public detail(id: number): Observable<VwComment> {
    return this.httpClient.get<VwComment>(this.url + `detail/${id}`);
  }

  public detailRecipeId(recipeId: number): Observable<VwComment[]> {
    return this.httpClient.get<VwComment[]>(this.url + `detailrecipe/${recipeId}`);
  }
  
}
