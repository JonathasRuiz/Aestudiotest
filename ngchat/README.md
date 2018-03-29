
# app
This is a simple app that uses socket io + angularjs v1.2.32.

The client sends a message to the server and the server broadcast this message back.

![app](http://g.recordit.co/2hAmZVsMR7.gif)

### TODO:
- Create a new project on Github
OK - Right now it is only showing the last message. We need it to list all the messages sent in a session. It could be a list `ul > li`.
OK - Add the date and time for each message.
OK - Add a validation, don't let the user hit send if there nothing to be sent.
OK - The current implementation it is only broadcasting the message to the sender, make it broadcast the message to all the users that have the app opened. 
OK - Make it looks like chat app.

#### Plus:
OK - Allow the users to have a nickname.
OK - Allow the users to enter a room name.
OK - Make it pretty.

## Running

You will need `node` and `npm`.

### server
it will use the port 3696
*run:*
`cd server`
`npm install`
`npm start`

### client
it will use the port 8012
*run:*
`cd app`
`npm install`
`npm start`
open http://localhost:8012
