import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursSelectedService {

  constructor() { }
  private selectedCoursIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  setSelectedCoursId(coursId: number): void {
    this.selectedCoursIdSubject.next(coursId);
  }

  getSelectedCoursId(): Observable<number | null> {
    return this.selectedCoursIdSubject.asObservable();
  }
}
