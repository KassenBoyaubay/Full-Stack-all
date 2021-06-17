deployed website: https://admiring-pike-aa3404.netlify.app/

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
## CLIENT
*in __client__ folder*
```
npx create-react-app .
cd client
npm install axios
npm install react-router-dom
npm install formik
npm install yup
```
*__yup__ is used to validate info for forms*
*create folder __pages__ in __src__ folder, and then create __Home.js__ etc.*
## SERVER
*__bcrypt__ used for authentication, changes password for hash value for secutiry*
```
cd server
npm install bcrypt
```
*__Jason Web Token__ authentication for token generation & validation, store in session storage*
```
npm install jsonwebtoken
```
*create __middlewares__ folder for token validation*
## CLIENT
### MATERIAL-UI
```
npm install @material-ui/core
npm install @material-ui/icons
```

# DEPLOYMENT

*Create in Github client and server repositories*

## Preparation

```
npm install dotenv
```
*change port 3001 in index.js so that it can be working w/ Heroku*

```
npm uninstall bcrypt
npm install bcryptjs
```
*bcrypt may be incompattible w/ Heroku, so change it to bcryptjs*

*change in __package.json__*:
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "devStart": "nodemon index.js",
    "start": "node index.js"
  },
```

## Heroku

### Connecting db to Heroku

*go to Heroku: https://dashboard.heroku.com/apps*

*New -> Create new app -> app name: full-stack-api-kas*

*Resources -> in Add-ons type __ClearDB MySQL__ -> choose Free plan -> submit, put credit card info if needed*

*Settings -> Config Vars -> copy value of CLEARDB_DATABASE_URL like this:*
*mysql://b2dbdbbdd09949:2b4257b9@eu-cdbr-west-01.cleardb.com/heroku_26ed2367d5f497b?reconnect=true*

*go to __config__ folder, __config.json__, put in production from the copied value:*  

*host value: __eu-cdbr-west-01.cleardb.com__*

*database value: __heroku_26ed2367d5f497b__*

*username value: __b2dbdbbdd09949__ (smallest one is password)*

*password value: __2b4257b9__ (smallest one is password)*

*before:*
```
"production": {
  "username": "root",
  "password": null,
  "database": "database_production",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
```

*after*:
```
"production": {
  "username": "b2dbdbbdd09949",
    "password": "2b4257b9",
  "database": "heroku_26ed2367d5f497b",
  "host": "eu-cdbr-west-01.cleardb.com",
  "dialect": "mysql"
}
```

### Deploying Git Heroku

***follow its Git deployment:***
```
cd server
heroku login
```

*if not installed, install by*
```
npm install -g heroku
```

*create new git backend repository in server:*
```
git init
heroku git:remote -a full-stack-api-kas
```

*deploy git app:*
```
git add .
git commit -am "First commit"
git push heroku master
```

*Open app -> try get method, should return null-s, so it's working, if not: search for mistakes*

### MySQL Workbench

*open __MySQL Workbentch__, + connection*

*connection name: whatever*

*connection info: same as in config folder, config.json, but in Default Schema put database value from config.json*

*test connection -> if ok, then apply, and this is db for production now*

## Netlify

### axios change localhost

*change everywhere in axios to https://full-stack-api-kas.herokuapp.com from Heroku*

*search in vscode http://localhost:3001 replace to https://full-stack-api-kas.herokuapp.com*

### girhub

*push client into client repository in github*
```
cd client
git init
git add .
git commit -m "First commit"
git branch -M main
git remote add origin https://github.com/KassenBoyaubay/Full-Stack-client.git
git push -u origin main
```

### netlify

*Go to Netlify: https://app.netlify.com/start*

*Click to Git, pick client repository*

*3rd step: check in pockage.json build command -> change __Build command__ to npm build and add CI= at beginnig:*
*__CI= npm run build__*

*website should work*

### trigger re-deploy if needed

*if needed: Deploys -> Trigger redeploy -> deploy site*
