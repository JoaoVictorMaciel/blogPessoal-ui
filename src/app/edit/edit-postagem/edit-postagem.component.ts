import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-edit-postagem',
  templateUrl: './edit-postagem.component.html',
  styleUrls: ['./edit-postagem.component.css']
})
export class EditPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private postagemService: PostagemService,
  private temaService: TemaService
  ) { }

  ngOnInit() {
    
    window.scroll(0,0)
    
    if(environment.token == ''){
      alert('Sua sessão expirou.')
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTemas()
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem Atualizada')
      this.router.navigate(['inicio'])
    })
  }
}
