import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {WebSocketService} from "./services/web-socket/web-socket.service";
import {WebSocketFactoryService} from "./services/web-socket/web-socket-factory.service";

describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    let store: MockStore;
    let el;
    const initialState = {twitterData: {tweetData: []}};

    beforeEach(waitForAsync(() => {

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [NgxChartsModule],
            providers: [WebSocketFactoryService, WebSocketService, provideMockStore({initialState})]
        }).compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
                component = fixture.componentInstance;
                el = fixture.debugElement;
                fixture.detectChanges();
                store = TestBed.inject(MockStore);
            });

    }));


    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should have an observable that outputs twitter data', () => {
        const rtnTwitterData = [{"name": "36:18", "value": 1}, {"name": "36:19", "value": 5}, {
            "name": "36:20",
            "value": 9
        }, {"name": "36:21", "value": 3}, {"name": "36:22", "value": 12}, {"name": "36:23", "value": 5}];
        store.setState({twitterData: {twitterData: rtnTwitterData}});
        component.ngOnInit();
        const expected = cold('(a)', {a: rtnTwitterData});
        expect(component.twitterData$).toBeObservable(expected);
    });

    it('Observable should return cached data if the stream has been turned off', () => {

        const rtnTwitterData = [{"name": "36:18", "value": 1}, {"name": "36:19", "value": 5}, {
            "name": "36:20",
            "value": 9
        }, {"name": "36:21", "value": 3}, {"name": "36:22", "value": 12}, {"name": "36:23", "value": 5}];
        store.setState({twitterData: {twitterData: rtnTwitterData}});
        component.ngOnInit();

        const cachedResponse = [{"name": "cached", "value": 1}];
        component.cachedResponse = {twitterData: cachedResponse };
        component.toggleStream();

        const expected = cold('(a)', {a: cachedResponse});
        expect(component.twitterData$).toBeObservable(expected);

    });


    describe('toggleStream()', () => {

        it('should exist', () => {
            expect(component.toggleStream).toBeDefined();
        });


        it("when invoked: should toggle the 'streamIsOn' boolean", () => {
            const beforeToggleVal = component.streamIsOn;
            component.toggleStream();
            expect(component.streamIsOn !== beforeToggleVal);
        });


    });


});
