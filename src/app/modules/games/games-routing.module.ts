import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ErrorPageComponent} from "../../pages/error-page/error-page.component";
import {LotteryPageComponent} from "./pages/lottery-page/lottery-page.component";

const routes: Routes = [
  { path: 'lottery', component: LotteryPageComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
