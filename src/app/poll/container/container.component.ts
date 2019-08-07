import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  configFormGroup: FormGroup;
  themeFormGroup: FormGroup;
  finalFormGroup: FormGroup;
  pollFromGroup: FormGroup;

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    translate.use('fa');
  }

  get options() {
    return this.pollFromGroup.get('options') as FormArray;
  }

  ngOnInit() {
    this.configFormGroup = this.fb.group({
      type: ['', [Validators.required]],
      password: ['', [Validators.required]],
      securityLevel: ['', [Validators.required]],
      timeLimited: ['', [Validators.required]],
      expireDate: ['', [Validators.required]],
      showResultToOther: ['', [Validators.required]],
      otherOption: ['', [Validators.required]],
      selectMultiple: ['', [Validators.required]]
    });
    this.themeFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
    this.finalFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });

    this.createForm();

  }

  onSubmit() {
    console.log('pollFromGroup', this.pollFromGroup.value);
  }

  addOption() {
    this.options.push(new FormControl(''));
  }


  createForm() {
    this.pollFromGroup = this.fb.group({
      question: ['', Validators.required],
      defaultOption: ['', Validators.required],
      options: this.fb.array([])
    });
  }
}


