import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demande-aide',
  templateUrl: './demande-aide.component.html',
  styleUrls: ['./demande-aide.component.scss']
})
export class DemandeAideComponent implements OnInit {

  demandeAide: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.demandeAide = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  onSubmit() {
    const titre =  this.demandeAide.get('titre').value;
    const description = this.demandeAide.get('description').value;

    console.log(titre, description);
  }
}

