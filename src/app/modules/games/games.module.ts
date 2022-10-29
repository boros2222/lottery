import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GamesRoutingModule} from './games-routing.module';
import {LotteryPageComponent} from './pages/lottery-page/lottery-page.component';
import {LotteryInputComponent} from './components/lottery-input/lottery-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { NumbersToTextPipe } from './pipes/numbers-to-text.pipe';


@NgModule({
  declarations: [
    LotteryPageComponent,
    LotteryInputComponent,
    NumbersToTextPipe
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class GamesModule { }
