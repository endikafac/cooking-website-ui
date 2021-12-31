import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { Observable } from 'rxjs';
import { RecipeFilter } from '../models/recipe-filter';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  url = 'https://localhost:8443/recipe/';
 // url = 'http://localhost:8080/recipe/';

  constructor(private httpClient: HttpClient) { }

  public create(recipe: Recipe): Observable<any> {
    return this.httpClient.post<any>(this.url + 'new', recipe);
  }

  public list(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.url + 'list');
  }

  public detail(id: number): Observable<Recipe> {
    return this.httpClient.get<Recipe>(this.url + `detail/${id}`);
  }

  public save(recipe: Recipe): Observable<any> {
    return this.httpClient.post<any>(this.url + 'create', recipe);
  }

  public update(id: number, recipe: Recipe): Observable<any> {
    return this.httpClient.put<any>(this.url + `update/${id}`, recipe);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public search(recipeFilter: RecipeFilter): Observable<any> {
    return this.httpClient.post<any>(this.url + 'search', recipeFilter);
  }

  public searchByKeyword(recipeFilters: RecipeFilter[]): Observable<any> {
    return this.httpClient.post<any>(this.url + 'searchByKeyword', recipeFilters);
  }

  public searchByKeywordId(recipeFilters: RecipeFilter[]): Observable<any> {
    return this.httpClient.post<any>(this.url + 'searchByKeywordId', recipeFilters);
  }
  
  public checkIfUserHasOwnRecipesOrComments(recipeFilter: RecipeFilter): Observable<any> {
    return this.httpClient.post<any>(this.url + 'checkIfUserHasOwnRecipesOrComments', recipeFilter);
  }
  

  
}
