import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {GetListeDemandesService} from './home.component.service';
import {HttpClientModule} from '@angular/common/http';

import { HomeComponent } from './home.component';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {InscriptionComponent} from '../inscription/inscription.component';
import {FormsModule} from '@angular/forms';
import {Location} from '@angular/common';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, InscriptionComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        RouterTestingModule.withRoutes(
          [
            {path: 'inscription', component: InscriptionComponent}
          ]
        )
      ],
      providers: [GetListeDemandesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('test ngif div non cachée si demande > 0', () => {
    expect(fixture.debugElement.query(By.css('.information'))).toBeDefined();
  });

  it('test ngif div cachée si demande < 100', () => {
    expect(fixture.debugElement.query(By.css('.information2'))).toBeNull();
  });

  it('page daccueil avant le cliquer le bouton', () => {
    const location = TestBed.get(Location);
    expect(location.path()).toBe('');
  });

  it('navigation page dinscription', () => {
    const location = TestBed.get(Location);
    const Link = fixture.debugElement
      .queryAll(By.css('button'));
    const navigation: HTMLButtonElement = Link[3].nativeElement;
    navigation.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/inscription');
    });
  });

  it('should have as text Bienvenue sur NeedHelp!', () => {
    expect(component.welcome).toEqual('Bienvenue sur NeedHelp!');
  });

  it('should contain Comment cela fonctionne ?', () => {
    expect(component.works).toContain('Comment cela fonctionne ?');
  });
});
