import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp, ISignUp } from '../../models/signup.model';
import { AuthenticationService } from './../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm(new SignUp());
  }

  createForm(signup: ISignUp) {
    this.registerForm = this.formBuilder.group({
      name: [signup.name, Validators.required],
      username: [signup.username, Validators.required],
      email: [signup.email, Validators.required],
      password: [signup.password, Validators.required]
    })
  }
  onSubmit() {
    console.log('form:', this.registerForm.value);
    this.authenticationService.signup(this.registerForm.value).subscribe();
    this.router.navigateByUrl('login')
  }

}
