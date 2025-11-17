import {Component, inject} from '@angular/core';
import {ToastService} from '../../services/toasts-service';

@Component({
  selector: 'app-toasts',
  imports: [],
  templateUrl: './toasts.html',
  standalone: true,
  styleUrl: './toasts.scss',
})
export class Toasts {
  protected toastService = inject(ToastService)
}
