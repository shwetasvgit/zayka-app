import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from "../pages/sign-up/sign-up" ;
import { CreamyNutsPage } from "../pages/creamy-nuts/creamy-nuts" ;
import { CartPage } from "../pages/cart/cart";
import { BillingPage } from '../pages/billing/billing';
import {OrderApprovedPage} from '../pages/order-approved/order-approved';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    CreamyNutsPage,
    CartPage,
    BillingPage,
    OrderApprovedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignUpPage,
    CreamyNutsPage,
    CartPage,
    BillingPage,
    OrderApprovedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
