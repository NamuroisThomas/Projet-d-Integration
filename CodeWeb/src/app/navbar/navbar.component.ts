import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public display: boolean = true;

  constructor(private router: RouterModule) { }

  ngOnInit(): void {
  }

}
