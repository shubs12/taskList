import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {


  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPmsgService) { }



  getPromotions():  Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BaseUrl + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getPromotion(id: string):  Observable<Promotion> {
    return this.http.get<Promotion>(BaseUrl  + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  getFeaturedPromotion(): Observable<Promotion>  {
    return this.http.get<Promotion[]>(BaseUrl  + 'promotions?featured=true').pipe(map(promotion => promotion[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
}
