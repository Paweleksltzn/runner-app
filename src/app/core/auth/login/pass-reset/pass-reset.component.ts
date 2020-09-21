import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
})
export class PassResetComponent implements OnInit {
  public passResetForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.passResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit(){
    const resetEmail = this.passResetForm.value
    resetEmail.toString();
    this.authService.changePassword(resetEmail);
  }

}
