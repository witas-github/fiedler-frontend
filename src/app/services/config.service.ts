import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../interfaces/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {

  }
  // @ts-ignore
  config : Config = require('../config.json');

  public getConfig(): Config{
    return this.config;
  }
}
