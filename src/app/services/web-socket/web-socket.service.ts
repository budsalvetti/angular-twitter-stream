import {Injectable} from '@angular/core';
import {bufferCount, map} from "rxjs";
import {Store} from "@ngrx/store";
import * as AppActions from '../../store/app.actions';
import {TwitterDataModel} from "../../model/twitter-data.model";
import {WebSocketFactoryService} from "./web-socket-factory.service";

@Injectable()
export class WebSocketService {

    readonly entitiesKey = 'entities';
    readonly hashTagsKey = 'hashtags';

    constructor(private store: Store, private wsFactoryService: WebSocketFactoryService) {

       const subject$ = this.wsFactoryService.makeSocket<any>('ws://localhost:8080');

        subject$.pipe(bufferCount(200, 200),
            map(this.chartDataMapFunc)).subscribe({
            next: (timeSeriesArray: object[]) => {
                this.store.dispatch(AppActions.twitterDataLoaded({tweetData: timeSeriesArray} as TwitterDataModel));
            }, // Called whenever there is a message from the server.
            error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }


    /**
     * chartDataMapFunc
     * @param buffer
     * @description : used to convert the twitter data into a format for display in a timeSeries chart
     * @returns {any[]}
     */
    private chartDataMapFunc = (buffer): object[] => {

        // this will a map keyed by the time the tweet was created
        const timeCountMap = {};

        let timeSeriesArray = [];

        for (let tweet of buffer) {

            let tweetData = tweet['data'];

            const hashTags = tweetData[this.entitiesKey] && tweetData[this.entitiesKey][this.hashTagsKey];

            let createdTime = tweetData['created_at'];

            //if createdTimeStamp is not in the map then add the entry with a value of 0
            if (!timeCountMap[createdTime]) {
                timeCountMap[createdTime] = 0;
            }

            // see if tweet has any hashtags
            if (hashTags) {
                timeCountMap[createdTime]++;
            }

        }

        //create an Array of sorted timeStamp entries
        const sortedTimeStampArray = Object.keys(timeCountMap).sort();

        for (let timeStamp of sortedTimeStampArray) {

            const timeSeriesObject = {};
            const date = new Date(timeStamp);

            // make the timestamp more human readable in a 'minutes:seconds' format
            timeSeriesObject['name'] = date.getMinutes() + ':' + date.getSeconds();
            timeSeriesObject['value'] = timeCountMap[timeStamp];

            timeSeriesArray.push(timeSeriesObject);
        }

        return timeSeriesArray;
    }

}








