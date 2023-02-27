import { UploadFileService } from './../../services/upload-file.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFiles: FileList | undefined ;
  currentFile!: File | undefined | null ;
  progress = 0;
  message = '';

  columnsHeader!: Observable<any>;

  constructor(private uploadService: UploadFileService){}
// select a csv file
  selectFile(event: any){
    this.selectedFiles = event.target.files;
  }

  // Upload a csv file 
  upload(){
    this.progress = 0;
    this.currentFile = this.selectedFiles?.item(0);
    if(this.currentFile){
      this.uploadService.upload(this.currentFile).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded )/ ( event.total ?? 100 ));
          } else if(event instanceof HttpResponse){
            this.message = event.body.message;
            this.columnsHeader= this.uploadService.getColumnsHeader();
          }
        },
        err => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
      );
    }
    

    this.selectedFiles = undefined;
  }

  ngOnInit() {
    this.columnsHeader = this.uploadService.getColumnsHeader();
  }

}
