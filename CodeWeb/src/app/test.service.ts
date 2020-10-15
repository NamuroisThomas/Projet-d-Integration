import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn : 'root'
})
export class TestServices{
url = 'http://62.210.130.145:3000/test';

  constructor(private http: HttpClient ){}
getTest(){
  return this.http.get(this.url);
}
}
