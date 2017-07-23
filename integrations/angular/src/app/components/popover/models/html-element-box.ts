import { Rectangle, Point, Dimensions } from './../interfaces/interfaces';

export class HtmlElementBox implements Rectangle {
  public static create(el: HTMLElement): Rectangle {
    return new HtmlElementBox(el);
  }

  private constructor(private el: HTMLElement) { }

  get dimensions(): Dimensions {
    return {
      width: this.el.offsetWidth,
      height: this.el.offsetHeight
    };
  }

  get position(): Point {
    return {
      top: this.el.getBoundingClientRect().top + window.pageYOffset,
      left: this.el.getBoundingClientRect().left + window.pageXOffset
    };
  }
}
