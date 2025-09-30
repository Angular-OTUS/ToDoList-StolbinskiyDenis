import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  standalone: true,
  styleUrl: './button.scss',
})
export class Button {
  @Input()
  title = '';
  @Input()
  public disabled = false;
  @Input()
  type: 'button' | 'submit' | 'reset' = 'button';
  @Input()
  class = ''


  @Output()
  protected readonly buttonClick = new EventEmitter<void>();

  protected onClick() {
    this.buttonClick.emit();
  }
}
