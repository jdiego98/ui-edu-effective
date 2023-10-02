import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../enviroments/environment';
import { DailyStudying } from '../models/daily-studying';

@Injectable({
  providedIn: 'root'
})
export class DailyStudyingService {

  private apiUrl: string | undefined;

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  
  getDailyStudying(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/daily-studying`)
  }

  createDailyStudying(dailyStudying: DailyStudying): Observable<DailyStudying>{
    return this.http.post<DailyStudying>(`${this.apiUrl}/daily-studying`, dailyStudying);
  }

  updateDailyStudying(dailyStudying: DailyStudying): Observable<DailyStudying>{
    return this.http.patch<DailyStudying>(`${this.apiUrl}/daily-studying`, dailyStudying);
  }

  deleteDailyStudying(dailyStudying: DailyStudying): Observable<DailyStudying>{
    return this.http.delete<DailyStudying>(`${this.apiUrl}/daily-studying`,  { body: dailyStudying });
  }

}
