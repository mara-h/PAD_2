import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Lesson} from '../../model/lesson/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  noAuthentifHeader = { headers: new HttpHeaders({ NoAuthentif: 'True' }) };
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(environment.apiBaseUrl+'/lesson/getlessons')
  }

  deleteLesson(id: string){
    console.log("tries to delete something");
    return this.http.delete(environment.apiBaseUrl+'/lesson/deleteonelesson'+ id).subscribe
  }

  postLesson(lesson: Lesson) {
    return this.http.post(
      environment.apiBaseUrl + '/lesson/add-lesson',
      lesson, this.noAuthentifHeader
    );
  }
}
