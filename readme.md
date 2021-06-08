## SERVER
```
cd server
npm  init
npm install express cors mysql2 nodemon
```
*after creating index.js & app.listen() to check if working run:*
```
node index.js 
```
*change in __package.json__*:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```