import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from "../sign-up/sign-up" ;
import {AngularFireAuth} from 'angularfire2/auth';
import { User } from "../../models/user";
import { HomePage } from '../home/home';
import { CreamyNutsPage } from '../creamy-nuts/creamy-nuts';
import * as firebase from 'firebase';
import 'firebase/firestore';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  splash = true;

   user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  async login(user: User) {
   const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if(result)
    {
      this.navCtrl.push(CreamyNutsPage);
    }
  }

  goToSignUp()
  {
     this.navCtrl.push(SignUpPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //  this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
   //   this.tabBarElement.style.display = 'flex';
    }, 4000);
  }

}
