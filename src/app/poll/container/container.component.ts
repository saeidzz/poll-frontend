import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  reactiveForm: FormGroup;

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    translate.use('fa');
  }

  get options() {
    return this.reactiveForm.get('options') as FormArray;
  }

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.createForm();

  }

  onSubmit() {
    console.log('reactiveForm', this.reactiveForm.value);
  }

  addOption() {
    this.options.push(new FormControl(''));
  }


  createForm() {
    this.reactiveForm = this.fb.group({
      question: ['', Validators.required],
      defaultOption: ['', Validators.required],
      type: ['', [Validators.required]],
      options: this.fb.array([])
    });
  }
}


