import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class BandsService {
  private serviceUrl = environment.fetchArtistsUrl;
  private app_id = environment.app_id;
  constructor(private http: Http) {

  }
  fetchArtistsInformation(searchParam) {
    return this.http.get(this.serviceUrl+'/artists/'+searchParam+'?app_id='+this.app_id).map(res => res.json());
  }
  fetchEventsForSelectedUser(artistName){
    return this.http.get(this.serviceUrl+'/artists/'+artistName+'/events?app_id='+this.app_id+'&date=upcoming').map(res => res.json());
  }
}
