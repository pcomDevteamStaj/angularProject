import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

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

  constructor(private authService: AuthService) {
    authService.getIndvInfo ();
    this.test ();
  }
  
  ngOnInit() {
  }

  test () {
    console.log ("UserPanel test() method");
  }

}
