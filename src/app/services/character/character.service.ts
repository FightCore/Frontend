import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/character';
import { BaseService } from '../base.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService {
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  private baseUrl = `${environment.baseUrl}/characters`;

  /**
   * Gets all characters known in FightCore.
   */
  public getAll(): Observable<Character[]> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generateCharacterList(20)));
    }

    return this.httpClient.get<Character[]>(this.baseUrl);
  }

  /**
   * Gets a character object based on it's Id.
   * @param id the id of the character
   */
  public get(id: number): Observable<Character> {
    if (environment.mocking) {
      return new Observable(observer => observer.next(this.generateCharacter()));
    }

    return this.httpClient.get<Character>(`${this.baseUrl}/${id}`);
  }

  /**
   * Gets the posts about the character requested.
   * @param characterId the id of the character to be looked for.
   */
  public getPosts(characterId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/${characterId}/posts`, this.getDefaultHttpOptions());
  }

  public getForGame(gameId: number): Observable<Character[]> {
    return this.httpClient.get<Character[]>(`${environment.baseUrl}/games/${gameId}/characters`);
  }

  private generateCharacterList(amount: number): Character[] {
    const characters = new Character[amount]();
    for (let i = 0; i < amount; i++) {
      characters[i] = this.generateCharacter();
    }

    return characters;
  }

  private generateCharacter(): Character {
    const character = new Character();

    return character;
  }
}
