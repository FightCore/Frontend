import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Matchup } from 'src/app/models/matchup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchupService extends BaseService {

  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }
  private matchupUrl = `${environment.baseUrl}/matchups`;

  public getAll(characterId: number): Observable<Matchup[]> {
    return this.httpClient.get<Matchup[]>(`${this.matchupUrl}/${characterId}`);
  }
}
