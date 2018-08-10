import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  user_id: number;
  user_name: string;
  user_mail: string;
  user_title: string;
  user_phone: string;
  user_gender: string;
  user_rank: number;

  data: [any];
  tables: [any];
  columns: [any];

  dataFormControl: FormControl;

  constructor(private authService:AuthService, private http:HttpClient) {
    this.dataFormControl = new FormControl();
    this.getTables ();

    this.test ();

    // Build Environment
    console.log ("[LOCAL] TABLE_NAME: " + localStorage.getItem ("TABLE_NAME"));
  }
  
  ngOnInit() {
  }

  test () {
    this.getColumns ();

    console.log ("UserPanel test() method");

    var params = new HttpParams ()
      .set ("USER", localStorage.getItem ("USERNAME"));
    this.http.get <Response> ("http://localhost:3000/user", {params}).subscribe (res => {
      this.data = res.rows;

      this.user_id = this.data [0][0];
      this.user_name = this.data [0][1];
      this.user_mail = this.data [0][2];
      this.user_title = this.data [0][3];
      this.user_phone = this.data [0][4];
      this.user_gender = this.data [0][5];
      this.user_rank = this.data [0][6];
    });
  }

  getData (count:number | null) {
    console.log ("Selected table is " + this.dataFormControl.value);
    localStorage.setItem ("TABLE_NAME", this.dataFormControl.value);
    this.getColumns ();

    console.log ("UserPanel getData() method");

    // Set Parameters
    var params = new HttpParams ()
      .set ("COUNT", count + "");
    
    // Send Method
    this.http.get <Response> ("http://localhost:3000/user", {params}).subscribe (res => {
      this.data = res.rows;
    });
  }
  
  getTables () {
    console.log ("UserPanel getTables() method");
    
    this.http.get <Response> ("http://localhost:3000/database").subscribe (res => {
      this.tables = res.rows;

      if (!localStorage.getItem ("TABLE_NAME")) {
        localStorage.setItem ("TABLE_NAME", this.tables [0]);
      }

      this.dataFormControl.setValue (localStorage.getItem ("TABLE_NAME"));
    });
  }
  
  getColumns () {
    console.log ("UserPanel getColumns () method");
    
    var params = new HttpParams ()
    .set ("TABLE_NAME", localStorage.getItem ("TABLE_NAME"));
    
    this.http.get <Response> ("http://localhost:3000/database", {params}).subscribe (res => {
      this.columns = res.rows;
    });
  }
}

interface InfoResponse {
  user_id: number;
  user_name: string;
  user_mail: string;
  user_title: string;
  user_phone: string;
  user_gender: string;
  user_rank: number;
}

interface Response {
  rows: [any];
}