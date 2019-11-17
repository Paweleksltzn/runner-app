import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;
  public validationMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    this.authService.postLogIn(this.authForm.value).pipe(take(1)).subscribe(
      (token: string) => {
        this.nativeStorage.setItem('credentials', { email: this.authForm.value.email, password: this.authForm.value.password })
        .then(
          () => {}
        );
        this.authForm.reset();
        this.authService.signIn(token);
      },
      err => {
        this.authForm.patchValue({
          password: '',
          confirmedPassword: ''
        });
        this.validationMessage = err.error;
      }
    );
  }

}
