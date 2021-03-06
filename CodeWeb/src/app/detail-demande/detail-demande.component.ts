import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GetListeDemandeService} from '../liste-demande/liste-demande.service';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.scss']
})
export class DetailDemandeComponent implements OnInit {

  routeDemande: number;
  detail: any;
  defraiment: any;

  constructor(private route: ActivatedRoute,
              private api: GetListeDemandeService,
              private http: HttpClient,
              private location: Location)
  { }

  backClicked() {
    this.location.back();
  }
  ngOnInit(){
    /* tslint:disable:no-string-literal */
    this.routeDemande = this.route.snapshot.params['idDemande'];
    /* tslint:enable:no-string-literal */
    this.http.get('http://62.210.130.145:3000/demandes?idDemande=' + this.routeDemande).subscribe((res) => {
      this.detail = res[Object.keys(res)[2]][0];
    });
    if (this.detail.defraimentDemande === 1){
      this.defraiment = true;
    }
    else{
      this.defraiment = false;
    }
    alert(this.defraiment);
}

}
