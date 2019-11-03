import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Tournament } from 'src/app/models/tourrnament';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentService extends BaseService {
  baseUrl = `${environment.baseUrl}/tournaments`;
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  public getAll(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>(this.baseUrl);
  }
}
