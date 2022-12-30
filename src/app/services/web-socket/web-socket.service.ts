import {Injectable} from '@angular/core';
import {bufferCount, map} from "rxjs";
import {webSocket} from 'rxjs/webSocket';
import {Store} from "@ngrx/store";
import * as AppActions from '../../app.actions';
import {TwitterDataModel} from "../../model/twitter-data.model";

@Injectable()
export class WebSocketService {

    readonly maxRecordCount = 100;
    readonly entitiesKey = 'entities';
    readonly hashTagsKey = 'hashtags';

    constructor(private store: Store) {

        const subject$ = webSocket('ws://localhost:8080');


        subject$.pipe(bufferCount(200, 200),
                      map((buffer) => {
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

                            const sortedTimeStampArray = Object.keys(timeCountMap).sort();

                            for (let timeStamp of sortedTimeStampArray) {

                                const timeSeriesObject = {};
                                const date = new Date(timeStamp);

                                timeSeriesObject['name'] = date.getMinutes() + ':' + date.getSeconds();
                                timeSeriesObject['value'] = timeCountMap[timeStamp];

                                timeSeriesArray.push(timeSeriesObject);
                            }

                            return timeSeriesArray;

                        })).subscribe({
                            next: (timeSeriesArray) => {

                            this.store.dispatch(AppActions.twitterDataLoaded({twitterData: timeSeriesArray} as TwitterDataModel));

                            }, // Called whenever there is a message from the server.
                            error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
                            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }

}



