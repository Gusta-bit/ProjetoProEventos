import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFiltrados: any = [];
  larguraImg =  150;
  margemImg =  2;
  mostrarImg = false;
  private _filtroLista = '';

  public get filtroLista() {
    return this._filtroLista;
  }
  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos (): void {
    this.http.get('https://localhost:5001/api/Evento').subscribe(
      reponse =>
      {
        this.eventos = reponse;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );
    }

    alterarImg () {
      this.mostrarImg = !this.mostrarImg;
    }

    filtrarEventos( filtarPor: string): any {
      filtarPor = filtarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: {tema: string; local: string} )=> evento.tema.toLocaleLowerCase().indexOf(filtarPor) !== -1
        || evento.local.toLocaleLowerCase().indexOf(filtarPor) !== -1
      )
    }
  }
