import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-statement',
  templateUrl: './error-statement.component.html',
  styleUrls: ['./error-statement.component.scss'],
})
export class ErrorStatementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  public goBackToLogin(){
    this.router.navigate(['login']);
  }

}
