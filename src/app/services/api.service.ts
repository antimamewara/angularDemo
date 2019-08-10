import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { IApiService } from './../iservices/iApi';
@Injectable()
/**
 * @desc this class is used to get, post, update api data.
 */
export class ApiService implements IApiService {

  apiUrl = environment.url;
  constructor(private http: HttpClient,
    private routerService: Router,
  ) {
  }


  /**
   * @method getApi()
   * @desc getApi is common method for get API
   * @param endpoint :string - end point url of api calling.
   * @param returnWithoutMap :boolean - a boolean to return with or without map.
   */

  getApi(path): any {
    let headers: any;
    headers = this.getHeaders();
    const request = this.http.get(`${this.apiUrl}/${path}`, headers);
    // console.log(request);
    return request
      .pipe(map((res) => {
        if (res) {
          return res;
        } else {
          const data = {
            count: 0,
            message: 'No content',
            response: [],
            status: 204
          };
          return data;
        }
      }));
  }


  /**
   * @method getHeaders()
   * @desc get api headers data  by using this method
   * @return request header with define formate
   */
  private getHeaders(): any {
    let headers;
    headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }
}
