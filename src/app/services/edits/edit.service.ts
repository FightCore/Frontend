import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CharacterEdits } from 'src/app/models/edits/character-edits';
import { TopContributor } from 'src/app/models/contributors/top-contributor';

@Injectable({
  providedIn: 'root'
})
export class EditService extends BaseService {
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  getAllOpenForUser(): Observable<CharacterEdits[]> {
    return this.httpClient.get<CharacterEdits[]>(`${environment.baseUrl}/edits/`, this.getDefaultHttpOptions());
  }

  getOpenEditsForCharacter(id: number): Observable<EditDto[]> {
    return this.httpClient.get<EditDto[]>(`${environment.baseUrl}/characters/${id}/edits`, this.getDefaultHttpOptions());
  }

  getHistoryForCharacter(id: number): Observable<EditDto[]> {
    return this.httpClient.get<EditDto[]>(`${environment.baseUrl}/characters/${id}/edits/history`, this.getDefaultHttpOptions());
  }

  getTopContributors(): Observable<TopContributor[]> {
    return this.httpClient.get<TopContributor[]>(
      `${environment.baseUrl}/edits/contributors`,
      this.getDefaultHttpOptions());
  }

  approveEdit(id: number): Observable<never> {
    return this.httpClient.put<never>(`${environment.baseUrl}/edits/approve/${id}`, null, this.getDefaultHttpOptions());
  }

  updateEdit(id: number, editDto: EditDto): Observable<never> {
    return this.httpClient.put<never>(`${environment.baseUrl}/edits/${id}`, editDto, this.getDefaultHttpOptions());
  }

  rejectEdit(id: number): Observable<never> {
    return this.httpClient.delete<never>(`${environment.baseUrl}/edits/${id}`, this.getDefaultHttpOptions());
  }
}
