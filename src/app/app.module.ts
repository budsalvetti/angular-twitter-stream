import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
//import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
    imports: [BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxChartsModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateSerializability: true
            }
        }),
        EffectsModule.forRoot([])],
    declarations: [AppComponent],
    providers: [WebSocketService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
