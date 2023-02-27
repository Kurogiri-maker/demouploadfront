import { Component } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {

  form !: FormGroup;

  constructor(private fb : FormBuilder ,private uploadService: UploadFileService ){}
  
  generateFormModel(columnHeaders: String){
    const formModel : myObject = {};
    for (const header of columnHeaders) {
      formModel[header] = this.fb.control('');
    }
    this.form = this.fb.group(formModel);
  }
}
  

  interface myObject{
    [key: string]:any;
  }

