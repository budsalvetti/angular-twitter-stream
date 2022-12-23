import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import { webSocket } from 'rxjs/webSocket';

@Injectable()
export class WebSocketService {

    constructor() {
        const subject = webSocket('ws://localhost:8080');

        // we maybe trigger ngRx action here to save the data into the store
        // and we can monitor for store observable emitions when displaying the chart data
        subject.subscribe({
            next: msg => console.log('message received: ' + JSON.stringify(msg)), // Called whenever there is a message from the server.
            error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
            complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
        });
    }

}



