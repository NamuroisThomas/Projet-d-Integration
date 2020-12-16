import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {ConnexionService} from './connexion.service';


import { ConnexionComponent } from './connexion.component';
import {GetListeDemandesService} from '../home/home.component.service';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionComponent ],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [ConnexionService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('tester le formulaire sans remplir les champs', () => {
    expect(fixture.debugElement.query(By.css('btn btn-primary co'))).toBeNull();
  });

  it('should contain page de connexion', () => {
    expect(component.pageC).toContain('Page de connexion');
  });
});
