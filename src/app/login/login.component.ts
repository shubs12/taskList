import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  data = []
  name = '';
  password='';


  constructor() { }
  ngOnInit(): void {

  }

  Register(){
    let a=[this.name,this.password]
    console.log(a);
  }
}
