import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistsInterface } from '../../interface/artists';
import { BandsService } from 'src/app/services/bands.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[BandsService]
})
export class HomeComponent implements OnInit,OnDestroy {
  public searchInput: string = "";
  public artist:ArtistsInterface;
  public noArtistsError = false;
  public errorMessage:string = '';
  public artistsArray= [];
  public searchOptions = [];
  public artistSubscription:any;
  constructor(public bandsApiService:BandsService, public _sharedService: SharedService,) { }

  ngOnInit() {
    if(localStorage.getItem('artists')){
      /* Parsing the array back */
      this.artistsArray = JSON.parse(localStorage.getItem('artists'));
    }
  }

  getThisArtist = (artist) =>{
    this.artist = artist;
    this.searchOptions = [];
  }
  enterKeySubmission = (event) => {
    this.searchOptions = [];
    var lowecaseSearch = (event.target.value).toLowerCase();
    /**
     * Rlowercase search has the input of the user in a variable
     */
    this.artistsArray.filter((artist) => {
        if(artist.name.toLowerCase().indexOf(lowecaseSearch) !== -1){
          this.searchOptions.push(artist);
        }
    });
    
    /* Enter key pressed? */
    if(event.keyCode == 13){
      this.getSearchResults(event.target.value);
    }

 
    /* if length = 0 , empty search suggestions */
    if(event.target.value.length == 0){
      this.searchOptions = [];
    }
  }

  getSearchResults = (value)=>{
    this.searchInput = value;
    if(this.searchInput.length>0){
      this._sharedService.showLoader(); /* Calling Shared Service Method to show global loader */

      /* Search in localstorage if it has data else call API */
      if(this.artistsArray.length>0){
        this.fetchDataFromLocalStorage();
      }else{
        this.getSearchResultsFromApi();
      }
    }else{
      this.noArtistsError = true;
      this.artist = null;
      this.errorMessage = 'Please enter a name in the search field!';
      this._sharedService.hideLoader(); 
    }
  }

  getSearchResultsFromApi = () =>{
    this.artistSubscription = this.bandsApiService.fetchArtistsInformation(this.searchInput).subscribe(a=>{
      if(a == ''){
        this.noArtistsError = true;
        this.errorMessage = 'No Artist found!';
        this.artist = null;
        this._sharedService.hideLoader(); 
      }else{
        this.artist = a;
        this.noArtistsError = false;
        this.errorMessage = '';
        this.artistsArray.push(this.artist);
        this._sharedService.hideLoader(); 
      }
    })
  }

  /**
   * Fetching users from localstorage 
   */
  fetchDataFromLocalStorage = () =>{
    this.artist = this.artistsArray.find(x=>x.name == this.searchInput);
    if(this.artist == undefined){
      this.getSearchResultsFromApi();
    }
    this._sharedService.hideLoader(); 
  }

  /**
   * Store in localstorage if user clicks on his events 
   */
  storeDataInLS = () => {
    localStorage.setItem('artists',JSON.stringify(this.artistsArray));
  }

   /**
   * Unsubscribing to any open subscriptions
   *  */ 
  ngOnDestroy = () => {
    if(this.artistSubscription && !this.artistSubscription.closed){
      this.artistSubscription.unsubscribe();
    } 
  }
}
