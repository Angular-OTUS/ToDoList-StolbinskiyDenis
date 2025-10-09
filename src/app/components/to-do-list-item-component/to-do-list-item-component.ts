import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../interfaces/task.intarface';
import {Button} from '../button/button';
import {TooltipDirective} from '../../shared/directives/tooltip';


@Component({
  selector: 'app-to-do-list-item-component',
  imports: [
    Button,
    TooltipDirective,
  ],
  templateUrl: './to-do-list-item-component.html',
  standalone: true,
  styleUrl: './to-do-list-item-component.scss',
})
export class ToDoListItemComponent {
  @Input({ required: true }) task!: Task;
  @Input() selectedItemId: number | null = null;

  @Output() buttonDelete = new EventEmitter<number>();
  @Output() itemSelected = new EventEmitter<number>();

  isSelected(): boolean {
    return this.selectedItemId === this.task.id;
  }
}
