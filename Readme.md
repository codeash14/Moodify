# Moodify

## **Final Year Project**
## Mood based spotify player built using facial emotion recognition and spotify apis


To run the project follow the following steps :

1. Open terminal in project path and run the following commands
```
cd moodify_webapp
npm i --force
npm audit fix --force
cd authorization_code
```
2. setup CLIENT_ID, CLIENT_SECRET, REDIRECT_URI in server.js and then run the command to activate webapp on port 8888
```
node server.js
```
3. now open another terminal in project path and run the following commands
```
cd fer_model
conda create --name projectenv --file requirements.txt
conda activate projectenv
flask run --host=0.0.0.0
```
4. Go to http://localhost:8888/ to open Moodify - Homepage
5. Login using Spotify
6. You will be automatically redirected to Moodify at http://localhost:5000/ with your access token on successfull authentication
