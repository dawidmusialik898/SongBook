import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {

}
