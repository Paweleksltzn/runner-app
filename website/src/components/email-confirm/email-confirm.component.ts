import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {EmailService} from './email.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {
  public confirmToken: string;
  constructor(private httpService: EmailService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

      this.confirmToken = this.activatedRoute.snapshot.paramMap.get('token');

      this.httpService.confirmMail(this.confirmToken).subscribe( (res: string) => {

    });
  }


}
