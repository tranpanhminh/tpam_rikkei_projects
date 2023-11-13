import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  sendToClient(clientId: string, event: string, data: any) {
    this.server.emit(event, data);
  }

  handleEmitSocket({ data, event, to }) {
    if (event === 'newServiceComment') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'deleteServiceComment') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'newOrder') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'newProductComment') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'deleteProductComment') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'importProducts') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'updateAvatar') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'updateName') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'updateAdminAvatar') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'updateAdminName') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'googleLogin') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }

    if (event === 'updateQuantity') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  }

  @SubscribeMessage('newOrder')
  async alertNewOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'newOrder', data);
  }

  @SubscribeMessage('newServiceComment')
  async alertNewServiceComment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'newServiceComment', data);
  }

  @SubscribeMessage('deleteServiceComment')
  async alertDeleteServiceComment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'deleteServiceComment', data);
  }

  @SubscribeMessage('newProductComment')
  async alertNewProductComment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'newProductComment', data);
  }

  @SubscribeMessage('deleteProductComment')
  async alertDeleteProductComment(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'deleteProductComment', data);
  }

  @SubscribeMessage('importProducts')
  async alertImportProducts(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'importProducts', data);
  }

  @SubscribeMessage('updateAvatar')
  async alertUpdateAvatar(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'updateAvatar', data);
  }

  @SubscribeMessage('updateName')
  async alertUpdateName(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'updateName', data);
  }

  @SubscribeMessage('googleLogin')
  async alertGoogleLogin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'googleLogin', data);
  }

  @SubscribeMessage('updateQuantity')
  async alertUpdateQuantity(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'updateQuantity', data);
  }

  afterInit(socket: Socket): any {}

  async handleConnection(socket: Socket) {
    // console.log('connect', socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // console.log('disconnect', socket.id);
  }
}
// @SubscribeMessage('newOrder')
// async alertNewOrder(text: string) {
//   await this.server.emit('newOrder', text);
// }

// @SubscribeMessage('newServiceComment')
// async alertNewServiceComment() {
//   await this.server.emit('newServiceComment');
// }

// @SubscribeMessage('deleteServiceComment')
// async alertDeleteServiceComment() {
//   await this.server.emit('deleteServiceComment');
// }

// @SubscribeMessage('newProductComment')
// async alertNewProductComment() {
//   await this.server.emit('newProductComment');
// }

// @SubscribeMessage('deleteProductComment')
// async alertDeleteProductComment() {
//   await this.server.emit('deleteProductComment');
// }

// @SubscribeMessage('importProducts')
// async alertImportProducts() {
//   await this.server.emit('importProducts');
// }

// @SubscribeMessage('updateAvatar')
// async alertUpdateAvatar() {
//   await this.server.emit('updateAvatar');
// }

// @SubscribeMessage('updateName')
// async alertUpdateName() {
//   await this.server.emit('updateName');
// }

// @SubscribeMessage('googleLogin')
// async alertGoogleLogin() {
//   await this.server.emit('googleLogin');
// }

// @SubscribeMessage('updateQuantity')
// async alertUpdateQuantity() {
//   await this.server.emit('updateQuantity');
// }
