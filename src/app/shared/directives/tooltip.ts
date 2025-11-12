import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipText: string = '';

  private tooltipElement: HTMLElement | null = null;

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltipText) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  @HostListener('click')
  onClick(): void {
    this.hideTooltip();
  }

  @HostListener('blur')
  onBlur(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    this.tooltipElement = document.createElement('div');
    this.tooltipElement.className = 'app-tooltip';
    this.tooltipElement.textContent = this.tooltipText;
    document.body.appendChild(this.tooltipElement);

    this.positionTooltip();
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    // Просто позиционируем сверху по центру
    let top = hostRect.top + window.scrollY - tooltipRect.height - 8;
    let left = hostRect.left + window.scrollX + (hostRect.width - tooltipRect.width) / 2;

    // Базовая коррекция границ
    if (top < 8) top = 8;
    if (left < 8) left = 8;

    this.tooltipElement.style.top = `${top}px`;
    this.tooltipElement.style.left = `${left}px`;
  }

  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.tooltipElement.remove();
      this.tooltipElement = null;
    }
  }
}
