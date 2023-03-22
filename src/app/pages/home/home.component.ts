import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  apiQA: string = 'http://sandbox-api.lomadee.com/v3/'
  apiProd: string = 'https://api.lomadee.com/v3/'
  apiUrl: string;

  appToken: string = '162644118076041fdcbc7'
  sourceId: string = '23023468'
  categories: any;
  stores: any;
  resultOffers: any;
  errorMessage: any;
  currentPage: number = 1;
  pageSize: number = 26;
  private currentCategoryId: number;
  private currentStoreId: number;
  allDataLoaded: boolean = false;
  totalPages: number;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sanitizer: DomSanitizer,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.apiUrl = this.apiProd;
    //this.getCategories();
    //this.getStores(); 
    this.activatedRoute.queryParams.subscribe(params => {
      let categoryId = params['categoryId'];
      let storeId = params['storeId'];
      this.currentPage = 1
      this.resultOffers = null;
      this.currentCategoryId = categoryId;
      this.currentStoreId = storeId;

      if ((categoryId !== null && categoryId !== undefined) || (storeId !== null && storeId !== undefined)) {
        if (categoryId !== null) {
          if (categoryId != undefined)
            this.getOffersByCategoryId(Number(categoryId), this.currentPage, this.pageSize);
        }

        if (storeId !== null) {
          if (storeId != undefined)
            this.getOffersByStoreId(Number(storeId), this.currentPage, this.pageSize);
        }
      }
      else {
        this.getBestSellerOffers(this.currentPage, this.pageSize);
      }

    });
  }

  getBestSellerOffers(page: number, size: number) {
    if (this.currentCategoryId !== null) {
      this.resultOffers = null;
      page = 1
    }
    this.http.get<any>(this.apiUrl + this.appToken + '/offer/_bestsellers', {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size),
      }
    }).subscribe((data) => {
      if (this.resultOffers === null || this.resultOffers === undefined) {
        this.resultOffers = data;
        this.totalPages = data.pagination.totalPage
      } else {
        this.resultOffers.offers = this.resultOffers.offers.concat(data.offers);
        this.resultOffers.page = data.page;
        this.resultOffers.pageSize = data.pageSize;
        this.resultOffers.totalPages = data.totalPages;
        this.resultOffers.totalRecords = data.totalRecords;
        this.currentCategoryId = null;
      }

      console.log(this.resultOffers);
    })
  }

  getCategories(page: number, size: number) {
    this.http.get<any>(this.apiUrl + this.appToken + '/category/_all', {
      params: {
        sourceId: this.sourceId,
        hasOffer: 'true',
        page: String(page),
        size: String(size)
      }
    }).subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    })
  }

  getBestSellerCategories() {
    this.http.get<any>(this.apiUrl + this.appToken + '/category/_bestsellers', {
      params: {
        sourceId: this.sourceId,
        hasOffer: 'true',
      }
    }).subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    })
  }

  getStores() {
    this.http.get<any>(this.apiUrl + this.appToken + '/store/_all',
      {
        params: {
          sourceId: this.sourceId,
          hasOffer: 'true',
        }
      }).subscribe((data) => {
        this.stores = data;
        console.log(this.stores);
      })
  }

  getOffersByStoreId(storeId: number, page: number, size: number) {
    if (this.currentStoreId !== storeId) {
      this.resultOffers = null;
      page = 1
    }
    this.http.get<any>(this.apiUrl + this.appToken + '/offer/_store/' + storeId, {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size),
        sort: 'discount'
      }
    }).subscribe((data) => {
      if (data.offers.length === 0) {
        this.allDataLoaded = true;
      } else if (this.resultOffers === null) {
        this.resultOffers = data;
        this.resultOffers.offers = this.resultOffers.offers.filter((value, index, self) => {
          // Retorna true se a posição do primeiro elemento igual ao atual for igual ao índice atual
          return index === self.findIndex((o) => o.thumbnail === value.thumbnail);
        });
        this.totalPages = data.pagination.totalPage
      } else {
        this.resultOffers.offers = this.resultOffers.offers.concat(data.offers);

        this.resultOffers.offers = this.resultOffers.offers.filter((value, index, self) => {
          // Retorna true se a posição do primeiro elemento igual ao atual for igual ao índice atual
          return index === self.findIndex((o) => o.thumbnail === value.thumbnail);
        });

        this.resultOffers.page = data.page;
        this.resultOffers.pageSize = data.pageSize;
        this.resultOffers.totalPages = data.totalPages;
        this.resultOffers.totalRecords = data.totalRecords;
      }

      this.currentStoreId = storeId;
      console.log(this.resultOffers);
    })
  }

  getOffersByCategoryId(categoryId: number, page: number, size: number) {
    if (this.currentCategoryId !== categoryId) {
      this.resultOffers = null;
      page = 1
    }

    this.http.get<any>(this.apiUrl + this.appToken + '/offer/_category/' + categoryId, {
      params: {
        sourceId: this.sourceId,
        page: String(page),
        size: String(size),
        sort: 'discount'
      }
    }).subscribe((data) => {
      if (data.offers.length === 0) {
        this.allDataLoaded = true;
      } else if (this.resultOffers === null) {
        this.resultOffers = data;
        this.resultOffers.offers = this.resultOffers.offers.filter((value, index, self) => {
          // Retorna true se a posição do primeiro elemento igual ao atual for igual ao índice atual
          return index === self.findIndex((o) => o.thumbnail === value.thumbnail);
        });
        this.totalPages = data.pagination.totalPage
      } else {
        this.resultOffers.offers = this.resultOffers.offers.concat(data.offers);

        this.resultOffers.offers = this.resultOffers.offers.filter((value, index, self) => {
          // Retorna true se a posição do primeiro elemento igual ao atual for igual ao índice atual
          return index === self.findIndex((o) => o.thumbnail === value.thumbnail);
        });

        this.resultOffers.page = data.page;
        this.resultOffers.pageSize = data.pageSize;
        this.resultOffers.totalPages = data.totalPages;
        this.resultOffers.totalRecords = data.totalRecords;
      }

      this.currentCategoryId = categoryId;
      console.log(this.resultOffers);
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadMoreOffers();
    }
  }

  loadMoreOffers() {
    if (!this.allDataLoaded) {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;

        if ((this.currentCategoryId !== null && this.currentCategoryId !== undefined) || (this.currentStoreId !== null && this.currentStoreId !== undefined)) {
          if (this.currentCategoryId !== null || this.currentCategoryId !== undefined) {
            this.getOffersByCategoryId(this.currentCategoryId, this.currentPage, this.pageSize);
          }
          if (this.currentStoreId !== null || this.currentStoreId !== undefined) {
            this.getOffersByStoreId(this.currentStoreId, this.currentPage, this.pageSize);
          }
        }
        else {
          this.getBestSellerOffers(this.currentPage, this.pageSize);
        }
      }
    }
  }

  copyLink(link) {
    this.clipboard.copy(link);
    this.snackBar.open('Link copiado!', 'Fechar', {
      duration: 2000
    });
  }

  getSafeUrlWhatApp(url) {
    var completeUrl = 'whatsapp://send?text=' + url
    return this.sanitizer.bypassSecurityTrustResourceUrl(completeUrl);
  }

  getSafeUrlTelegram(url) {
    var completeUrl = 'https://telegram.me/share/url?url=' + url
    return this.sanitizer.bypassSecurityTrustResourceUrl(completeUrl);
  }
}
