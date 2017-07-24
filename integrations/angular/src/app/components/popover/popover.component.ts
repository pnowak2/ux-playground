import { Component, Input, ElementRef, ViewChild, Inject } from '@angular/core';
import { Rectangle } from './../../shared/coordinates/interfaces/rectangle';
import { RectangleFactory } from './../../shared/coordinates/factory/rectangle-factory';
import { POSITION_SERVICE } from './../../shared/coordinates/coordinates.config';
import { PositionService } from './../../shared/coordinates/services/position/position.service';

@Component({
  selector: 'dm-popover',
  templateUrl: './popover.component.html'
})
export class PopoverComponent {
  @ViewChild('popoverContainer') popoverContainer: ElementRef;

  @ViewChild('popoverArrow') popoverArrow: ElementRef;

  @Input() title = 'Test title';

  @Input() placement: 'top' | 'left' | 'right' | 'bottom' | 'top-left' = 'bottom';

  constructor(
    @Inject(POSITION_SERVICE)
    private positionService: PositionService) { }

  show(event) {
    const popoverContainer: HTMLElement = this.popoverContainer.nativeElement;
    const triggerBox: Rectangle = RectangleFactory.fromHtmlElement(event.target);
    const popoverBox: Rectangle = RectangleFactory.fromHtmlElement(popoverContainer);

    const placementRectangle: Rectangle = this.positionService.position(
      triggerBox,
      popoverBox,
      this.placement
    );

    this.updatePlacement(
      popoverContainer,
      placementRectangle
    );
  }

  updatePlacement(popover: HTMLElement, rect: Rectangle) {
    popover.style.left = rect.position.left + 'px';
    popover.style.top = rect.position.top + 'px';
    popover.style.height = rect.dimensions.height + 'px';
    popover.style.width = rect.dimensions.width + 'px';
  }
}
