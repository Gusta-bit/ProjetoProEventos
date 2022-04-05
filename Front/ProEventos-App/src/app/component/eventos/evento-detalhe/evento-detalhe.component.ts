import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  loteAtual = {id: 0, nome: '', indice: 0};
  form!: FormGroup;
  evento = {} as Evento;
  eventoId: number;
  locale = 'pt-br';
  estadoSalvar = 'post';


  get lotes (): FormArray{
    return this.form.get('lotes') as FormArray;
  }

  get modoEditar (): boolean{
    return this.estadoSalvar == 'put';
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }
  constructor(
             private fb: FormBuilder,
             private localeService: BsLocaleService,
             private eventoService: EventoService,
             private loteService: LoteService,
             private activatedRoute: ActivatedRoute,
             private spinner: NgxSpinnerService,
             private modalService: BsModalService,
             private toastr: ToastrService,
             private router: Router )
  {
    this.localeService.use(this.locale);
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRoute.snapshot.paramMap.get('id');

    if(this.eventoId != null && this.eventoId != 0){

      this.spinner.show();
      this.estadoSalvar = 'put';
      this.eventoService.getEventoById(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.form.patchValue(this.evento);
          this.evento.lotes.forEach(lote => {
            this.lotes.push(this.criarLote(lote));
          })
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar evento.' , 'Error!')
          console.error(error);
        },

      ).add( () => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(5000)]],
      telefone: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
      lotes: this.fb.array([])
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return  this.fb.group({
        id: [lote.id],
        nome: [lote.nome, Validators.required],
        quantidade: [lote.quantidade, Validators.required],
        preco: [lote.preco, Validators.required],
        dataInicio: [lote.dataInicio],
        dataFim: [lote.dataFim],
    });
  }

  public resetForm (): void {
    this.form.reset();
  }

  public retornaTituloLote(nome: string): string {
    return nome == null || nome == '' ? 'Nome do lote' : nome;
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
   return {'is-invalid': campoForm.errors && campoForm.touched}
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.evento = (this.estadoSalvar === 'post')
                  ? {...this.form.value}
                  : {id: this.evento.id, ...this.form.value};

        this.eventoService[this.estadoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success('Evento salvo com sucesso.', 'Sucesso!');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`])
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Erro ao salvar o evento', 'Erro!')
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLotes(): void {
    if (this.form.controls.lotes.valid) {
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.form.value.lotes).subscribe(
        () => {
          this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!');
          // this.lotes.reset();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar  lotes.', 'Erro!')
          console.error(error);
        },
     ).add(() => this.spinner.hide());
    }
  }

  public removerLote(templete: TemplateRef<any>, indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(templete, {class: 'modal-sm' });
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success('Lote deletado com sucesso', 'Sucesso');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o lote ${this.loteAtual.id}`, 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());

  }
  public declineDeleteLote(): void {
     this.modalRef.hide();
  }

}
