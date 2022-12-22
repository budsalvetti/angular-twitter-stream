import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketService {
  private readonly authToken =
    'Bearer AAAAAAAAAAAAAAAAAAAAALGIkgEAAAAAuAf5xzhlwnIdGbEzUosVrRSY5os%3DRLMWue63Vjpz6Ngiw2mJmrogzCzySRyescdvQrQfQjHOXL4fYu';

  twitterStreamUrl =
    'https://api.twitter.com/2/tweets/sample/stream?tweet.fields=created_at,entities&user.fields=created_at,username,location';

  constructor() {}

}

