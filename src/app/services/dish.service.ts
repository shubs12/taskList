import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPmsgService) { }

    getDishes(): Observable<Dish[]> {
      return this.http.get<Dish[]>(BaseUrl + 'dishes')
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getDish(id: number): Observable<Dish> {
      return this.http.get<Dish>(BaseUrl  + 'dishes/' + id)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getFeaturedDish(): Observable<Dish> {
      return this.http.get<Dish[]>(BaseUrl  + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
  
    getDishIds(): Observable<number[] | any> {
      return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
        .pipe(catchError((error: any) => error));
    }

}