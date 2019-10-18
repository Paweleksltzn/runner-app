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
  passForm: FormGroup;
  constructor(private httpService: PasswordService, private route: ActivatedRoute, private passFb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    const hs: Password = ({
      password: this.newPassword,
      confirmPassword: this.newPasswordCheck,
      token: this.route.snapshot.paramMap.get('token_pass')
    });

    if (this.passForm.invalid) {
      this.alertDiv = '<p>Hasło musi zawierać conajmniej 8 znaków</p>';
    } else {
      this.alertDiv = '';
      this.httpService.changedPassword(hs).subscribe((res: any) => {
        console.log(this.newPassword);
      });
    }
  }

  changePass(event: any) {
    this.newPassword = (event.target as HTMLInputElement).value;
    console.log(this.newPassword);
  }

  changePassCheck(eventCheck: any) {
    this.newPasswordCheck = (eventCheck.target as HTMLInputElement).value;
    console.log(this.newPasswordCheck);
  }

  createForm() {
    this.passForm = this.passFb.group({
       pass: ['', [Validators.required, Validators.minLength(8)]],
       passChk: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  }
export interface Password {
    password: string;
    confirmPassword: string;
    token: string;
  }
