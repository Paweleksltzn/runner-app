import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastGeneratorService } from 'src/app/shared/services/toast-generator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss'],
})
export class PassResetComponent implements OnInit {
  public passResetForm: FormGroup;
  public validationMessage = '';
  public messageClass = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastGeneratorService: ToastGeneratorService) { }

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
    this.authService.changePassword(resetEmail).subscribe(
      (res: string) => this.toastGeneratorService.presentToast(res, 'success'),
      err => this.toastGeneratorService.presentToast(err.error, 'success')
      );    
  }
 
}
