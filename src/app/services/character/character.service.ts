import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService {
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  private baseUrl = `${environment.baseUrl}/characters`;

  public getAll(): Observable<Character[]> {
    return this.httpClient.get<Character[]>(this.baseUrl);
  }
}
