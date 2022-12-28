import { Component, OnInit, VERSION } from '@angular/core';
import { WebSocketService } from './services/web-socket/web-socket.service';
import {Observable, audit, of, interval} from 'rxjs';
import {map } from 'rxjs/operators';
import {select, Store } from "@ngrx/store";
import { twitterDataSelector} from "./app.selectors";
import { single } from './mock-chart-data';
import {TwitterDataModel} from "./model/twitter-data.model";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    twitterData$: Observable<object[]>;

    constructor(private webSocketService: WebSocketService, private storeService: Store<any>) {
        Object.assign(this, { single });
    }

    single: any[];
    multi: any[];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Tweets Per Second';
    showYAxisLabel = true;
    yAxisLabel = 'Number Of Tweets with hash tags';

    colorScheme = {
        domain: ['#7c95fc', '#042cbc', '#444187', '#021f96']
    };

    streamIsOn = true;

    cachedResponse: TwitterDataModel;

    onSelect(event) {
        console.log(event);
    }

    ngOnInit(){
        // when the stream is on we will consume from the regular observable else from the the last emitted value
        // of the source observable this will allow us to freeze the chart to current
        this.twitterData$ = this.storeService.pipe(select(twitterDataSelector),
                                                    map( data =>  {  // if the stream is turned on we will emit latest, if it is turned off then we will emit a cached value
                                                                            if(this.streamIsOn){
                                                                                this.cachedResponse = data;
                                                                                return  data.twitterData
                                                                            } else {
                                                                                return this.cachedResponse.twitterData;
                                                                            }
                                                    }));
    }

    toggleStream(evt){
        this.streamIsOn = !this.streamIsOn;
    }


}