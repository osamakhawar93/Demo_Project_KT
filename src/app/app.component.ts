import { Component, OnInit } from '@angular/core';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'KTProject-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[SharedService]
})
export class AppComponent implements OnInit{
  showLoader: boolean = false;
  constructor(public _sharedService:SharedService){}
  ngOnInit() {
    this._sharedService.changeEmitted$.subscribe(a => {
      this.showLoader = a;
    });
  }
}
