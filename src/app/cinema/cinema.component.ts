import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../services/cinema.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  public villes: any;
  public cinemas: any;
  public currentVille: any;
  public currentCinema: any;
  public currentProjection : any;
  public salles: any;

  constructor(public cinemaServise: CinemaService) { }
  
  ngOnInit() {
    this.cinemaServise.getVilles().subscribe(data => {
      this.villes = data;
    }, err => {
      console.log(err);
    })

  }
  onGetCinemas(v: any) {
    this.currentCinema = v;
    this.salles=undefined;
    this.cinemaServise.getCinemas(v).subscribe(data => {
      this.cinemas = data;
    }, err => {
      console.log(err);
    })
  }
  onGetSalles(c:any){
    this.currentCinema=c;
    this.cinemaServise.getSalles(c).subscribe(data => {
      this.salles = data;
      this.salles._embedded.salles.forEach((salle : any) => {
        this.cinemaServise.getProjections(salle).subscribe(data => {
          salle.projections = data;
        }, err => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    })
  }
  onGetTicketsPlaces(p:any){
    this.currentProjection=p;
    this.cinemaServise.getTicketsPlaces(p).subscribe(data => {
      this.currentProjection.tickets=data;
    }, err => {
      console.log(err);
    })
  }
}
