import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TooltipDirective} from '../../shared/directives/tooltip';

@Component({
  selector: 'app-button',
  imports: [TooltipDirective],
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
  class = '';
  @Input()
  hint = '';


  @Output()
  protected readonly buttonClick = new EventEmitter<void>();

  protected onClick() {
    this.buttonClick.emit();
  }
}
