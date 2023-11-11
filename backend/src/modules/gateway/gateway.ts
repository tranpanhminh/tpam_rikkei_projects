import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      // console.log('connection');
    });
  }

  @SubscribeMessage('newOrder')
  alertNewOrder(text: string) {
    this.server.emit('newOrder', text); // Emit to all connected clients
  }

  @SubscribeMessage('newServiceComment')
  alertNewServiceComment() {
    this.server.emit('newServiceComment'); // Emit to all connected clients
  }

  @SubscribeMessage('deleteServiceComment')
  alertDeleteServiceComment() {
    this.server.emit('deleteServiceComment'); // Emit to all connected clients
  }

  @SubscribeMessage('newProductComment')
  alertNewProductComment() {
    this.server.emit('newProductComment'); // Emit to all connected clients
  }

  @SubscribeMessage('deleteProductComment')
  alertDeleteProductComment() {
    this.server.emit('deleteProductComment'); // Emit to all connected clients
  }
}
