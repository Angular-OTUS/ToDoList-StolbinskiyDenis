import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../interfaces/task.intarface';


@Component({
  selector: 'app-to-do-list-item-component',
  imports: [],
  templateUrl: './to-do-list-item-component.html',
  standalone: true,
  styleUrl: './to-do-list-item-component.scss'
})
export class ToDoListItemComponent {
  @Input({ required: true }) task!: Task;
  @Output() onDelete = new EventEmitter<number>();
}
