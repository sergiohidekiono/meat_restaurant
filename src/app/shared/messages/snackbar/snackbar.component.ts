import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { NotificationService } from '../notification.service';

import { tap, switchMap } from 'rxjs/operators' // must install de package npm install --save rxjs@5.5.2
import { timer } from 'rxjs/observable/timer';

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
        bottom: '50px' // or string in pixel
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')), // duration 500ms(time) 0s(duration) ease-in(speed)
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ]) // first parameter is the "name" and second parameter "state"
  ]
})
export class SnackbarComponent implements OnInit {

  message: any

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap(message => {
          this.message = message
          this.snackVisibility = 'visible'
        }),
        switchMap(() => timer(3000)) // switchMap don't compete with each other because it's make an subscribe and unsubscribe when detect a new subscribe
      )
      .subscribe(() => { this.snackVisibility = 'hidden' })
  }
}
