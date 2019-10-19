import { Component, OnInit } from '@angular/core';
import { PasswordService } from './password.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl , Validators , FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit {
  public alertDiv: any = '';
  public newPassword: string;
  public newPasswordCheck: string;
  public validationMessage: string;
  public passForm: FormGroup;
  constructor(private passwordService: PasswordService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  public onSubmit() {
    const password: PasswordResetData = ({
      password: this.newPassword,
      confirmPassword: this.newPasswordCheck,
      token: this.activatedRoute.snapshot.paramMap.get('token_pass')
    });

    if (this.passForm.invalid) {
      this.alertDiv = '<p>Hasło musi zawierać conajmniej 8 znaków</p>';
    } else {
      this.alertDiv = '';
      this.passwordService.changedPassword(password).subscribe((res: any) => {

      });
    }
  }

  public changePass(event: any) {
    this.newPassword = (event.target as HTMLInputElement).value;

  }

  public changePassCheck(eventCheck: any) {
    this.newPasswordCheck = (eventCheck.target as HTMLInputElement).value;
    console.log(this.newPasswordCheck);
  }

  public createForm() {
    this.passForm = this.fb.group({
       pass: ['', [Validators.required, Validators.minLength(8)]],
       passChk: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  }
export interface PasswordResetData {
    password: string;
    confirmPassword: string;
    token: string;
  }
