import { ChangeDetectorRef, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { IProduct } from '../_models/product';
import { IBrand } from '../_models/brand';
import { IType } from '../_models/productType';
import { ShopParams } from '../_models/shopParams';
import { ShopService } from '../_services/shop-service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pager } from '../components/pager/pager';
import { ProductItem } from './product-item/product-item';
import { PagingHeader } from '../components/paging-header/paging-header';
import { forkJoin } from 'rxjs';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BusyService } from '../_services/busy-service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    Pager,
    ProductItem,
    PagingHeader,
    NgxSpinnerModule
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  @ViewChild("search", {static: false}) searchTerm!: ElementRef;
  products = signal<IProduct[]>([]);
  brands = signal<IBrand[]>([]);
  types = signal<IType[]>([]);
  shopParams: ShopParams;
  totalCount: number = 0;
  sortOptions = [
    {name: "Alphabetical", value: "name"},
    {name: "Price: Low to High", value: "priceAsc"},
    {name: "Price: High to Low", value: "priceDesc"},
  ];

  //spinner = inject(BusyService);

  constructor(private shopService: ShopService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, ) {
    this.shopParams = this.shopService.getShopParams();
   }

   filtersLoading = signal(false);
productsLoading = signal(false);


ngOnInit(): void {
  this.loadFilters();
  this.loadProducts(true);
}




loadFilters() {
  this.filtersLoading.set(true);

  forkJoin({
    brands: this.shopService.getBrands(),
    types: this.shopService.getTypes(),
  }).subscribe(({ brands, types }) => {
    this.brands.set([{ id: 0, name: 'All' }, ...brands]);
    this.types.set([{ id: 0, name: 'All' }, ...types]);
    this.filtersLoading.set(false)
    console.log(this.brands())
  });
}


loadProducts(useCache = false) {
  this.productsLoading.set(true);

  this.shopService.getProducts(useCache).subscribe(res => {
    this.products.set(res!.data);
    this.totalCount = res!.count;
    this.productsLoading.set(false);
  });
}



  // getProducts(useCache = false){
  //   this.shopService.getProducts(useCache).subscribe(response => {
  //     this.products = response!.data;
  //     this.totalCount = response!.count;
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  // getBrands(){
  //   this.shopService.getBrands().subscribe(response => {
  //     this.brands = [{id: 0, name: 'All'}, ...response];
  //   },error => {
  //     console.log(error);
  //   })
  // }

  // getTypes(){
  //   this.shopService.getTypes().subscribe(response => {
  //     this.types = [{id: 0, name: 'All'}, ...response];;
  //   },error => {
  //     console.log(error);
  //   })
  // }

  onBrandSelected(brandId: number){
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    //this.getProducts();
    this.loadProducts();
          // this.cdr.detectChanges();
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.loadProducts();
    //this.getProducts();
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.loadProducts();
    //this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();

    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.loadProducts();
      //this.getProducts(true);
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.loadProducts();
    //this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.loadProducts();
    //this.getProducts();
  }
}
