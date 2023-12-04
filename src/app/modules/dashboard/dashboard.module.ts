import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { SidebarModule } from 'primeng/sidebar'
import { ToolbarModule } from 'primeng/toolbar'
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService, CookieService]
})
export class DashboardModule { }
