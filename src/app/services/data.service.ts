import { Injectable } from '@angular/core';
import { Data } from '../models/data.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Data;

  constructor(private client: HttpClient) { 
    this.data = new Data(client);
  }

  getData() {
    return this.data;
  }

}
