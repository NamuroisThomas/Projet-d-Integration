import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TestServices} from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  welcome = 'Bienvenue sur NeedHelp!';

  constructor() { }

  ngOnInit(){
  }

}
