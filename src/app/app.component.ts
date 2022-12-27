import { Component, OnInit, VERSION } from '@angular/core';
import { WebSocketService } from './services/web-socket/web-socket.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {select, Store } from "@ngrx/store";
import { twitterDataSelector} from "./app.selectors";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from './mock-chart-data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
    name = 'Angular ' + VERSION.major;

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
    yAxisLabel = 'Tweets with hash tags';

    colorScheme = {
        domain: ['#7c95fc', '#042cbc', '#444187', '#021f96']
    };

    onSelect(event) {
        console.log(event);
    }


    ngOnInit(){
        this.twitterData$ = this.storeService.pipe(select(twitterDataSelector),
                                                    map( val => {
                                                        return val.twitterData;
                                                    }));
    }


}