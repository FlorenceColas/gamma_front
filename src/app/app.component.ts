import { Component, ViewChild, ElementRef } from '@angular/core';

import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private VALID_EXTENSION = ['xls', 'xlsx'];
  public file!: File | null;
  public result: Array<string> = [];
  public over: boolean = false;

  @ViewChild('fileInput', { static: false }) inputRef!: ElementRef;
  fileUpload: any;
    
  constructor(private uploadService: UploadService) {}

  openFile() {
    this.inputRef.nativeElement.click();
  }
 
  onFileSelected($event: Event) {
    const element = $event.currentTarget as HTMLInputElement;
    
    let files: FileList | null = element.files;

    if (files != null) {
      this.file = files[0];
      this.result = [];
    }
  }

  dropFile($event: DragEvent) {
    if ($event.dataTransfer) {
      this.file = null;
      this.result = [];

      const files = $event.dataTransfer.files;

      if (files.length > 1) {
        this.result = ['failed', 'Vous ne pouvez importer qu\'un seul fichier à la fois.'];
        return;
      }

      let fileExtension: string = files[0].name.substring(files[0].name.lastIndexOf('.') + 1);
      if (this.VALID_EXTENSION.includes(fileExtension)) {
        this.file = files[0];
      } else {
        this.result = ['failed', 'L\'extension ' + fileExtension + ' n\'est pas autorisée.'];
      }
    }
  }

  upload() {
    if (this.file == null) {
      return;
    }

    let formData = new FormData(); 
    formData.append('uploadFile', this.file, this.file.name); 
    this.uploadService.uploadGroups(formData).subscribe({
      next: data => {
        this.result = ['success', 'Nombre de lignes importées: ' + data.number_of_groups_imported];
      },
      error: error => {
        this.result = ['failed', error.error.error_msg];
      }
    });
  }
}
