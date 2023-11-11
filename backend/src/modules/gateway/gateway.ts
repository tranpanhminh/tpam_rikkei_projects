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
      console.log(socket.id);
      console.log('connection');
    });
  }

  @SubscribeMessage('newOrder')
  handleNewOrder(order: any) {
    console.log('New order:', order);
    this.server.emit('newOrder', order); // Emit to all connected clients
  }
}