import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  apiQA: string = 'http://sandbox-api.lomadee.com/v3/'
  apiProd: string = 'https://api.lomadee.com/v3/'
  apiUrl: string;

  appToken: string = '162644118076041fdcbc7'
  sourceId: string = '23023468'

  public letters = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public stores: any[] = [];
  
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.apiUrl = this.apiProd;
    this.getStores();
  }
  
  getStores() {
    this.http.get<any>(this.apiUrl + this.appToken + '/store/_all', {
      params: {
        sourceId: this.sourceId
      }
    }).subscribe((data) => {
      this.stores = data.stores;
      console.log(this.stores);
    })
  }
}
