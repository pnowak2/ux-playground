import { BoxService } from './services/box.service';
import { IntersectionCorrectionPlacementStrategy } from './strategies/intersection-correction-strategy';
import { Component, Input, ElementRef, ViewChild, Inject } from '@angular/core';

import { PlacementStrategy, Box } from './services/interfaces';
import { HtmlElementBox } from './models/html-element-box';

@Component({
  selector: 'dm-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @ViewChild('popoverContainer') popoverContainer: ElementRef;

  @ViewChild('popoverArrow') popoverArrow: ElementRef;

  @Input() title = "Test title";

  @Input() placement: 'top' | 'left' | 'right' | 'bottom' | 'top-left' = 'left';

  constructor(
    @Inject('PlacementStrategy')
    private placementStrategies: [PlacementStrategy],
    private boxService: BoxService) { }

  show(event) {
    const triggerBox: Box = this.getTriggerBox(event.target);
    const popoverBox: Box = this.getPopoverBox(this.popoverContainer.nativeElement);

    const placementStrategy: PlacementStrategy = this.placementStrategies.find(
      strategy => strategy.getId() === this.placement
    );

    if (placementStrategy) {

      const s: PlacementStrategy = new IntersectionCorrectionPlacementStrategy(
        placementStrategy,
        this.boxService
      );

      popoverBox.position = s.calculatePosition(
        triggerBox,
        popoverBox
      );
    }
  }

  getTriggerBox(element: HTMLElement): Box {
    return new HtmlElementBox(element);
  }

  getPopoverBox(element: HTMLElement): Box {
    return new HtmlElementBox(element);
  }
}
