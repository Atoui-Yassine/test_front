import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/models/cours';
import { CoursSelectedService } from 'src/app/service/admin/cours-selected.service';
import { PopupService } from 'src/app/service/admin/popup.service';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  coursList?: Cours[];
  
  constructor(private coursSelectionService: CoursSelectedService,private toastr: ToastrService,private popupService: PopupService,private coursService: CoursService) { }
  
  
  onCoursClick(coursId: number): void {
    this.coursSelectionService.setSelectedCoursId(coursId);
  }
 

  ngOnInit() {
    this.getCours()
  }
  
  openPopup() {
    this.popupService.openPopup();
  }
  openPopupUp(id:number) {
    this.popupService.openPopupUp();
    this.onCoursClick(id)
  }
  getCours(): void {
    this.coursService.getAllCours().subscribe((cours) => {
      this.coursList = cours;
    });
  }
  deleteCours(courseId: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this course?');
  
    if (confirmed) {
      this.coursService.deleteCoursById(courseId).subscribe(
        (response) => {
          console.log('Cours deleted successfully:', response);
          this.toastr.success('Cours deleted successfully.');
        },
        (error) => {
          console.error('Error deleting Cours:', error);
          this.toastr.error('Failed to delete Cours. Please try again.');
        }
      );
    }
  }
}
