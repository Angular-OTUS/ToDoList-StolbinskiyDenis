import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToDoListItemComponent} from '../to-do-list-item-component/to-do-list-item-component';
import {Task} from '../../interfaces/task.intarface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Button} from '../button/button';
import {Loader} from '../loader/loader';
import {ToDoListService} from '../../services/to-do-list-service';
import {ToastService} from '../../services/toasts-service';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatFormFieldModule,
    MatInput,
    Button,
    Loader,
  ],
  templateUrl: './to-do-list.html',
  standalone: true,
  styleUrl: './to-do-list.scss',
})
export class ToDoList implements OnInit {
  private service = inject(ToDoListService)
  private serviceToasts = inject(ToastService)
  newTaskName = '';
  newTaskDescription = '';
  isLoading = signal(true);
  selectedItemId = signal<number | null>(null);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.serviceToasts.showToast("Загружаемся")
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
    this.tasks = this.service.getAll()
  }

  selectItem(taskId: number | null): void {
    this.serviceToasts.showToast("Выбрали дело " + taskId)
    this.selectedItemId.set(taskId);
  }

  toggleItem(taskId: number | null) {
    if (this.selectedItemId() === taskId) {
      this.selectedItemId.set(null);
    } else {
      this.selectItem(taskId);
    }
  }

  getTaskDescription() {
    return this.tasks.find(task => task.id === this.selectedItemId())?.description; // вызываем сигнал
  }

  removeTask(id: number) {
    this.service.removeTask(id)
    this.serviceToasts.showToast("Удалили " + id)
    this.tasks = this.service.getAll();
    if (this.selectedItemId() === id) {
      this.selectedItemId.set(null);
    }
  }

  addTask(name: string, description: string) {
    this.service.addTask(name, description)
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.serviceToasts.showToast("Добавили новое дело")
    this.tasks = this.service.getAll();
  }

  updateTaskTitle(newTitle: string) {
    const currentId = this.selectedItemId();
    if (currentId !== null) {
      this.service.updateTask(currentId, newTitle);
      this.serviceToasts.showToast("Обновили дело")
      this.tasks = this.service.getAll();
    }
  }
}
