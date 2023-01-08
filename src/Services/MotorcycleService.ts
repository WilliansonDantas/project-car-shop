import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpException from '../Utils/ HttpException';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | Error {
    if (motorcycle) {
      return new Motorcycle(
        motorcycle,
      );
    }
    throw new HttpException(404, 'Motorcycle not found');
  }

  public async motorcycleCreate(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async motorcycleFindById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleId = await motorcycleODM.findById(id);
    return this.createMotorcycleDomain(motorcycleId);
  }

  public async motorcycleFind() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleList = await motorcycleODM.find();
    return motorcycleList.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }
}