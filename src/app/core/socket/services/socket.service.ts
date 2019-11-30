import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.socket = io(environment.srvAddress);
  }

  public getSocket(): any {
    return this.socket;
  }

}
