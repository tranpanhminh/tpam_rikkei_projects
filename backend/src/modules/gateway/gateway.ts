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
    this.server.emit('newOrder', text);
  }

  @SubscribeMessage('newServiceComment')
  alertNewServiceComment() {
    this.server.emit('newServiceComment');
  }

  @SubscribeMessage('deleteServiceComment')
  alertDeleteServiceComment() {
    this.server.emit('deleteServiceComment');
  }

  @SubscribeMessage('newProductComment')
  alertNewProductComment() {
    this.server.emit('newProductComment');
  }

  @SubscribeMessage('deleteProductComment')
  alertDeleteProductComment() {
    this.server.emit('deleteProductComment');
  }

  @SubscribeMessage('importProducts')
  alertImportProducts() {
    this.server.emit('importProducts');
  }

  @SubscribeMessage('updateAvatar')
  alertUpdateAvatar() {
    this.server.emit('updateAvatar');
  }
}
