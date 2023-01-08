import {
  Model,
  models,
  Schema,
  model,
} from 'mongoose';

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
}

export default AbstractODM;