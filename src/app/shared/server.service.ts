import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class ServerService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  storeToDos(toDos: any[]) {
    const token = this.authService.getToken();
    return this.httpClient.put('https://ng-to-do-6526f.firebaseio.com/todo.json?auth=' + token, toDos);
  }

  getToDos() {
    const token = this.authService.getToken();
    return this.httpClient.get('https://ng-to-do-6526f.firebaseio.com/todo.json?auth=' + token); 
  }
}
