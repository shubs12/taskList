import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { HttpClient } from '@angular/common/http';
import { BaseUrl } from '../shared/baseUrl';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { ProcessHTTPmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPMsgService: ProcessHTTPmsgService) { }



getLeaders(): Observable<leader[]> {
  return this.http.get<leader[]>(BaseUrl + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getLeader(id: number): Observable<leader> {
  return this.http.get<leader>(BaseUrl  + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
}

getFeaturedLeader(): Observable<leader> {
  return this.http.get<leader[]>(BaseUrl  + 'leadership?featured=true').pipe(map(leader => leader[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
}
}
