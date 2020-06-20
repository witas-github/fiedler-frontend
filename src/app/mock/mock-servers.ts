import { Server } from '../interfaces/server';

export const Servers: Server[] = [
  {id: 1, name: 'Devel', url: 'http://www.develservername.com', date: new Date(2019, 5, 18)},
  {id: 2, name: 'Beta', url: 'http://www.betaservername.com', date:  new Date(2019, 4, 17)},
  {id: 3, name: 'Prod', url: 'http://www.prodservername.com', date:  new Date(2019, 3, 16)},
  {id: 4, name: 'Client1', url: 'http://www.client1servername.com', date:  new Date(2020, 2, 15)},
];
