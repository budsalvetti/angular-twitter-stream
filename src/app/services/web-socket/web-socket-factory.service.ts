import {Injectable} from "@angular/core";
import { webSocket, WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';

/**
 * Using this class to inject webSocket() gives us the opportunity to mock this service for Unit Testing
 */
@Injectable()
export class WebSocketFactoryService {

    constructor(){}

    public makeSocket<T>(urlConfigOrSource: string | WebSocketSubjectConfig<T>): WebSocketSubject<T> {
        return webSocket<T>(urlConfigOrSource);
    }
}