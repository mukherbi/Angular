import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {


  serviceForm: FormGroup;
  methods: FormArray;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {

    this.serviceForm = this.formBuilder.group({
      serviceName: new FormControl('', Validators.required),
      methods: this.formBuilder.array([this.createMethod()])
    });
  }

  // convenience getter for easy access to form fields
  get f() {return this.serviceForm.controls;}

  createMethod(): FormGroup {
    return this.formBuilder.group({
      endpoint: new FormControl('', Validators.required),
      methodName: new FormControl('', Validators.required),
      httpVerb: new FormControl('', Validators.required),
      input: new FormControl(''),
      output: new FormControl(''),
      fallbackMethodRequired: new FormControl('')
    });
  }

  addMethod(): void {
    this.methods = this.serviceForm.get('methods') as FormArray;
    this.methods.push(this.createMethod());
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.serviceForm.invalid) {
      return;
    }
    console.log(this.serviceForm.value);
    alert('JSON value ' + JSON.stringify(this.serviceForm.value));
  }
}
