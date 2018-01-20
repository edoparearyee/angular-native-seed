import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'home.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent { }
