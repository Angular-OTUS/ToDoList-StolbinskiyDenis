import {Injectable} from '@angular/core';
import {Task} from '../interfaces/task.intarface';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {

  tasks: Task[] = [
    {id: 1, name: 'Изучить Angular', description: 'Не знаю что писать'},
    {id: 2, name: 'Освоить Bootstrap', description: 'Здесь тоже не знаю какое описание добавить'},
    {id: 3, name: 'Создать приложение', description: 'Здесь тоже не придумал'},
  ];


  getAll(): Task[] {
    return this.tasks;
  }

  removeTask(id: number) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id == id) {
        this.tasks.splice(i, 1);
      }
    }
  }

  addTask(name: string, description: string) {
    if (name.trim()) {
      this.tasks.push({
        id: this.getMaxId(),
        name: name.trim(),
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
    this.tasks[taskIndex] = task;
  }

  getMaxId(): number {
    if (this.tasks.length === 0) {
      return 1;
    }
    return Math.max(...this.tasks.map(task => task.id)) + 1;
  }
}
