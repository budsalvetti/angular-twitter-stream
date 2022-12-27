import {Injectable} from '@angular/core';
import {Observable, bufferCount, bufferTime, map} from "rxjs";
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

        const timeCountMap = {};

        subject$.pipe(bufferCount(this.maxRecordCount, this.maxRecordCount),
                      map((buffer) => {

                            let timeSeriesArray = [];

                            for (let tweet of buffer) {

                                let tweetData = tweet['data'];

                                const hashTags = tweetData[this.entitiesKey] && tweetData[this.entitiesKey][this.hashTagsKey];

                                let createdTime = tweetData['created_at'];

                                //if createdTimeStamp is not in the map then add the entry with a value of 0
                                if (!timeCountMap[createdTime]) {
                                    timeCountMap[createdTime] = 0;
                                }

                                // see if elon is is mentioned in a hash tag increment the tweet count
                                // if (hashTags && hashTags.find(tagObj => tagObj.tag.toLowerCase() === 'elon')) {
                                //     timeCountMap[createdTime]++;
                                // }

                                // see if tweet has any hashtags
                                if (hashTags) {
                                    timeCountMap[createdTime]++;
                                }

                            }

                            const sortedTimeStampArray = Object.keys(timeCountMap).sort();

                            for (let timeStamp of sortedTimeStampArray) {

                                const timeSeriesObject = {};
                                timeSeriesObject['name'] = timeStamp;
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



