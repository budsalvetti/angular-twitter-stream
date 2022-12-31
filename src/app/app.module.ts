import {NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//NgRx imports
import {reducers} from './reducers';
import {StoreModule} from '@ngrx/store';
//import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

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
