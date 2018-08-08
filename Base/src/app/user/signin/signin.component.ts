import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
	  var params = new HttpParams ()
			.set ('USER', form.value.username)
			.set ('PASS', form.value.password);
	  //this.http.post ("http://localhost:3000/", null, {params}).subscribe (r => {console.log ("r: " + r));
	  this.http.get ("http://localhost:3000/", {params}).subscribe (r => {console.log ("r: " + r.isAllowed));
  }
}
