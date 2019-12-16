import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0, // can pass the value
        bottom: '0px' // or string in pixel
      })),
      state('visible', style({
        opacity: 1, // can pass the value
        bottom: '30px' // or string in pixel
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')), // duration 500ms(time) 0s(duration) ease-in(speed)
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ]) // first parameter is the "name" and second parameter "state"
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden'

  constructor() { }

  ngOnInit() {
  }

}
