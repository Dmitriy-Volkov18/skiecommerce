import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-error',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './test-error.html',
  styleUrl: './test-error.css',
})
export class TestError {
  baseUrl = environment.apiUrl
  validationErrors: any;

  constructor(private httpService: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.httpService.get(this.baseUrl + 'products/42').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error);
    })
  }

  get500Error(){
    this.httpService.get(this.baseUrl + 'buggy/servererror').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error);
    })
  }

  get400Error(){
    this.httpService.get(this.baseUrl + 'buggy/badrequest').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error);
    })
  }

  get400ValidationError(){
    this.httpService.get(this.baseUrl + 'products/fortytwo').subscribe(response => {
      console.log(response)
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    })
  }
}
