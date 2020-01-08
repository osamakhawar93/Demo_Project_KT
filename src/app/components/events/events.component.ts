import { Component, OnInit } from '@angular/core';
import { EventsInterface } from '../../interface/events';
import { BandsService } from 'src/app/services/bands.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'events-component',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers:[BandsService]
})
export class EventsComponent implements OnInit {
  public artistName: string = '';
  public events:EventsInterface[];
  public noEvents:boolean = false;
  constructor(public bandsApiService:BandsService,  private route: ActivatedRoute,public _sharedService:SharedService) { }

  ngOnInit() {
    this.artistName = this.route.snapshot.queryParams['artistName'];
    this.getEventDetailsForUser(this.artistName);
  }

  getEventDetailsForUser = (artistName)=>{
    this._sharedService.showLoader(); //Calling Shared Service Method to show global loader
    this.bandsApiService.fetchEventsForSelectedUser(artistName).subscribe((a)=>{
      if(a.length>0){
        this.noEvents = false;
        this.events = a;
      }else{
        this.noEvents = true;
      }
      this._sharedService.hideLoader(); //Calling Shared Service Method to show global loader
    })
  }
}
