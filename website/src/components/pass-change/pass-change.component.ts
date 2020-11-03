import { Component, OnInit } from '@angular/core';
import { PasswordService } from './password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl , Validators , FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit {
  public passForm: FormGroup;
  public isFormValid: boolean;
  public tokenString;
  public errorMessage = '';
  public successMessage = '';

  constructor(
    private passwordService: PasswordService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.tokenString = this.activatedRoute.snapshot.paramMap.get('token_pass');
  }

  public onSubmit() {
    const password: PasswordResetData = {
      password: this.passForm.value.pass,
      confirmPassword: this.passForm.value.passChk,
      token: this.tokenString
    };
    this.isFormValid = this.passForm.valid;
    this.errorMessage = '';
    if (this.isFormValid && this.passForm.value.pass === this.passForm.value.passChk ) {
      this.passwordService.changedPassword(password).subscribe((res: any) => {
        this.errorMessage = '';
        this.successMessage = 'Hasło zmienione pomyślnie';
      },
      err => {
        this.errorMessage = 'Nie udało się zmienić hasła, spróbój ponownie później';
        if (err.status === 0) {
          this.router.navigateByUrl('/error');
        }
      });
    } else if (this.passForm.value.pass !== this.passForm.value.passChk){
        this.errorMessage = 'Wpisane hasła muszą być takie same';
    } else {
        this.errorMessage = 'Hasło musi zawierać co najmniej 8 znaków w tym minimum: 1 duża literę, 1 małą literę, 1 cyfrę, 1 znak specjalny';
    }
  }

  public createForm() {
    this.passForm = this.fb.group({
       pass: ['', [Validators.required, Validators.pattern('^(?=.*?[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*?[a-ząćęłńóśźż])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
       passChk: ['', [Validators.required, Validators.pattern('^(?=.*?[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*?[a-ząćęłńóśźż])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    });
  }
  }
export interface PasswordResetData {
    password: string;
    confirmPassword: string;
    token: string;
  }
