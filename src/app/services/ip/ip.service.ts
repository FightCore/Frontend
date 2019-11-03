import { Injectable } from '@angular/core';
import { IpResult } from 'src/app/resources/ipresult';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private httpClient: HttpClient) { }

  public getIp(): Observable<IpResult> {
    return this.httpClient.get<IpResult>('http://ip-api.com/json');
  }
}
