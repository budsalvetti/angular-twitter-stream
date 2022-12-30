// Open a live stream of roughly 1% random sample of publicly available Tweets
// https://developer.twitter.com/en/docs/twitter-api/tweets/volume-streams/quick-start

const ws = require('ws');
const WebSocketServer = ws.WebSocketServer;
const needle = require('needle');



const streamURL = 'https://api.twitter.com/2/tweets/sample/stream?tweet.fields=created_at,entities,geo&expansions=author_id,geo.place_id&user.fields=created_at,username,location,description';

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = 'AAAAAAAAAAAAAAAAAAAAALGIkgEAAAAAuAf5xzhlwnIdGbEzUosVrRSY5os%3DRLMWue63Vjpz6Ngiw2mJmrogzCzySRyescdvQrQfQjHOXL4fYu';

//create the web socket server
const wss = new WebSocketServer({ port: 8080 });

// when an attempt to connect is made to the server, a new webSocket is created
wss.on('connection', function connection(ws) {
    // send the newly created webSocket into the streamConnect method
    streamConnect(0,ws);
});



function streamConnect(retryAttempt, webSocket) {

  const stream = needle.get(streamURL, {
    headers: {
      'User-Agent': 'v2SampleStreamJS',
      Authorization: `Bearer ${token}`,
    },
    timeout: 20000
  });

  stream
    .on('data', (data) => {
      try {
        const json = JSON.parse(data);
        console.log(json);
        //webSocket will send data back to client
        webSocket.send(data.toString());
        // A successful connection resets retry count.
        retryAttempt = 0;
      } catch (e) {
        // Catches error in case of 401 unauthorized error status.
        if (data.status === 401) {
          console.log(data);
          process.exit(1);
        } else if (
          data.detail ===
          'This stream is currently at the maximum allowed connection limit.'
        ) {
          console.log(data.detail);
          process.exit(1);
        } else {
          // Keep alive signal received. Do nothing.
        }
      }
    })
    .on('err', (error) => {
      if (error.code !== 'ECONNRESET') {
        console.log(error.code);
        process.exit(1);
      } else {
        // This reconnection logic will attempt to reconnect when a disconnection is detected.
        // To avoid rate limits, this logic implements exponential backoff, so the wait time
        // will increase if the client cannot reconnect to the stream.
        setTimeout(() => {
          console.warn('A connection error occurred. Reconnecting...');
          streamConnect(++retryAttempt, webSocket);
        }, 2 ** retryAttempt);
      }
    });
}
