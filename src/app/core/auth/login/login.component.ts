import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';
import * as storageNames from 'src/app/shared/entitys/storageNames';
import { LoginResponse } from 'src/app/shared/interfaces/auth/loginResponse';
import { Store } from '@ngrx/store';
import { Reducers, actions } from 'src/app/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;
  public validationMessage: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private storageService: StorageService,
              public store: Store<Reducers>) { }

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
    this.authForm.value.email = this.authForm.value.email.trim();
    this.authService.postLogIn(this.authForm.value).pipe(take(1)).subscribe(
      (res: LoginResponse) => {
        this.storageService.setItem(storageNames.authenticationToken, res.token);
        this.authForm.reset();
        this.authService.signIn(res.token);
        this.store.dispatch(actions.profileAction.loadOwnerProfile({userProfile: res.userProfile, friends: res.friends}));
      },
      err => {
        this.authForm.patchValue({
          password: '',
          confirmedPassword: ''
        });
        this.validationMessage = err.error;
        if (err.status === 0) {
          this.router.navigateByUrl('/error');
        }
      }
    );
  }

}
