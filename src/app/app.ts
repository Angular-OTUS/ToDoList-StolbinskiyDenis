import { Component, signal } from '@angular/core';
import {ToDoList} from './components/to-do-list/to-do-list';
import {Toasts} from './components/toasts/toasts';

@Component({
  selector: 'app-root',
  imports: [ToDoList, Toasts],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ToDoList-StolbinskiyDenis');
}
