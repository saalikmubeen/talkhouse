# talkhouse
WebRTC based peer to peer video calling and messaging web app build with MERN stack.

# [Demo](https://talkhouse-tv.netlify.app/)

# Libraries used

- **`React`** for frontend
- **`Socket.io`** as signaling server and realtime communication 
- **`simple-peer`** for peer-to-peer WebRTC connections
- **`Express`** as server
- **`MongoDB`** for persistance of data
- **`Material UI`** for creating ui
- **`Redux`** for state management
- **`Typescript`** for type safety, cure for headace you get when props are flowing all over the app with no hint 


# Features

* User authentication and authorization
* Audio and Video Chat
* Messaging with storage of messages in the database
* Sending invitation to friends
* Able to accept or reject an invitation
* Online indicator
* Notify on typing
* Sceen sharing 

**and more....**


# Installation

1. Clone project

```
git clone git@github.com:saalikmubeen/talkhouse.git
```

## Manual

If you dont't have docker installed, or don't know how to docker, [who doesn't know docker in the first place 😑]

cd into root project

```
1. cd server
```

`npm install` to to install server dependencies

`Setup required environment variables:` 
 
- MONGO_URI_DEV
- JWT_SECRET

`npm run dev` to start development server with nodemon

*Make sure you have mongoDB installed*

```
1. cd client
```

`npm install` installs client dependencies.

`npm run start` to start the react development server.


## Docker

Running project through docker is recommended. You don't have to do any setup. Just one docker-compose command and boom project is up and running 😊 

```
docker-compose up --build

```
*Make sure you have docker installed*

 # TODOS

- [ ]  Enable group vdeo and messaging functionality
- [ ]  Implement confirm email, reset password and email sending on friend invitation, *Not a big deal to implement, just a little lazy to implement it*
- [ ]  Allow end to end encryption of messages
- [ ]  Enhace the UI. I hate CSS, not that good at it 🥱😓


