import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  loginControl(form: NgForm) {
	  console.log (form.value.username + ":" + form.value.password);
	  var data = JSON.stringify ({USER: form.value.username, PASS: form.value.password});
	  this.http.post ("http://localhost:3000/", data).subscribe (r => {console.log ("r: " + r));
	  //this.http.get ("http://localhost:3000/" + form.value.username);
  }
}
