import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any; //no type safety

  constructor (private accountService: AccountService) {//injection

  }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    let currentUser = localStorage.getItem('user'); //returns string | null which is a troublemaker for parsing
    let user;
    try {
      const user: User = JSON.parse(currentUser != null? currentUser: '');//throws an exception due to '' but that's the only way
      //it works in the newer version of Angular, so I'm catching it myself.
      //note, doing ? currentUser: '{}' makes it think like there is an actual User there, blank.
      this.accountService.setCurrentUser(user);
    }
    catch(error){
      console.error("JSON parse failed, due to no user is connected");
    }
  }
 
}
