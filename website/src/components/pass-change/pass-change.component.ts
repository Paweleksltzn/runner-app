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
  public newPassword: string;
  public newPasswordCheck: string;
  public passForm: FormGroup;
  public isFormValid: boolean;
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
    this.isFormValid = this.passForm.valid;
    console.log(this.isFormValid);
    if (this.isFormValid && this.newPassword === this.newPasswordCheck ) {
      console.log("succes");
      this.passwordService.changedPassword(password).subscribe((res: any) => {
      });
    } else{
      console.log("not kurwa succes");
    }
  }

  public changePass() {
    this.newPassword = this.passForm.value.pass;
  }

  public changePassCheck() {
    this.newPasswordCheck = this.passForm.value.passChk;
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
