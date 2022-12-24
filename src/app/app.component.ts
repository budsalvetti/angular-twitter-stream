import { Component, OnInit, VERSION } from '@angular/core';
import { WebSocketService } from './services/web-socket/web-socket.service';
import {Observable} from 'rxjs';
import {select, Store } from "@ngrx/store";
import { twitterDataSelector} from "./app.selectors";
import {TwitterDataModel} from "./model/twitter-data.model";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
    name = 'Angular ' + VERSION.major;

    twitterData$: Observable<TwitterDataModel>;

    constructor(private webSocketService: WebSocketService, private storeService: Store<any>) {}


    ngOnInit(){
        this.twitterData$ = this.storeService.pipe(select(twitterDataSelector));
    }


}