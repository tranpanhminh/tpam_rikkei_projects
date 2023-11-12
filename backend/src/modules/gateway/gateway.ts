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
  async alertNewOrder(text: string) {
    await this.server.emit('newOrder', text);
  }

  @SubscribeMessage('newServiceComment')
  async alertNewServiceComment() {
    await this.server.emit('newServiceComment');
  }

  @SubscribeMessage('deleteServiceComment')
  async alertDeleteServiceComment() {
    await this.server.emit('deleteServiceComment');
  }

  @SubscribeMessage('newProductComment')
  async alertNewProductComment() {
    await this.server.emit('newProductComment');
  }

  @SubscribeMessage('deleteProductComment')
  async alertDeleteProductComment() {
    await this.server.emit('deleteProductComment');
  }

  @SubscribeMessage('importProducts')
  async alertImportProducts() {
    await this.server.emit('importProducts');
  }

  @SubscribeMessage('updateAvatar')
  async alertUpdateAvatar() {
    await this.server.emit('updateAvatar');
  }

  @SubscribeMessage('updateName')
  async alertUpdateName() {
    await this.server.emit('updateName');
  }

  @SubscribeMessage('googleLogin')
  async alertGoogleLogin() {
    await this.server.emit('googleLogin');
  }
}
