import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(car);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  public getdoors() {
    return this.doorsQty;
  }

  public setdoors(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  public getseatsQty() {
    return this.seatsQty;
  }

  public setseatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
}