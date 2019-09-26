import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  pollFromGroup: FormGroup;
  allBorders = ['theme11', 'theme21', 'theme31', 'theme41', 'theme51', 'theme61', 'theme71', 'theme81'];

  constructor(private translate: TranslateService, private fb: FormBuilder) {
    translate.use('fa');

  }

  get options() {
    return this.pollFromGroup.get('options') as FormArray;
  }

  ngOnInit() {
    this.pollFromGroup = this.fb.group({
      type: ['', [Validators.required]],
      password: ['', [Validators.required]],
      securityLevel: ['', [Validators.required]],
      timeLimited: ['', [Validators.required]],
      expireDate: ['', [Validators.required]],
      showResultToOther: ['', [Validators.required]],
      otherOption: ['', [Validators.required]],
      selectMultiple: ['', [Validators.required]],
      question: ['', Validators.required],
      themeName: ['', Validators.required],
      options: this.fb.array([])
    });
    this.options.push(new FormControl(''));
    this.options.push(new FormControl(''));
  }

  onSubmit() {
    console.log('pollFromGroup', this.pollFromGroup.value);
  }

  addOption() {
    this.options.push(new FormControl(''));
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
  }


  printText(s: any) {
    console.log(s);
  }

  themeSelect(s) {
    for (let i = 0; i < this.allBorders.length; i++) {
      document.getElementById(this.allBorders[i]).style.backgroundColor = '#ffffff';
    }
    s += '1';
    document.getElementById(s).style.backgroundColor = '#3777e0';
    this.pollFromGroup.setControl('themeName', s);
    console.log(this.pollFromGroup);
  }

}


