import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  app.listen(3333, () => {
    console.log('Server satarted on port 3333! ');
  });
});
