import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';
import { ISignIn, SignIn } from '../../models/signin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm(new SignIn());
  }

  createForm(signup: ISignIn) {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: [signup.usernameOrEmail, Validators.required],
      password: [signup.password, Validators.required]
    })
  }
  onSubmit() {
    console.log('form:', this.loginForm.value);

    this.authenticationService.signin(this.loginForm.value).subscribe(data => {
      if (this.authenticationService.isAuthenticated())
        this.router.navigateByUrl('/')
    });

  }
}
