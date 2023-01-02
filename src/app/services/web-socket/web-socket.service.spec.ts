import {TestBed, waitForAsync} from '@angular/core/testing';
import {WebSocketService} from "./web-socket.service";
import {WebSocketFactoryService} from "./web-socket-factory.service";
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {Subject} from 'rxjs';
import {TwitterDataModel} from "../../model/twitter-data.model";
import * as AppActions from "../../store/app.actions";

describe("WebSocketService", () => {

    let service: WebSocketService;
    let store: MockStore;
    let webSocketFactoryServiceSpy;
    let fakeSocket: Subject<any>;


    const initialState = {twitterData: {twitterData: []}};

    beforeEach(() => {

        // Mocking the websocket
        webSocketFactoryServiceSpy = jasmine.createSpyObj('WebSocketFactoryService', ['makeSocket']);
        webSocketFactoryServiceSpy.makeSocket.and.callFake(() => {
            return fakeSocket
        });

        // Make a new socket so we don't get lingering values leaking across tests
        fakeSocket = new Subject<any>();

        // Spy on it so we don't have to subscribe to verify it was called
        spyOn(fakeSocket, 'next').and.callThrough();

        TestBed.configureTestingModule({
            providers: [WebSocketService,
                {provide: WebSocketFactoryService, useValue: webSocketFactoryServiceSpy},
                provideMockStore({initialState})]
        });

        service = TestBed.inject(WebSocketService);
        store = TestBed.inject(MockStore);
        service = TestBed.inject(WebSocketService);

        spyOn(store, 'dispatch');
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it('should attempt a websocket connection on create', () => {
        expect(webSocketFactoryServiceSpy.makeSocket).toHaveBeenCalledTimes(1);
        expect(webSocketFactoryServiceSpy.makeSocket).toHaveBeenCalledWith('ws://localhost:8080');
    });

    describe('Observable pipe data mapping', () => {


        beforeEach(() => {

            const mockTweet = {
                data: {
                    author_id: "1424758747457540103",
                    created_at: "2023-01-01T20:45:41.000Z",
                    edit_history_tweet_ids: ["1609652101990473728"],
                    entities: {hashtags: [{start: 189, end: 201, tag: "forademônio"}]}
                }
            };

            //web socket has to emit at least 200 times to fill the buffer
            for (let i = 0; i < 300; i++) {
                fakeSocket.next(mockTweet);
            }

        });


        it("should call store.dispatch() when socket connection emits a value", () => {
            expect(store.dispatch).toHaveBeenCalledTimes(1);
        });


        it('should emit a properly formatted response', () => {
            const chartData = [{"name":"45:41","value":200}];
            expect(store.dispatch).toHaveBeenCalledWith(AppActions.twitterDataLoaded({twitterData: chartData} as TwitterDataModel));
        });


    });



});