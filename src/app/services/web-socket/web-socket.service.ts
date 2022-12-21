import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable()
export class WebSocketService {
  private readonly authToken =
    'Bearer AAAAAAAAAAAAAAAAAAAAALGIkgEAAAAAuAf5xzhlwnIdGbEzUosVrRSY5os%3DRLMWue63Vjpz6Ngiw2mJmrogzCzySRyescdvQrQfQjHOXL4fYu';

  twitterStreamUrl =
    'https://api.twitter.com/2/tweets/sample/stream?tweet.fields=created_at,entities&user.fields=created_at,username,location';

  constructor() {
    const subject = webSocket(
      this.twitterStreamUrl + '?Authorization=${this.authToken'
    );

    subject.subscribe({
      next: (msg) => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    });
  }
}
