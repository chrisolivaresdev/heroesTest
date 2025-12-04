import { Component, inject, signal, effect } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('.hero-card', [
          style({ opacity: 0, transform: 'translateY(12px) scale(.98)' }),
          stagger(80, [animate('420ms cubic-bezier(.2,.9,.3,1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))])
        ], { optional: true })
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(6px) scale(.98)' }), animate('420ms cubic-bezier(.2,.9,.3,1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))])
    ]),
    trigger('routeFade', [
      transition(':enter', [style({ opacity: 0 }), animate('220ms ease-out', style({ opacity: 1 }))]),
      transition(':leave', [animate('180ms ease-in', style({ opacity: 0 }))])
    ])
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class HeroesListComponent {
  private heroService = inject(HeroService);
  size = signal(10);
  heroes = signal<any[]>([]);
  page = signal(1);
  lastPage = signal<number | null>(null);

  fetchEffect = effect((onCleanup) => {
    const p = this.page();
    const s = this.size();
    const sub = this.heroService.getHeroes(p, s).subscribe({
      next: (res: any) => {
        this.heroes.set(res.items || []);
        this.lastPage.set(res.lastPage ?? null);
      },
      error: (err: any) => console.error(err)
    });
    onCleanup(() => sub.unsubscribe());
  });

  prev() {
    if (this.page() > 1) {
      this.page.update((v) => v - 1);
    }
  }

  next() {
    const lp = this.lastPage();
    if (lp === null || this.page() < lp) {
      this.page.update((v) => v + 1);
    }
  }

  changeSize(s: string) {
    this.size.set(Number(s) || 10);
    this.page.set(1);
  }

  get isPrevDisabled(): boolean {
    return this.page() <= 1;
  }

  get isNextDisabled(): boolean {
    const lp = this.lastPage();
    return lp !== null ? this.page() >= lp : false;
  }

}
