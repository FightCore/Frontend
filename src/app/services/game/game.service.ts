import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseService {

  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  public getAllGames(): Observable<Game[]> {

    if (environment.mocking) {
      return new Observable(observer => observer.next(this.createMockGames()));
    }

    return this.httpClient.get<Game[]>(environment.baseUrl + '/games');
  }

  private createMockGames(): Game[] {
    const games: Game[] = [
      { id: 1, name: 'Super Smash Bros.', abbreviation: 'ssb' },
      { id: 2, name: 'Super Smash Bros. Melee', abbreviation: 'melee' },
      { id: 3, name: 'Super Smash Bros. For Wii U', abbreviation: 'smash4' },
      { id: 1, name: 'Super Smash Bros. Ultimate', abbreviation: 'ultimate' }
    ];

    return games;
  }
}
