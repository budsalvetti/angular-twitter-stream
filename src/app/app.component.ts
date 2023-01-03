import { Component, OnInit} from '@angular/core';
import { WebSocketService } from './services/web-socket/web-socket.service';
import {Observable, audit} from 'rxjs';
import {map } from 'rxjs/operators';
import {select, Store } from "@ngrx/store";
import { twitterDataSelector} from "./store/app.selectors";
import {TwitterDataModel} from "./model/twitter-data.model";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    twitterData$: Observable<object[]>;

    constructor(private webSocketService: WebSocketService, private storeService: Store<any>) {
    }

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

    colorScheme = {domain: ['#7c95fc', '#042cbc', '#444187', '#021f96']};

    streamIsOn = true;

    waitingForData = true;

    cachedResponse: TwitterDataModel;


    ngOnInit(){
        // when the stream is on we will consume from the regular observable else from the the last emitted value
        // of the source observable this will allow us to freeze the chart to current
        this.twitterData$ = this.storeService.pipe(select(twitterDataSelector),
                                                    map( data =>  {
                                                                            //turn off the spinner if we've gotten any real data
                                                                            if(data.tweetData){
                                                                                this.waitingForData = false;
                                                                            }
                                                                            // if the stream is turned on we will emit latest,
                                                                             // if it is turned off then we will emit a cached value
                                                                            if(this.streamIsOn){
                                                                                this.cachedResponse = data;
                                                                                return  data.tweetData;
                                                                            } else {
                                                                                return this.cachedResponse.tweetData;
                                                                            }
                                                    }));
    }

    /**
     * toggleStream
     *
     * @description
     * freezes the chart view by virtue of
     * settting a boolean which allows the stream observable to return a cached response from the observable
     */
    toggleStream(): void{
        this.streamIsOn = !this.streamIsOn;
    }


}