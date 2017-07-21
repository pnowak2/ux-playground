import { Rectangle, Position, Dimensions } from './../interfaces/interfaces';

export class WindowBox implements Rectangle {
  private constructor(private window: Window) { }

  public static create(): Rectangle {
    return new WindowBox(WindowBox.getWindow());
  }

  get dimensions(): Dimensions {
    return {
      width: this.window.document.documentElement.clientWidth,
      height: this.window.document.documentElement.clientHeight
    }
  }

  get position(): Position {
    return {
      top: this.window.pageYOffset,
      left: this.window.pageXOffset
    }
  }

  static getWindow(): Window {
    return window;
  }
}
