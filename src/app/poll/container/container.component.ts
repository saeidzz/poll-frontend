import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService, private fb: FormBuilder) {
    translate.use('fa');
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.createForm();

  }

  onSubmit() {
    console.log('reactiveForm', this.reactiveForm.value);
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      question: ['', Validators.required],
      type: ['', [Validators.required, Validators.email]],
      options: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}


