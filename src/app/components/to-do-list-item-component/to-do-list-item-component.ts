import {Component, input, output} from '@angular/core';
import {Task} from '../../interfaces/task.intarface';
import {Button} from '../button/button';
import {TooltipDirective} from '../../shared/directives/tooltip';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-to-do-list-item-component',
  imports: [
    Button,
    TooltipDirective,
    FormsModule,
  ],
  templateUrl: './to-do-list-item-component.html',
  standalone: true,
  styleUrl: './to-do-list-item-component.scss',
})
export class ToDoListItemComponent {
  task = input.required<Task>();
  selectedItemId = input<number | null>(null);
  buttonDelete = output<number>();
  itemSelected = output<number | null>();
  updateTaskEvent = output<string>();

  isEdit = false;

  isSelected(): boolean {
    return this.selectedItemId() === this.task().id;
  }

  editTask(): void {
    this.isEdit = true;
    this.itemSelected.emit(this.task().id);
  }

  updateTask(newTitle: string) {
    this.updateTaskEvent.emit(newTitle);
    this.cancelEdit();
  }

  cancelEdit() {
    this.isEdit = false;
    this.itemSelected.emit(null);
  }
}
