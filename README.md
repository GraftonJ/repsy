# REPSY -- Connecting Doctors and Pharma Sales Reps

## About the app

REPSY is a mobile application designed to change the interactions of doctors and pharma sales representatives. REPSY empowers doctors by making information about pharmaceuticals easily accessible. In addition to providing clinical information about pharmaceuiticals, REPSY allows doctors to take charge of their interactions with sales reps by letting them schedule time to meet--not the other way around.

REPSY was built with React Native and supports IOS and Android.  The app uses a custom-built API of medical conditions and corresponding treatments to help provide information to doctors and connect them to the correct sales representative if needed.  The applications backend is in a separate project and deployed to a Heroku server (https://github.com/GraftonJ/repsy-be)

## Login

The Login screen allows users with an account to login.
<br>
<img src="screenshots/screen001.png" alt="login" width="300"/>


## Create Account

To create an account, the user must choose if they are creating a doctor account or a sales representative account. They are taken to the appropriate form based on their selection
<br>
<img src="screenshots/screen002.png" alt="drrep" width="300"/>


## Details

Tapping a result leads to the Detail screen with more information on the restaurant and a link to the mobile device's default map.

![Example](screenshots/screen03.png)

![Example](screenshots/screen04.png)


## Reviews

If the user is logged in they may tap to leave a rating and comments.

![Example](screenshots/screen05.png)


## Check-in

If the user is logged in they may check-in to a restaurant based on their current location.  In this example the two restaurants are very close to each other so the app lists both choices.

![Example](screenshots/screen06.png)

![Example](screenshots/screen07.png)


## Login/out

Basic user management screens.

![Example](screenshots/screen08.png)

![Example](screenshots/screen09.png)

![Example](screenshots/screen10.png)
