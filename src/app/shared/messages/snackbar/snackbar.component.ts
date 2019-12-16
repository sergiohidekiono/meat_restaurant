import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'; // import to use the timer
import { NotificationService } from '../notification.service';

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

  message: string = 'Hello there!'

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier.subscribe(message => {
      this.message = message // notify the message
      this.snackVisibility = 'visible' // showing the snackbar with message
      Observable.timer(3000).subscribe(timer => this.snackVisibility = 'hidden') // when the timer is already done the snackbar will hidden
    })
  }
}
