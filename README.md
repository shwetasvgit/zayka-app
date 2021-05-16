# Zayka-App

![alt tag](https://user-images.githubusercontent.com/83686575/118394088-30fdff00-b660-11eb-9316-1f30d42cb821.JPG)

*/zāyakā/~ essence*

This repo contains the code for a restaurant management system front end app for the user. 
A combination of App, Manager's desk interface(web, present in a different repo) , Hardware(code not present on git), is what gets the entire thing running, but It should work well without the hardware as well with a few tweaks.

## Working

* The order should be placed via the phone application
* Manager has a RasbPi hosted web interface
* Order is passed to the Kitchen
* Manager posts updates via web interface on Pi hosted Screen
* Order ready is displayed once everything is done

![alt tag](https://user-images.githubusercontent.com/83686575/118393689-fbf0ad00-b65d-11eb-8831-8e0e0cbd9997.png) 

## How the repo code will work

* The repo contains code for the android/ios app(which will need to be converted to a downloadable or emulator)
* The app will have the above shown logo appearing on the splashscreen
* The web interface code is present on another repository called Zayka-web


## Installation 

* Android / Ios app downloadable needs to be created out of the ionic code( Youtube/ Google can help here)
* Raspberry Pi is merely to have a hardware display and a prototype( not intended to be used in the final version)
* Database is a local firestore database. Users should change the source of the db and make their own.
* Web interface is based on Angular. Angular-Cli hosted on local network will work easy :)

## Development

Want to contribute? Great!

Please note the web code is not present on this repo and Zayka-web must be used for that purpose.

To fix a bug or enhance an existing module, follow these steps:

* Fork the repo
* Create a new branch (git checkout -b improve-feature)
* Make the appropriate changes in the files
* Add changes to reflect the changes made
* Commit your changes (git commit -am 'Improve feature')
* Push to the branch (git push origin improve-feature)
* Create a Pull Request

### To-do
Establish a powerful backend to handle multiple orders 
Remove the hardware dependency , make the application purely web-phone based
Improve web interface

## Past Contributors

Ankita Sharma,
Sonali Sharma,
Shweta Varadarajan

## License

MIT 



