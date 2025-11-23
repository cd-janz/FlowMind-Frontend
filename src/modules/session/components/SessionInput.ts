import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: "fm-session-input",
  template: `
    <div class="input-container">
      <label>{{label}}</label>
      <input [type]="type" (input)="onInputChange($event)"/>
    </div>
  `,
  styleUrl: "../styles/session_input.scss",
  standalone: true,
})
export default class SessionInputComponent {
  @Input() type: "text" | "email" | "password" = "text";
  @Input() label: string = "";
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
