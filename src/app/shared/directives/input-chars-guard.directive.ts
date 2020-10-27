import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInputCharsGuard]'
})
export class InputCharsGuardDirective {
  @Input() charFilterType: string | 'letterChar';

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.charFilterType === 'letterChar') {
      this.validateCharForLetter(event);
    }
  }

  validateCharForLetter(event: KeyboardEvent) {
    if (!event.key.match(/[a-zA-ZĄąĆćĘęŁłŃńÓóŚśŹźŻż]/)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

}
