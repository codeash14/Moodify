# Moodify

## **Final Year Project**
## Mood based spotify player built using facial emotion recognition and spotify apis

The project focuses on developing a system that presents a cross-platform music player, which recommends music based on the real-time mood of the user through a web camera.

As a music listener, we have always felt that music players should do way more things than just playing songs and allowing users to make play-lists. A music playlist should be intelligent and act in keeping with the user's preferences. A music playlist should help users organize and list the songs automatically without putting much effort into selection and re-organization of songs.

The Generating Playlist Using Facial Expressions provides a better platform to any or all the music listeners, and ensures automation of generating a playlist according to the emotion of the user. This helps users to generate a playlist according to their moods. It recommends the top playlist based on the mood of the user using Spotify API. The dataset used for training the model is taken from kaggle.

![image](./fer_model/static/react/logo.png)


## Team Members

Ayushi Gupta (1900140100028)

Jaskirat Kaur Nayyar (1900140100050)

Sharia Hasan (1900140100096)


### 1. To run the project using python, run the the following steps - 

Open terminal in project path and run the following commands
```
cd moodify_webapp
npm i --force
npm audit fix --force
cd authorization_code
```

Setup CLIENT_ID, CLIENT_SECRET, REDIRECT_URI in server.js and then run the command to activate webapp on port 8888

```
node server.js
```

Now open another terminal in project path and run the following commands

```
cd fer_model
conda create --name projectenv --file requirements.txt
conda activate projectenv
flask run --host=0.0.0.0
```

Go to http://localhost:8888/ to open Moodify - Homepage

Login using Spotify

You will be automatically redirected to Moodify at http://localhost:5000/ with your access token on successful authentication


### 2. To run the project using docker, run the the following steps  -

Open terminal in project path and run the following commands

```
docker-compose up –d
```

Go to http://localhost:8888/ to open Moodify - Homepage

Login using Spotify

You will be automatically redirected to Moodify at http://localhost:5000/ with your access token on successful authentication


