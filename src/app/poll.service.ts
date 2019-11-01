import {Injectable} from '@angular/core';
import {Poll} from './poll/model/poll';
import {HttpClient, HttpHeaders} from '@angular/common/http';

let httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})

export class PollService {

  constructor(private http: HttpClient) {
  }

  save(poll: Poll) {
    const body = JSON.stringify(poll);
    localStorage.setItem('', '');
    return this.http.post('/server/api/poll/save', body, httpOptions);
  }

  get() {
    localStorage.setItem('', '');
    return this.http.get('/server/api/poll', httpOptions);
  }
}
