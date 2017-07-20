import { Injectable } from '@angular/core';
import { SimpleBox } from './../models/simple-box';
import { WindowBox } from './../models/window-box';
import { Position, Box, PlacementStrategy } from '../services/interfaces';
import { BoxService } from '../services/box.service';

@Injectable()
export class RightPlacementStrategy implements PlacementStrategy {

  constructor(private boxService: BoxService) { }

  getId() {
    return "right";
  }

  calculatePosition(trigger: Box, element: Box): Position {
    let position: Position = {
      top: 0,
      left: 0
    };

    position.top = trigger.position.top - element.dimensions.height / 2 + trigger.dimensions.height / 2;
    position.left = trigger.position.left + trigger.dimensions.width;

    const intersection = this.boxService.calculateIntersection(
      SimpleBox.create(position, element.dimensions),
      WindowBox.create(window)
    );

    if (intersection.right < 0) {
      position.left = trigger.position.left - element.dimensions.width;
    }

    return position;
  }
}
