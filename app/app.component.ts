import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'site-descontos';

  apiQA: string = 'http://sandbox-api.lomadee.com/v3/'
  apiProd: string = 'https://api.lomadee.com/v3/'
  apiUrl: string;

  appToken: string = '162644118076041fdcbc7'
  sourceId: string = '23023468'
  categories: any;
  bestSellers: any;
  stores: any;
  resultOffers: any;
  errorMessage: any;
  currentPage: number = 1;
  pageSize: number = 15;
  isDropdownOpen = false;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.apiUrl = this.apiProd;
    //this.getBestSellerCategories(this.currentPage, this.pageSize);
    this.getAllCategories(this.currentPage, this.pageSize);
   
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getAllCategories(page: number, size: number) {
    this.http.get<any>(this.apiUrl + this.appToken + '/category/_all', {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size),
      }
    }).subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    })
  }

  getOffersByCategoryId(categoryId: number, page: number, size: number) {
    this.http.get<any>(this.apiUrl + this.appToken + '/offer/_category/' + categoryId, {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size)
      }
    }).subscribe((data) => {
      this.resultOffers = data;
      console.log(this.resultOffers);
    })
  }

  getBestSellerCategories(page: number, size: number) {
    this.http.get<any>(this.apiUrl + this.appToken + '/category/_bestsellers', {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size),
      }
    }).subscribe((data) => {
      this.bestSellers = data;
      console.log(this.bestSellers);
    })
  }

}

