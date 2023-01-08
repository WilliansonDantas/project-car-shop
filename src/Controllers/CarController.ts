import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.carCreate(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const carId = await this.service.carFindById(id);
      return this.res.status(200).json(carId);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const allCars = await this.service.carFind();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const vehicle = this.req.body;
    try {
      const carIdUpdate = await this.service.carUpdate(id, vehicle);
      return this.res.status(200).json(carIdUpdate);
    } catch (error) {
      this.next(error);
    }
  }
}