import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'categories', component: CategoriesComponent },
  // outras rotas aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
