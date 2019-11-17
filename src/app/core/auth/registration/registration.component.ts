import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public isMale: boolean;
  public authForm: FormGroup;
  public validationMessage = '';
  public messageClass = '';

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
    const userData = {
      ...this.authForm.value,
      isMale: this.isMale
    };
    this.authService.postSignUp(userData).subscribe(
      (res: string) => {
        this.validationMessage = res;
        this.messageClass = 'valid-response';
        this.authForm.reset();
      },
      err => {
        this.authForm.patchValue({
          password: '',
          confirmedPassword: ''
        });
        this.validationMessage = err.error;
        this.messageClass = 'invalid-response';
        if (err.status === 0){
          this.router.navigateByUrl('/error');
        }
      }
    );
  }

}
