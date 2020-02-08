import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {EmailService} from './email.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {
  public confirmToken: string;
  constructor(private emailService: EmailService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

      this.confirmToken = this.activatedRoute.snapshot.paramMap.get('token');

      this.emailService.confirmMail(this.confirmToken).subscribe( (res: string) => {

    },
    err =>{
      if (err.status === 0){
        this.router.navigateByUrl('/error');
      } else {
        this.router.navigateByUrl('/error');
        console.log("XD");
      }
    });
  }


}
