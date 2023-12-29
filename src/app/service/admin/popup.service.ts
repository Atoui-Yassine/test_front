import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

 
  isOpenChanged = new EventEmitter<boolean>();
   ischange=new EventEmitter<boolean>();
  constructor() { }
  openPopup() {
    this.isOpenChanged.emit(true);
  }
  openPopupUp() {
    this.ischange.emit(true);
  }
  closePopup() {
    this.isOpenChanged.emit(false);
  }
}
