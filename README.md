# angular-twitter-stream

This application uses a small web socket server that is returning samples of twitter data in a time series
and the chart shows the number of tweets that contain hashtags per second. All data functionality is implemented
using NgRx patterns


Angular Client Used: @angular/cli@15
Node Version Used: 16.18.1

To Run: please execute the following steps in the order that they are presented.

# Install Dependencies:

  1) open a command prompt and navigate to project root folder.

  2) in the command prompt run the following command: 'npm install --force'
     **note that the '--force' argument must be passed due to some dependency conflicts.


# Start The Web Socket Server:

  run the following command in the command prompt:
   'npm run start-ws-server'.

# Start the Application Server:

  open a new command prompt in tne project root folder and run the following command:
   'npm start'.


# View The Application In A Browser:

  open a browser and navigate to 'localhost:4200'.

  ** DO NOT RELOAD AFTER INITIAL LOAD ** as this will break the connection to the Web Socket Server.


# Freeze the stream button

 Clicking the 'freeze' button will toggle the stream on and off for closer inspection of the values.


# Run Unit Tests:

 1) open command prompt and navigate to project root folder.

 2) in command prompt run the following command: 'npm test'.


 # TROUBLE SHOOTING:

  If the twitter data is not loading it is most likely because the application at 'localhost:4200'
   was loaded more than once causing the web socket server to shut down as it is only designed to handle a single connection.

 TO FIX:

  Restart the Web Socket Server
  1)  Open a command prompt in the project root folder

  2) run the following command in the command prompt:
      'npm run start-ws-server'.

  3) reload the application at 'localhost:4200' but only once.

