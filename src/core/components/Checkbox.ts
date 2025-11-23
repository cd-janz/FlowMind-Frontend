import {Component, EventEmitter, Input, output, Output, signal} from '@angular/core';

@Component({
  selector: "fm-checkbox",
  template: `
    <div (click)="change()">
      <div class="check {{checked() && 'fill'}}"></div>
      <span>{{label}}</span>
    </div>
  `,
  styles: [
    "div{display: flex; align-items: center; gap: 5px; text-transform: capitalize; user-select: none;cursor: pointer}",
    `
      .check{
        width: 10px;
        height: 10px;
        border: 1px solid rgb(var(--primary-disabled));
        background: rgba(var(--primary-disabled), 0.6);
        border-radius: 4px;
        &.fill{
          border: 1px solid rgb(var(--primary-focus));
          background: rgb(var(--primary-active));
        }
      }
    `,
  ]
})
export default class CheckboxComponent {
  @Input() label: string = "";
  @Input() defaultStatus: boolean = false;
  @Output() hasChange = new EventEmitter<boolean>();
  checked = signal(this.defaultStatus);
  change(){
    this.checked.set(!this.checked());
    this.hasChange.emit(!this.checked());
  }
}
