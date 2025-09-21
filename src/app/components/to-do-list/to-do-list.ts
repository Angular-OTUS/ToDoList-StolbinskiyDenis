import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToDoListItemComponent} from '../to-do-list-item-component/to-do-list-item-component';
import {Task} from '../../interfaces/task.intarface';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatFormFieldModule,
    MatInput
  ],
  templateUrl: './to-do-list.html',
  standalone: true,
  styleUrl: './to-do-list.scss'
})
export class ToDoList {
  newTaskName = '';

  tasks = signal<Task[]>([
    {id: 1, name: 'Изучить Angular'},
    {id: 2, name: 'Освоить Bootstrap'},
    {id: 3, name: 'Создать приложение'}
  ]);

  removeTask(id: number) {
    this.tasks.update(currentTasks =>
      currentTasks.filter(task => task.id !== id)
    );
  }

  addTask(name: string) {
    if (name.trim()) {
      this.tasks.update(current => [
        ...current,
        { id: this.getMaxId(), name: name.trim() }
      ]);
      this.newTaskName = '';
    }
  }

  getMaxId(): number {
    const currentTasks = this.tasks();
    if (currentTasks.length === 0)
      return 1;

    return Math.max(...currentTasks.map(task => task.id)) + 1;
  }
}
