import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {EmailService} from './email.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-email-confirm',
  templateUrl: './email-confirm.component.html',
  styleUrls: ['./email-confirm.component.css']
})
export class EmailConfirmComponent implements OnInit {

  constructor(private httpService: EmailService, private route: ActivatedRoute) { }

  ngOnInit() {

    const confirmToken: Token = ({
      confirmToken: this.route.snapshot.paramMap.get('token')
    });

    this.httpService.confirmMail(confirmToken).subscribe( (res: any) => {
      console.log(confirmToken);
    });
  }


}
export interface Token {
  confirmToken?: string;
}

