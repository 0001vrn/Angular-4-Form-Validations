import { Component } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';
import { Console } from '@angular/core/src/console';
import { error } from 'util';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  languages = [];
  model: Employee = new Employee("", "", false, "" ,"default");
  hasPrimaryLangErr:boolean = false;

  constructor(private formPoster: FormPoster){

  }
  ngOnInit(): void {
    this.formPoster.getLanguages()
        .subscribe(
          data => this.languages = data.languages,
          err => console.log('get error: ', err)
        );
  }
  validatePrimaryLanguage(value){
    if(value === 'default'){
      this.hasPrimaryLangErr = true;
    }
    else{
      this.hasPrimaryLangErr = false;
    }
  }
  submitForm(form: NgForm){
    // console.log(this.model);
    // console.log(form.value);

    //validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);

    if(this.hasPrimaryLangErr)
      return;

      this.formPoster.postEmployeeForm(this.model)
          .subscribe(
            data => console.log('Form subscribe success: ' , data),
            err => console.error('Form subscribe error :', err)
          );
  }
  // firstNameToUpperCase(value: string){
  //   if(value.length > 0)
  //     this.model.firstName = value.charAt(0).toUpperCase()+value.slice(1);
  //   else
  //     this.model.firstName = value;
  // }
}
