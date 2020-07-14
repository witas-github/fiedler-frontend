import { Server } from './server';

export interface Protocol{
  id: string;
  name: string;
  activeServer: Server;
  date: any;
}
