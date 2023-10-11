import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/enviroments/environment';
import { StudySession } from '../components/study-sessions/study-sessions.component';

@Injectable({
  providedIn: 'root'
})
export class StudySessionService {

  private apiUrl: string | undefined;

  private selectedSessionSubject = new BehaviorSubject<StudySession | null>(null);
  selectedSession$ = this.selectedSessionSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  setSelectedSession(session: StudySession | null) {
    this.selectedSessionSubject.next(session);
  }
  
  getSelectedSession(): Observable<StudySession | null> {
    return this.selectedSession$;
  }

  getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }  

  // Este método crea HttpHeaders con el timezone incluido
  getHeadersWithTimezone(): HttpHeaders {
    return new HttpHeaders().set('Timezone', this.getTimezone());
  }
  
  getStudySessions(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/study-sessions`)
  }

  createStudySession(studySession: StudySession): Observable<StudySession>{
    return this.http.post<StudySession>(`${this.apiUrl}/study-sessions`, studySession, { headers: this.getHeadersWithTimezone() });
  }

  updateStudySession(studySession: StudySession): Observable<StudySession>{
    return this.http.patch<StudySession>(`${this.apiUrl}/study-sessions`, studySession); // I'm assuming an ID parameter here.
  }

  deleteStudySession(studySession: StudySession): Observable<StudySession>{
    return this.http.delete<StudySession>(`${this.apiUrl}/study-sessions`, { body: studySession });  // ID parameter used for specificity
  }
}
