import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { NgxCsvParser, NgxCSVParserError } from "ngx-csv-parser";
import { UploadFileService } from "src/app/services/upload-file.service";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"]
})
export class UploadFileComponent {
  csvFilePath: any = "";
  records: string[][] = [];
  headers: string[] = [];
  header = false;
  selectedFiles: FileList | undefined ;
  currentFile!: File | undefined | null ;
  progress = 0;
  message = '';

  @ViewChild("fileImportInput", { static: false }) fileImportInput: any;
  columnsHeader: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {
    console.log("Fetching csv from file");
    // Select the files from the event
    const files = $event.srcElement.files;
    this.selectedFiles = files;
    this.upload();

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser
      .parse(files[0], { header: this.header, delimiter: "," })
      .pipe()
      .subscribe(
        (result: any) => {
          this.headers = result[0];
          this.records = result.slice(1);
        },
        (error: NgxCSVParserError) => {
          console.log("Error", error);
        }
      );
  }

  constructor(private http: HttpClient, private ngxCsvParser: NgxCsvParser, private uploadService: UploadFileService) {}

  fetchCsvFromURL() {
    console.log("Fetching csv from url", this.csvFilePath);
    if (!this.csvFilePath) {
      return;
    }
    this.http
      .get(this.csvFilePath, {
        responseType: "text"
      })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          this.headers = csvToRowArray[0].split(",").map(e => e.trim());
          this.records = csvToRowArray.slice(1).map(row => row.split(","));
        },
        error => {
          console.log(error);
        }
      );
  }

  // Upload a csv file 
  upload(){
    this.currentFile = this.selectedFiles?.item(0);
    if(this.currentFile){
      this.uploadService.upload(this.currentFile).subscribe(
        event => {
          if(event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded )/ ( event.total ?? 100 ));
          } else if(event instanceof HttpResponse){
            this.message = event.body.message;
          }
        },
        (err: any) => {
          this.progress = 0;
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
        }
      );}
  }
}

export class User {
  id: number;
  name: String;
  lastName: String;

  constructor(id: number, name: String, lastName: String) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
  }
}
