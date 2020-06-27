import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { EditDto } from 'src/app/models/edits/edit-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService extends BaseService {
  constructor(private httpClient: HttpClient, authService: AuthService) {
    super(authService);
  }

  getEditsForCharacter(id: number): Observable<EditDto[]> {
    return this.httpClient.get<EditDto[]>(`${environment.baseUrl}/characters/${id}/edits`, this.getDefaultHttpOptions());
  }

  approveEdit(id: number): Observable<never> {
    return this.httpClient.put<never>(`${environment.baseUrl}/edits/${id}`, null, this.getDefaultHttpOptions());
  }

  rejectEdit(id: number): Observable<never> {
    return this.httpClient.delete<never>(`${environment.baseUrl}/edits/${id}`, this.getDefaultHttpOptions());
  }
}
