import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {FormControl, Validators} from '@angular/forms';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public userService: UserService) {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email, ]);
  pass;
  repass;
  showPassErr;
  email;
  titles = ['Avukat', 'Doktor', 'Mühendis', 'Öğrenci'];
  submitted = false;
  genders = ['Kadın', 'Erkek'];
  gender;
  available;

  newUser(form: NgForm) {
    console.log(form.value.userName);
    console.log(form.value.pass);
    console.log(this.emailFormControl.value);
    console.log(form.value.tel);
    console.log(form.value.title);
    console.log(form.value.gender);
    if (form.invalid) {
      return;
    }
    this.userService.addUser(form.value.userName,
      form.value.pass, this.emailFormControl.value, form.value.tel,
      form.value.title, form.value.gender);
     form.resetForm();
     // this.emailFormControl.clearValidators();
  }

  comparePass(event: any) {
    if (this.pass === this.repass) {
      this.showPassErr = true;
      console.log(this.showPassErr);
    } else {
      this.showPassErr = false;
      console.log(this.showPassErr);
    }
  }





onSubmit() { this.submitted = true; }

loginControl() {
  this.submitted = true;
}


ngOnInit() {
}

}
