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
  answerOptions: number;

  constructor(private formBuilder: FormBuilder, private translate: TranslateService) {
    translate.use('fa');
  }

  ngOnInit() {
    this.answerOptions[0] = 1;
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  addAnswerOption() {

    console.log('itemAdding');
  }
}


