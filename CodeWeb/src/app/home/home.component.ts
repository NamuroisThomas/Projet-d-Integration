import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestServices} from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor( private test: TestServices) { }

  ngOnInit(){
    this.test.getTest().subscribe((result) =>{
      console.warn('result', result);
    })
  }

}
