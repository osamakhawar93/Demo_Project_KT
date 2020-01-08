import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';

@Injectable()
export class SharedService {

  constructor() {}

  // Observable string sources
  public emitLoaderEvent = new Subject<any>();

  // Observable string streams

  changeEmitted$ = this.emitLoaderEvent.asObservable();


  showLoader() {
    this.emitLoaderEvent.next(true);
  }

  hideLoader() {
    this.emitLoaderEvent.next(false);
  }
}
