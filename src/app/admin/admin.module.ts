import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { AddArticleComponent } from './components/add-article/add-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../service/admin/popup.service';



@NgModule({
  declarations: [
    DashboardComponent,
    ArticleListComponent,
    AddArticleComponent,
    UpdateArticleComponent
  ],
  providers: [PopupService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
