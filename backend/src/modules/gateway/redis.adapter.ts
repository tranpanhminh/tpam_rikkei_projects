import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private readonly pubClient: any;
  private readonly subClient: any;

  constructor(app) {
    super(app);

    // Create Redis clients
    this.pubClient = createClient({ url: 'redis://localhost:6379' });
    this.subClient = this.pubClient.duplicate();
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    // Configure and set up the Redis adapter
    const redisAdapter = (redisIoAdapter as any)({
      pubClient: this.pubClient,
      subClient: this.subClient,
    });
    server.adapter(redisAdapter);

    return server;
  }
}
