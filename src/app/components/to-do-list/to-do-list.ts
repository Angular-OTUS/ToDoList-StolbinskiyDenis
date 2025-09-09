import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule
  ],
  templateUrl: './to-do-list.html',
  standalone: true,
  styleUrl: './to-do-list.scss'
})
export class ToDoList {
  newTaskName = '';

  tasks = signal([
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
        { id: Date.now(), name: name.trim() }
      ]);
      this.newTaskName = '';
    }
  }
}
