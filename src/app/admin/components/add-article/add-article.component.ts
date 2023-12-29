import { Component,  OnInit,  } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cours } from 'src/app/models/cours';
import { PopupService } from 'src/app/service/admin/popup.service';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  isOpen = false;
  articleForm! : FormGroup;
  constructor(private toastr: ToastrService,private fb :FormBuilder,private popupService: PopupService ,private coursService: CoursService) { }

  ngOnInit() {
    console.log('PopupComponent: ngOnInit called');
    this.popupService.isOpenChanged.subscribe((isOpen: boolean) => {
      this.isOpen = isOpen;
    });
    

    this.initAdd()
  }

  initAdd(){
    this.articleForm=this.fb.group({
      title:['',[Validators.required],],
      price: ['',Validators.required],
      image:['',Validators.required]
  })
  }

  closePopup() {
    this.popupService.closePopup();
    
  }
  

    
  onSubmit() {
    if (this.articleForm.valid) {
      const newCours: Cours = this.articleForm.value;

      this.coursService.createCours(newCours).subscribe(
        (createdCours) => {
          console.log('Cours created successfully:', createdCours);
          this.toastr.success('Add cours success ...');

          const courseId = createdCours.id ;

          const coursPhoto: File = this.getFileFromInputElement();

          const photoTitle = 'SomeTitle'; 
if(courseId != undefined){
  this.coursService.uploadPhotos(courseId, coursPhoto, photoTitle).subscribe(
    (response) => {
      console.log('Photo upload response:', response);
    },
    (error) => {
      console.error('Error uploading photo:', error);
      this.toastr.error('Failed to upload photo. Please try again.');
    }
  );

}
          
          this.closePopup();
        },
        (error) => {
          console.error('Error creating Cours:', error);
          this.toastr.error('Failed to create cours. Please try again.');
        }
      );
    } else {
      this.toastr.error('Le formulaire n\'est pas valide. Veuillez le vérifier.');
    }
  }

  private getFileFromInputElement(): File {
    const inputElement: HTMLInputElement | null = document.querySelector('#coursPhotoInput');
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      return inputElement.files[0];
    }
    throw new Error('File input not found or no file selected.');
  }
  
}
