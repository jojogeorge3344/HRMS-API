import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public data: any[];
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:19631/NotificationHub')
      .build();

    Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }
  public recieveFromConnection() {
    return this.hubConnection;
  }
  invokeConnection(leaveRequestId) {
    return this.hubConnection.invoke('LeaveNotification', leaveRequestId);
  }
}
