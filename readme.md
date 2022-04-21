This bot can work for anyone and doesn't take too many steps to operate. A couple of things are needed though.

An .env file with the following. 

- MONGODB_CONNECTION // Probably best to go onto Mongo Atlas for this.Must be mongoDB as we use mongoose.
- MIDNITE_EMAIL
- MIDNITE_PASSWORD
- PORT

When the env file is made, all you need to do is install and you're good to go. 

At the root, the following npm scipts are available

- "start-server": "npm start --prefix server" // Command to use when starting up server
- "install-server": "npm install --prefix server" // Install dependencies
- "install-start-server": "npm install --prefix server && npm start --prefix server" // Install and run. 

This program will use data from factorgg and bet on midnite. It uses the basic Kelly Criterion formula to predict how much of bank roll to bet on. I've set this to half a kelly though going to /server/services/kellyCalculation will allow you to remove the divider by 2. It's up to you.

This program is in alpha and I'm a noob programmer however this will be maintained until furthe notice.

Now It's time for a cup of tea. 
