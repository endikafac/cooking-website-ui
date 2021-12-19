import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'http://localhost:8080/recipe/';

  constructor(private httpClient: HttpClient) { }

  public create(recipe: Recipe): Observable<any> {
    return this.httpClient.post<any>(this.url + 'new', Recipe);
  }

  public list(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url + 'list');
  }

  public detail(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.url + `detail/${id}`);
  }

  public save(recipe: Recipe): Observable<any> {
    return this.httpClient.post<any>(this.url + 'create', Recipe);
  }

  public update(id: number, recipe: Recipe): Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, Recipe);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

}
