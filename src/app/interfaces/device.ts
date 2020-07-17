import { Server } from './server';
import { Protocol } from './protocol';

export interface Device{
  id: number;
  srn: string;
  registeredServer: Server;
  activeServer: Server;
  createdAt: Date;
  state: number;
  protocol: Protocol;
}
