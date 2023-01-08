import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import HttpException from '../Utils/ HttpException';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | Error {
    if (car) {
      return new Car(
        car,
      );
    }
    throw new HttpException(404, 'Car not found');
  }

  public async carCreate(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async carFindById(id: string) {
    const carODM = new CarODM();
    const carId = await carODM.findById(id);
    return this.createCarDomain(carId);
  }

  public async carFind() {
    const carODM = new CarODM();
    const carList = await carODM.find();
    return carList.map((car) => this.createCarDomain(car));
  }

  public async carUpdate(id: string, vehicle: ICar) {
    const carODM = new CarODM();
    const carId = await carODM.update(id, vehicle);
    return this.createCarDomain(carId);
  }
}