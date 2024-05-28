import { Component } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-detail-infor-product',
  templateUrl: './detail-infor-product.component.html',
  styleUrls: ['./detail-infor-product.component.css',
  '../assets/templates/default/css/jquery.lazyloadxt.fadein.min.css',
  '../assets/templates/default/css/font-awesome.min.css',
  '../assets/detail/templates/default/css/bootstrap.min.css',

  '../assets/detail/modules/products/assets/css/lightgallery.min.css',


  '../assets/detail/templates/default/css/responsive.css',
  '../assets/detail/templates/default/css/theme.css',

  '../assets/detail/templates/default/css/bootstrap.min.css',
  '../assets/detail/modules/products/assets/css/product.css',

  '../assets/detail/modules/products/assets/css/product.scss',
  
  '../assets/detail/modules/products/assets/css/slide.css',
  '../assets/detail/blocks/mainmenu/assets/css/moby.min.css',
  '../assets/detail/blocks/mainmenu/assets/css/menu_mobile.css',
  '../assets/blocks/search/assets/css/search_simple.css',
  '../assets/detail/blocks/mainmenu/assets/css/icon.css',
  '../assets/detail/blocks/breadcrumbs/assets/css/breadcrumbs_simple.css',]
})
export class DetailInforProductComponent {

  constructor(
   
    private dialogService: DialogService, 
    private ref: DynamicDialogRef
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
  }

  instance: DynamicDialogComponent | undefined;

  product:any;

  ngOnInit() {
    if (this.instance && this.instance.data) {
        this.product = this.instance.data['product'];
        
    }
  }

}
