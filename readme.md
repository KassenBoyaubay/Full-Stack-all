# SERVER
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
*now start server with:*
```
npm start
```
#### OTHER
- **Open _GitHub Desktop_ add this existing (folder) repository, after finishing publish to github.**
- **Open _MySQL Workbentch_ go to _01Connection_ in _SCHEMAS_ create new schema (database)**
## SERVER
*in master folder:*
```
npm install sequelize 
npm install -g sequelize-cli
cd server
sequelize init
```
*delete __migrations__ and __seeders__ folders*  

- *in __models__ folder create tables like __Posts.js__*  

*change in __config__ folder __config.json__ file to connect to database:*:
```
"development": {
    "username": "root",
    "password": "password",
    "database": "react-fullstack",
    "host": "localhost",
    "dialect": "mysql"
  },
```
*check in server folder if works:*
```
npm start
```
- **select _Tables_ in _MYSQL Workbentch  and click _Refresh all_. Should be new created table _posts_**  

*create __routes__ folder*
