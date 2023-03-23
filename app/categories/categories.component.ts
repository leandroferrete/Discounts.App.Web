import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  apiQA: string = 'http://sandbox-api.lomadee.com/v3/'
  apiProd: string = 'https://api.lomadee.com/v3/'
  apiUrl: string;

  appToken: string = '162644118076041fdcbc7'
  sourceId: string = '23023468'

  public letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.apiUrl = this.apiProd;
    this.getAllCategories();
  }

  getAllCategories() {
    this.http.get<any>(this.apiUrl + this.appToken + '/category/_all', {
      params: {
        sourceId: this.sourceId,
        hasOffer: 'true'
      }
    }).subscribe((data) => {
      this.categories = data.categories;
    })
  }

  getOfferByCategoryId(categoryId) : any{
    this.http.get<any>(this.apiUrl + this.appToken + '/offer/_category/' + categoryId, {
      params: {
        sourceId: this.sourceId,
        page: String(1),
        size: String(1)
      }
    }).subscribe((data) => {
      var result = data.offers;
      return true;
    }),
    (error) => {
      if (error.status === 404) {
          return false;
      }
    }
  }
}
