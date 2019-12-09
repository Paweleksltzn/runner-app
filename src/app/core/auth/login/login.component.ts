import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public authForm: FormGroup;
  public validationMessage: string;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private storageService: StorageService) { }

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
      (token: string) => {
        this.storageService.setObject('credentials', { email: this.authForm.value.email, password: this.authForm.value.password });
        this.authForm.reset();
        this.authService.signIn(token);
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
