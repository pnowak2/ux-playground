import { Rectangle } from './../../model/rectangle';
import { PositionService } from './position.service';
import { PlacementOptions } from './interface/placement-options';
import { PlacementStrategy } from './interface/placement-strategy';

class FakePlacementStrategy implements PlacementStrategy {
  getId(): string {
    return;
  }
  calculate(anchor: Rectangle, element: Rectangle, options: PlacementOptions): Rectangle {
    return;
  }
}

fdescribe('PositionService', () => {
  let fakeStrategy: PlacementStrategy;

  beforeEach(() => {
    fakeStrategy = new FakePlacementStrategy();
  });

  describe('Creation', () => {
    it('should create an instance without args', () => {
      expect(() => {
        new PositionService();
      }).not.toThrow();
    });

    it('should create an instance with null arg', () => {
      expect(() => {
        new PositionService(null);
      }).not.toThrow();
    });

    it('should create an instance with empty array', () => {
      expect(() => {
        new PositionService([]);
      }).not.toThrow();
    });

    it('should create an instance with array of ', () => {
      expect(() => {
        new PositionService([fakeStrategy]);
      }).not.toThrow();
    });
  });

  describe('Api', () => {
    describe('position())', () => {
      let fakeStrategy: PlacementStrategy;
      let service: PositionService;

      beforeEach(() => {
        fakeStrategy = new FakePlacementStrategy();
        service = new PositionService([fakeStrategy]);

        spyOn(fakeStrategy, 'getId').and.returnValue('fakeId1');
      });

      it('should behave...', () => {
        const anchor = Rectangle.create(1, 2, 3, 4);
        const element = Rectangle.create(2, 3, 4, 5);
        const placementId = "fakeId1";
        const parent = Rectangle.create(0, 0, 10, 10);
        const offset = 5;
        const constrainToParent = true;
        const flip = true;

        service.position(anchor, element, {
          placementId, parent, offset, constrainToParent, flip
        })
      });
    });

    describe('pickPlacementStrategy())', () => {
      it('should behave...', () => {

      });
    });
  });
});