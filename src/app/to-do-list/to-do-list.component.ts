import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import { ToDo } from './to-do.model';
import { ServerService } from '../shared/server.service';
import { Subscriber } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(500, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(500, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),
    ])
  ]
})
export class ToDoListComponent implements OnInit {
  toDos: ToDo[];
  toDoName: string;
  idForToDo: number;
  beforeEdit: string;
  filter: string;

  constructor(private serverService: ServerService,
              private authService: AuthService) { }

  ngOnInit() {
    this.filter = 'all';
    this.beforeEdit = '';
    this.idForToDo= 4;
    this.toDoName = '';
    this.toDos = [
      {
        id: 1,
        name: 'Wake up',
        completed: false,
        editing: false      
      },
      {
        id: 2,
        name: 'Take a bath',
        completed: false,
        editing: false 
      },
      {
        id: 3,
        name: 'Go to office',
        completed: false,
        editing: false
      }
    ];
  }

  addToDo() {
    this.toDos.push({
      id: this.idForToDo,
      name: this.toDoName,
      completed: false,
      editing: false
    })
    console.log(this.toDos)
    this.toDoName= '';
    this.idForToDo++;
  }

  editToDo(toDo: ToDo): void {
    this.beforeEdit = toDo.name;
    toDo.editing = true;
  }

  doneEdit(toDo: ToDo): void {
    if (toDo.name.trim().length === 0) {
      toDo.name = this.beforeEdit;
    }
    toDo.editing = false;
  }

  cancelEdit(toDo: ToDo): void {
    toDo.name = this.beforeEdit;
    toDo.editing = false;
  }

  deleteToDo(id: number): void {
    this.toDos = this.toDos.filter(todo => todo.id !== id);
  }

  remaining(): number {
    return this.toDos.filter(toDo => !toDo.completed).length;
  }

  completedItem(): boolean {
    return this.toDos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    this.toDos = this.toDos.filter(toDo => !toDo.completed);
  }

  checkAllToDos(): void {
    this.toDos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked);
  }

  toDosFiltered(): ToDo[] {
    if (this.filter === 'all') {
      return this.toDos;
    } else if (this.filter === 'active') {
      return this.toDos.filter(toDo => !toDo.completed);
    } else if (this.filter === 'completed') {
      return this.toDos.filter(toDo => toDo.completed);
    }
    // return this.toDos;
  }

  onSave() {
    this.serverService.storeToDos(this.toDos)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  onGet() {
    this.serverService.getToDos()
      .subscribe(
        (toDos: any[]) => this.toDos = toDos,
        (error) => console.log(error)
      )
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
}
}

