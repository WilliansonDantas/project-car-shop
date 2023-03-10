import {
  Model,
  models,
  Schema,
  model,
  isValidObjectId,
  UpdateQuery,
} from 'mongoose';
import HttpException from '../Utils/ HttpException';

class AbstractODM<T> {
  private schema: Schema;
  private model: Model<T>;
  private modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(date: T): Promise<T> {
    return this.model.create({ ...date });
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findById(id);
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async update(id: string, vehicle: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new HttpException(422, 'Invalid mongo id');
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...vehicle } as UpdateQuery<T>,
      { new: true },
    ); 
  }
}

export default AbstractODM;