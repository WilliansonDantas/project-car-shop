import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.motorcycleCreate(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const motorcycleId = await this.service.motorcycleFindById(id);
      return this.res.status(200).json(motorcycleId);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const allMotorcycles = await this.service.motorcycleFind();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const vehicle = this.req.body;
    try {
      const motorcycleIdUpdate = await this.service.motorcycleUpdate(id, vehicle);
      return this.res.status(200).json(motorcycleIdUpdate);
    } catch (error) {
      this.next(error);
    }
  }
}