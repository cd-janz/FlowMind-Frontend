import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: "fm-session-button",
  template: `
    <button type="button" (click)="onClick.emit()" class="special-title">
      {{label}}
    </button>
  `,
  styleUrl: "../styles/session_button.scss",
})
export default class SessionButtonComponent{
  @Input() label: string = "click here";
  @Output() onClick = new EventEmitter();
}
