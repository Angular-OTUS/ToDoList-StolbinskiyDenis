import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef)
  private service = inject(ToDoListService)
  private serviceToasts = inject(ToastService)
  newTaskName = '';
  newTaskDescription = '';
  isLoading = true;
  selectedItemId: number | null = null;
  tasks: Task[] = [];

  ngOnInit(): void {
    this.serviceToasts.showToast("Загружаемся")
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 500);
    this.tasks = this.service.getAll()
  }

  selectItem(taskId: number): void {
    this.serviceToasts.showToast("Выбрали дело " + taskId)
    this.selectedItemId = taskId;
  }

  toggleItem(taskId: number) {
    if (this.selectedItemId === taskId) {
      this.selectedItemId = null;
    } else {
      this.selectItem(taskId);
    }
  }

  getTaskDescription() {
    return this.tasks.find(task => task.id === this.selectedItemId)?.description;
  }

  removeTask(id: number) {
    this.service.removeTask(id)
    this.serviceToasts.showToast("Удалили " + id)
  }

  addTask(name: string, description: string) {
    this.service.addTask(name, description)
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.serviceToasts.showToast("Добавили новое дело")
  }

  updateTaskTitle(newTitle: string) {
    this.service.updateTask(this.selectedItemId, newTitle);
    this.serviceToasts.showToast("Обноаили дело")
  }

}
