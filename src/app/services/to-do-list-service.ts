import {Injectable, signal} from '@angular/core';
import {Task} from '../interfaces/task.intarface';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

  tasks = signal<Task[]>([
    {id: 1, name: 'Изучить Angular', description: 'Не знаю что писать'},
    {id: 2, name: 'Освоить Bootstrap', description: 'Здесь тоже не знаю какое описание добавить'},
    {id: 3, name: 'Создать приложение', description: 'Здесь тоже не придумал'},
  ]);

  getAll(): Task[] {
    return this.tasks();
  }

  removeTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  addTask(name: string, description: string) {
    name = name.trim();
    if (name) {
      this.tasks().push({
        id: this.getMaxId(),
        name: name,
        description: description,
      });
    }
  }

  //todo такую логику конечно бы на уровень бэка и бд
  updateTask(id: number | null, newTitle: string) {
    const taskss = this.getAll();
    const taskIndex = taskss.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return
    }
    const task = taskss[taskIndex];
    if (task) {
      task.name = newTitle
    }
    this.tasks()[taskIndex] = task;
  }

  getMaxId(): number {
    if (this.tasks().length === 0) {
      return 1;
    }
    return Math.max(...this.tasks().map(task => task.id)) + 1;
  }
}
