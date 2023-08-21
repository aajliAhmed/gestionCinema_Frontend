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
  public salles: any;

  constructor(private cinemaServise: CinemaService) { }
  ngOnInit() {
    this.cinemaServise.getVilles().subscribe(data => {
      this.villes = data;
    }, err => {
      console.log(err);
    })

  }
  onGetCinemas(v: any) {
    this.currentCinema = v;
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
    }, err => {
      console.log(err);
    })
  }
}
