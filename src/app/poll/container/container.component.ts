import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Poll} from '../model/poll';
import {PollService} from '../../poll.service';
import {Config} from '../model/config';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  data1: any;
  data2: any;
  data3: any;
  allImages = [];
  public message: string;
  pollFromGroup: FormGroup;
  allBorders = ['theme11', 'theme21', 'theme31', 'theme41', 'theme51', 'theme61', 'theme71', 'theme81'];
  allCharts = ['polarArea', 'doughnut', 'bar'];
  poll: Poll;
  config: Config;
  stringOptions: string[];

  constructor(private translate: TranslateService, private fb: FormBuilder, private pollService: PollService) {
    translate.use('fa');
    this.data1 = {
      datasets: [{
        data: [
          80,
          70,
          60,
          50,
        ],
        backgroundColor: [
          '#FF6384',
          '#4BC0C0',
          '#FFCE56',
          '#36A2EB'
        ],
        label: 'محبوبیت'
      }],
      labels: [
        'رونالدو',
        'نیمار',
        'مسی',
        'ابراهیموویچ'
      ]
    };
    this.data2 = {
      labels: ['رونالدو', 'نیمار', 'مسی', 'ابراهیموویچ'],
      datasets: [
        {
          data: [90, 80, 70, 60, 0],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#a820e0'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#bc59e0'
          ]
        }]
    };
    this.data3 = {
      labels: [
        'رونالدو',
        'نیمار',
        'مسی',
        'ابراهیموویچ'],
      datasets: [
        {
          label: 'محبوبیت',
          backgroundColor: '#5c63ff',
          borderColor: '#e54c2c',
          data: [90.00, 80.00, 70.00, 60.00, 0]
        }
      ]
    };


  }

  get options() {
    return this.pollFromGroup.get('options') as FormArray;
  }

  ngOnInit() {
    this.poll = new Poll();
    this.config = new Config();
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
      chartType: ['', Validators.required],
      options: this.fb.array([])
    });
    this.options.push(new FormControl(''));
    this.options.push(new FormControl(''));
    this.options.push(new FormControl(''));
    this.options.push(new FormControl(''));
    this.pollService.get().subscribe(result => {
      console.log(result);
    });
  }

  addOption() {
    this.options.push(new FormControl(''));
    this.options.push(new FormControl(''));
  }

  removeOption() {
    this.options.removeAt(this.options.length - 1);
    this.options.removeAt(this.options.length - 2);
  }

  themeSelect(s) {
    for (let i = 0; i < this.allBorders.length; i++) {
      document.getElementById(this.allBorders[i]).style.backgroundColor = '#ffffff';
    }
    document.getElementById(s + '1').style.backgroundColor = '#3777e0';
    // console.log(s);
    this.pollFromGroup.controls.themeName = s;
    // console.log(this.pollFromGroup.controls);
  }

  chartSelect(s) {
    for (let i = 0; i < this.allCharts.length; i++) {
      document.getElementById(this.allCharts[i]).style.backgroundColor = '#ffffff';
    }
    console.log(this.pollFromGroup.controls);
    document.getElementById(s).style.backgroundColor = '#3777e0';
    // console.log(s);
    this.pollFromGroup.controls.chartType = s;
    // console.log(this.pollFromGroup.controls);
    this.fillPoll();
  }


  preview(event, imgId) {

    if (event.target.files[0].length === 0) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.allImages[imgId / 2] = reader.result;
    reader.readAsDataURL(file);
    console.log(this.allImages);
  }

  getBtnClass(themeName) {
    switch (themeName) {
      case 'theme1':
        return 'btn btn-primary border-white';
      case 'theme2':
        return 'btn btn-dark border-white';
      case 'theme3':
        return 'btn btn-danger border-white';
      case 'theme4':
        return 'btn btn-light  border-dark';
      case 'theme5':
        return 'btn btn-info  border-danger';
      case 'theme6':
        return 'btn btn-secondary  border-white';
      case 'theme7':
        return 'btn btn-success  border-white';
      case 'theme8':
        return 'btn btn-light border-dark';
      default:
        return 'btn btn-light  border-dark';
    }
  }

  fillPoll() {
    let counter = 0;
    this.poll.options = this.pollFromGroup.value.options;

    this.poll.options.forEach((image: any) => {
      if (counter % 2 !== 0) {
        this.poll.options[counter] = this.allImages[counter / 2];
      }
      counter++;
    });
    this.poll.question = this.pollFromGroup.controls.question.value;
    this.config.chartType = this.pollFromGroup.controls.chartType;
    this.config.comment = this.pollFromGroup.controls.otherOption.value;
    this.config.password = this.pollFromGroup.controls.password.value;
    this.config.pollType = this.pollFromGroup.controls.type.value;
    this.config.securityLevel = this.pollFromGroup.controls.securityLevel.value;
    this.config.selectMultiple = this.pollFromGroup.controls.selectMultiple.value;
    this.config.showResultToParicipant = this.pollFromGroup.controls.showResultToOther.value;
    this.config.themeName = this.pollFromGroup.controls.themeName;
    this.config.timeLimited = this.pollFromGroup.controls.timeLimited.value;
    this.poll.config = this.config;
    console.log(this.poll);
  }

  submitPoll() {
    this.pollService.save(this.poll).subscribe(result => {
      console.log(result);
    });
  }
}


