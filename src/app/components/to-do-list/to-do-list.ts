import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ToDoListItemComponent} from '../to-do-list-item-component/to-do-list-item-component';
import {Task} from '../../interfaces/task.intarface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {Button} from '../button/button';
import {Loader} from '../loader/loader';
import {TooltipDirective} from '../../shared/directives/tooltip';

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
  newTaskDescription = '';
  isLoading = true;
  selectedItemId: number | null = null;


  tasks = signal<Task[]>([
    {id: 1, name: 'Изучить Angular', description: 'Не знаю что писать'},
    {id: 2, name: 'Освоить Bootstrap', description: 'Здесь тоже не знаю какое описание добавить'},
    {id: 3, name: 'Создать приложение', description: 'Здесь тоже не придумал'},
  ]);

  removeTask(id: number) {
    this.tasks.update(currentTasks =>
      currentTasks.filter(task => task.id !== id),
    );
  }

  addTask(name: string, description: string) {
    if (name.trim()) {
      this.tasks.update(current => [
        ...current,
        {
          id: this.getMaxId(),
          name: name.trim(),
          description: description
        },
      ]);
      this.newTaskName = '';
      this.newTaskDescription = '';
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

  selectItem(taskId: number): void {
    this.selectedItemId = taskId;
    console.log("выбран элемент " + taskId)
  }

  toggleItem(taskId: number) {
    if (this.selectedItemId === taskId) {
      this.selectedItemId = null;
    }  else {
      this.selectItem(taskId);
    }
  }

  getTaskDescription() {
    return this.tasks().find(task => task.id === this.selectedItemId)?.description;
  }
}
