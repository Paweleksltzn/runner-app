import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  public backButtonVisible = false;
  @Input()
  public title = '';
  @Input()
  public additionalTemplate: TemplateRef<any>;
  @Input()
  public titlEditable = false;
  @Input()
  public isProfileTab = false;
  @Output()
  public titleChanged = new EventEmitter();
  constructor(public router: Router) { }

  ngOnInit() {}

  public titleChange() {
    this.titleChanged.emit(this.title);
  }

}
