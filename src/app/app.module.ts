import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {NgxCsvParserModule} from "ngx-csv-parser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TutoReportComponent } from './tuto-report/tuto-report.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TutoReportComponent,
    UploadFileComponent,
    DynamicFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCsvParserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
