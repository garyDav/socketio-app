import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-ng-zone-demo',
  templateUrl: './ng-zone-demo.component.html',
  styleUrls: ['./ng-zone-demo.component.css']
})
export class NgZoneDemoComponent implements OnInit {
  progress: number = 0;
  label: string;

  constructor(private _ngZone: NgZone) {
    console.log(_ngZone)
  }

  ngOnInit() {
  }

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }
 
  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => { console.log('Outside Done!'); });
      });
    });
  }
 
  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
 
    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }

}
