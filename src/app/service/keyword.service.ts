import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Keyword } from '../models/keyword';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {

  url = 'https://localhost:8443/keyword/';
  // url = 'http://localhost:8080/keyword/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Keyword[]> {
    return this.httpClient.get<Keyword[]>(this.url + 'list');
  }
  
  public listDistinct(): Observable<Keyword[]> {
    return this.httpClient.get<Keyword[]>(this.url + 'listdistinct');
  }

  public detail(id: number): Observable<Keyword> {
    return this.httpClient.get<Keyword>(this.url + `detail/${id}`);
  }

  public detailUsername(keyword: string): Observable<Keyword> {
    return this.httpClient.get<Keyword>(this.url + `detail-keyword/${keyword}`);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + `delete/${id}`);
  }

  public clean(): Observable<any> {
    return this.httpClient.delete<any>(this.url + `clean`);
  }
  
}
