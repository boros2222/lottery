import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {AppComponent} from "./app.component";
import {DefaultGuard} from "./guards/default.guard";
import {GamesAccessGuard} from "./modules/games/guards/games-access.guard";
import {LoginAccessGuard} from "./modules/authentication/guards/login-access.guard";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [DefaultGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [LoginAccessGuard]
  },
  {
    path: 'games',
    loadChildren: () => import('./modules/games/games.module').then(m => m.GamesModule),
    canActivate: [GamesAccessGuard]
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
