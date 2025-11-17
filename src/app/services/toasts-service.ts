import {Injectable, signal} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts = signal<string[]>([]);
  readonly toastsList = this.toasts.asReadonly();

  showToast(message: string): void {
    this.toasts.update(current => [...current, message]);

    setTimeout(() => {
      this.removeToast(message);
    }, 3000);
  }

  private removeToast(message: string): void {
    this.toasts.update(current => current.filter(msg => msg !== message));
  }
}
