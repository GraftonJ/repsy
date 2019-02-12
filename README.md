# REPSY -- Connecting Doctors and Pharma Sales Reps

## About the app

REPSY is a mobile application designed to change the interactions of doctors and pharma sales representatives. REPSY empowers doctors by making information about pharmaceuticals easily accessible. In addition to providing clinical information about pharmaceuiticals, REPSY allows doctors to take charge of their interactions with sales reps by letting them schedule time to meet--not the other way around.

REPSY was built with React Native and supports IOS and Android.  The app uses a custom-built API of medical conditions and corresponding treatments to help provide information to doctors and connect them to the correct sales representative if needed.  The applications backend is in a separate project and deployed to a Heroku server (https://github.com/GraftonJ/repsy-be)

## Login

The Login screen allows users with an account to login.
<br>
<br>
<img src="screenshots/screen001.png" alt="login" width="300"/>


## Create Account

To create an account, the user must choose if they are creating a doctor account or a sales representative account. They are taken to the appropriate form based on their selection
<br>
<br>
<img src="screenshots/screen002.png" alt="drrep" width="300"/>

<br>
<img src="screenshots/screen003.png" alt="login" width="300"/>

For a doctor account, the user must select a specialty. This will pull the correct information from the API once they login.

<br>
<img src="screenshots/screen005.png" alt="login" width="300"/>

Sales reps create an account by providing personal info and information about their company

<br>
<img src="screenshots/screen004.png" alt="login" width="300"/>


## Homepage

The first time a doctor logs in, the homepage will be empty. The doctor can pin conditions to their homepage by selecting from the list of conditions covered by their specialty (Oncology in this case).

<br>
<br>
<img src="screenshots/screen006.png" alt="home" width="300"/>

Scrolling list of conditions for the doctor's specialty

<br>
<img src="screenshots/screen007.png" alt="login" width="300"/>

Once a doctor selects a condition from the list, in this case Breast Cancer, it is saved to their homepage until they delete it by clicking the trash icon.

<br>
<img src="screenshots/screen008.png" alt="login" width="300"/>


## Conditions & Treatments

A doctor can view information about all conditions their specialty treats by clicking "Conditions" in the footer menu. Clicking any of the conditions from the list brings up a list of pharmaceuticals used to treat that condition.

<br>
<img src="screenshots/screen009.png" alt="login" width="300"/>

By clicking "Treatments" from the footer menu, a doctor can view a list of pharmaceuticals used to treat any condition covered by his/her specialty. The doctor can filter this list by brand name or generic name.

Generic name list:
<br>
<img src="screenshots/screen010.png" alt="login" width="300"/>

Brand name list:
<br>
<img src="screenshots/screen011.png" alt="login" width="300"/>


## Treatments for a Particular Conditions

A doctor can click a particular treatment from the homepage or the footer menu list to view treatments for that condition. Clicking a treatment advances to a screen that gives the doctor access to clinical information about that treatment as well as the ability to find a sales representative for more information

List of treatments for Breast Cancer:
<br>
<img src="screenshots/screen012.png" alt="login" width="300"/>

Screen after clicking Kadcyla:
<br>
<img src="screenshots/screen013.png" alt="login" width="300"/>

The clincial data at the top pulls information directly from the manufacturer. In this case, clicking "Dosing" opens a screen with the most up to date and accurate dosing information for the treatment.
<br>
<img src="screenshots/screen014.png" alt="login" width="300"/>

![Example](screenshots/screen06.png)

![Example](screenshots/screen07.png)


## Login/out

Basic user management screens.

![Example](screenshots/screen08.png)

![Example](screenshots/screen09.png)

![Example](screenshots/screen10.png)
