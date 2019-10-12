import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public isMale: boolean;
  public authForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmedPassword: ['', [Validators.required]]
    });
  }

  switchSex(sexState: boolean): void {
    this.isMale = sexState;
  }

  public onSubmit() {
      if (this.isMale ===  undefined && this.authForm.valid) {

      } else {
        const userData = {
          ...this.authForm.value,
          sex: this.isMale
        }
      }

      // this.authenticationService.postSignUp(userData).subscribe(
      //   res => {
      //     this.router.navigate(['confirmation', this.authForm.value.email]);
      //     this.validationError = '';
      //   },
      //   err => {
      //     this.authForm.patchValue({
      //       password: '',
      //       confirmPassword: '',
      //       email: ''
      //     });
      //     this.validationError = err.error;
      //   }
      // )
  }

}
