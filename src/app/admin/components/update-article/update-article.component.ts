import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoursSelectedService } from 'src/app/service/admin/cours-selected.service';
import { PopupService } from 'src/app/service/admin/popup.service';
import { CoursService } from 'src/app/service/cours.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  isOpenUp = false;
  articleForm! : FormGroup;
  coursId: number | null = null;
  constructor(private coursSelectionService: CoursSelectedService,private toastr: ToastrService,private fb :FormBuilder,private popupService: PopupService,private coursService: CoursService) { }

  ngOnInit() {
    this.popupService.ischange.subscribe((isOpen: boolean) => {
      this.isOpenUp = isOpen;
    });
    this.articleForm = this.fb.group({
      title: [''],
      price: [''],
      image: [''],
    });
    this.coursSelectionService.getSelectedCoursId().subscribe((coursId) => {
      this.coursId = coursId;
    });

  }

  closePopup() {
    this.popupService.closePopup();
  }

  

  isAnyFieldDirty() {
    return Object.keys(this.articleForm.controls).some(key => this.articleForm.get(key)?.dirty);
  }
 
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.articleForm.patchValue({ image: file });
  }
  onSubmit() {
    console.log("hhhhhhhhhh"+this.coursId)
    if (this.coursId != null) {
      const updatedCours = this.articleForm.value;
      const coursPhoto: File = this.getFileFromInputElement();
  
      // Update cours details
      this.coursService.updateCoursById(this.coursId, updatedCours).subscribe(
        (updatedCoursResponse) => {
          console.log('Cours updated successfully:', updatedCoursResponse);
          this.toastr.success('Cours updated successfully.');
  
          // Update cours photo
          this.coursService.uploadPhotos(this.coursId!, coursPhoto, 'SomeTitle').subscribe(
            (photoUploadResponse) => {
              console.log('Photo upload response:', photoUploadResponse);
              this.toastr.success('Photo uploaded successfully.');
              this.closePopup();
            },
            (photoUploadError) => {
              console.error('Error uploading photo:', photoUploadError);
              this.toastr.error('Failed to upload photo. Please try again.');
            }
          );
        },
        (updateError) => {
          console.error('Error updating Cours:', updateError);
          this.toastr.error('Failed to update Cours. Please try again.');
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
