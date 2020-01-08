import { ArtistsInterface } from './artists';
import { VenueInterface } from './venue';
export interface EventsInterface {
    id: number;
    artist_id: number;
    url: string;
    on_sale_datetime:string;
    datetime:string;
    description:string;
    upcoming_event_count:number;
    artist:ArtistsInterface;
    venues:VenueInterface
  }