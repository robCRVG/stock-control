import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';



@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToolbarModule,
    CardModule,
    ButtonModule
  ],
  exports: [ToolbarNavigationComponent],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
