import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
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
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

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
      (res: string)=>{
        this.validationMessage = res;
        this.messageClass = 'valid-response';
      },
      err => {
        this.validationMessage = err.error;
        this.messageClass = 'invalid-response';
        if (err.status === 0) {
          this.router.navigateByUrl('/error');
        }
      }
      );    
  }
 
}
