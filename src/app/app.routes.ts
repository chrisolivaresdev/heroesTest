import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes/list/list.component';
import { HeroDetailComponent } from './components/heroes/detail/detail.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'heroes', pathMatch: 'full' },
	{ path: 'heroes', component: HeroesListComponent },
	{ path: 'hero/:id', component: HeroDetailComponent },
	{ path: '**', redirectTo: 'heroes' }
];
