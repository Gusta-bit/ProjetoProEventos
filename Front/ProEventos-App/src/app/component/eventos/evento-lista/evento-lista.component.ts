import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {


  modalRef?: BsModalRef;
  public eventos: Evento [] = [];
  public eventosFiltrados: Evento [] = [];
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

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public getEventos (): void {
    this.eventoService.getEventos().subscribe({
      next: (eventos : Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os eventos', 'Erro!')
      },
      complete: () => this.spinner.hide()
    });
  }

  public alterarImg (): void {
      this.mostrarImg = !this.mostrarImg;
    }

  public filtrarEventos( filtarPor: string): Evento[] {
      filtarPor = filtarPor.toLocaleLowerCase();
      return this.eventos.filter(
        (evento: {tema: string; local: string} )=> evento.tema.toLocaleLowerCase().indexOf(filtarPor) !== -1
        || evento.local.toLocaleLowerCase().indexOf(filtarPor) !== -1
      )
    }

    openModal(template: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }

    confirm(): void {
      this.modalRef?.hide();
      this.toastr.success('Evento foi deletado com sucesso!', 'Deletado!');
    }

    decline(): void {
      this.modalRef?.hide();
    }

    detalheEvento(id: number): void {
      this.router.navigate([`eventos/detalhe/${id}`]);
    }


  }
