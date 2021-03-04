import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { FrameDataCharacter } from '../../models/framedata/framedata-character';
import { environment } from 'src/environments/environment';
import { Move } from 'src/app/models/framedata/move';

@Injectable({
  providedIn: 'root'
})
export class FrameDataService extends BaseService {

  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  getFrameDataForCharacter(characterId: number): Observable<FrameDataCharacter> {
    return this.httpClient.get<FrameDataCharacter>(`${environment.baseUrl}/framedata/${characterId}`);
  }

  getCharacters(): Observable<FrameDataCharacter[]> {
    return this.httpClient.get<FrameDataCharacter[]>(`${environment.baseUrl}/framedata/characters`);
  }

  getMove(moveId: number): Observable<Move> {
    return this.httpClient.get<Move>(`${environment.baseUrl}/framedata/moves/${moveId}`);
  }
}
