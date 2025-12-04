import { Component, inject, signal, effect } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('detailAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px) scale(.995)' }),
        animate('360ms cubic-bezier(.2,.9,.3,1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [animate('220ms ease-in', style({ opacity: 0, transform: 'translateY(6px)' }))])
    ])
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class HeroDetailComponent {
  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private router = inject(Router);

  hero = signal<any | null>(null);
  // effect: subscribe to route.paramMap and fetch hero when id changes
  fetchEffect = effect((onCleanup) => {
    let innerSub: any = null;
    const sub = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
      }
      if (id) {
        innerSub = this.heroService.getHeroById(id).subscribe({
          next: (h: any) => this.hero.set(h),
          error: (e: any) => console.error(e)
        });
      } else {
        this.hero.set(null);
      }
    });
    onCleanup(() => {
      sub.unsubscribe();
      if (innerSub) innerSub.unsubscribe();
    });
  });

  goBack() {
    this.router.navigate(['/heroes']);
  }

  // Labels en español para mostrar en la UI
  private powerstatLabels: Record<string, string> = {
    intelligence: 'Inteligencia',
    strength: 'Fuerza',
    speed: 'Velocidad',
    durability: 'Durabilidad',
    power: 'Poder',
    combat: 'Combate'
  };

  private appearanceLabels: Record<string, string> = {
    gender: 'Género',
    race: 'Raza',
    height: 'Altura',
    weight: 'Peso',
    eyeColor: 'Color de ojos',
    hairColor: 'Color de cabello'
  };

  get powerstatsEntries() {
    const h = this.hero();
    if (!h?.powerstats) return [] as { label: string; value: any }[];
    return Object.entries(h.powerstats).map(([k, v]) => ({
      key: k,
      label: this.powerstatLabels[k] ?? k,
      value: v
    }));
  }

  get appearanceEntries() {
    const h = this.hero();
    if (!h?.appearance) return [] as { label: string; value: any }[];
    return Object.entries(h.appearance).map(([k, v]) => ({
      key: k,
      label: this.appearanceLabels[k] ?? k,
      value: v
    }));
  }

  get biographyEntries() {
    const h = this.hero();
    if (!h?.biography) return [] as { label: string; value: any }[];
    const b = h.biography;
    const entries = [
      { label: 'Nombre completo', value: b.fullName || h.name || '' },
      { label: 'Alter egos', value: b.alterEgos },
      { label: 'Lugar de nacimiento', value: b.placeOfBirth },
      { label: 'Primera aparición', value: b.firstAppearance },
      { label: 'Editorial', value: b.publisher },
      { label: 'Alineamiento', value: b.alignment }
    ];
    return entries.filter(e => e.value !== null && e.value !== undefined && e.value !== '');
  }

  // Convierte un valor en número 0-100 para las barras de poder
  toNumber(v: any): number {
    const n = Number(String(v).replace(/[^0-9.-]+/g, ''));
    if (isNaN(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }
}
