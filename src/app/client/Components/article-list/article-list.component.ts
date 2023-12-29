import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  coursList?: Cours[];
  constructor(private toastr: ToastrService,private coursService: CoursService) { }

  ngOnInit(): void {
    this.getCours()
  }
  getCours(): void {
    this.coursService.getAllCours().subscribe((cours) => {
      this.coursList = cours;
    });
  }
}
