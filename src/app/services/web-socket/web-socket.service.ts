import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { webSocket } from 'rxjs/webSocket';
import { Store} from "@ngrx/store";
import * as AppActions from '../../app.actions';

@Injectable()
export class WebSocketService {

    constructor(private store: Store) {

        const subject$ = webSocket('ws://localhost:8080');

        let msgCount = 0;

        // we maybe trigger ngRx action here to save the data into the store
        subject$.subscribe({
            next: (msg) => {
                console.log('message received: ' + JSON.stringify(msg));
                msgCount++;
                this.store.dispatch(AppActions.twitterDataLoaded({twitterData: []}));

            }, // Called whenever there is a message from the server.
            error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }

}



