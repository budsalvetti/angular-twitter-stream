import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {WebSocketService} from './services/web-socket/web-socket.service';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HelloComponent} from './hello.component';

//NgRx imports
import {reducers} from './reducers';
import {StoreModule} from '@ngrx/store';
//import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateSerializability: true
            }
        }),
        EffectsModule.forRoot([])],
    declarations: [AppComponent, HelloComponent],
    providers: [WebSocketService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
