import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToDoListItemComponent} from '../to-do-list-item-component/to-do-list-item-component';
import {Task} from '../../interfaces/task.intarface';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Button} from '../button/button';
import {Loader} from '../loader/loader';

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
  newTaskName = '';
  isLoading = true;

  tasks = signal<Task[]>([
    {id: 1, name: 'Изучить Angular'},
    {id: 2, name: 'Освоить Bootstrap'},
    {id: 3, name: 'Создать приложение'},
  ]);

  removeTask(id: number) {
    this.tasks.update(currentTasks =>
      currentTasks.filter(task => task.id !== id),
    );
  }

  addTask(name: string) {
    if (name.trim()) {
      this.tasks.update(current => [
        ...current,
        { id: this.getMaxId(), name: name.trim() },
      ]);
      this.newTaskName = '';
    }
  }

  getMaxId(): number {
    if (this.tasks().length === 0) {
      return 1;
    }
    return Math.max(...this.tasks().map(task => task.id)) + 1;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
