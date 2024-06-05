import { Injectable } from '@angular/core';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class LoadingOverlayServiceService {

  constructor() { }

  show() {        
    $.LoadingOverlay("show", {
      background: "rgba(255, 255, 255, 0.6)",
      imageAnimation: "3000ms rotate_right",
      image: "../../assets/img/Spinner.png",
      imageColor: "black",
      maxSize: 100,
    });
    
  }

  hide() {        
    // $.LoadingOverlay("hide");  
    $('.loadingoverlay').remove();      
  }
}
