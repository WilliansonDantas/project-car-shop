import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';

import { Enter, Out } from '../../mocks/mock.motorcycle';

describe('Verifica interação com o banco de dados', function () {
  it('Verifica registro bem sucedido', async function () {
    sinon.stub(Model, 'create').resolves(Out);

    const testService = new MotorcycleService();
    const response = await testService.motorcycleCreate(Enter);
    expect(response).to.be.deep.equal(Out);
  });

  it('Verifica a consulta por id', async function () {
    sinon.stub(Model, 'findById').resolves(Out);

    const testService = new MotorcycleService();
    const response = await testService.motorcycleFindById('634852326b35b59438fbea31');
    expect(response).to.be.deep.equal(Out);
  });

  it('Verifica a consulta de todos os carros contidos no banco de dados', async function () {
    sinon.stub(Model, 'find').resolves([Out]);

    const testService = new MotorcycleService();
    const response = await testService.motorcycleFind();
    expect(response).to.be.deep.equal([Out]);
  });

  it('Verifica se o veículo foi atualizado', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(Out);

    const testService = new MotorcycleService();
    const response = await testService.motorcycleUpdate('634852326b35b59438fbea31', Enter);
    expect(response).to.be.deep.equal(Out);
  });

  afterEach(function () {
    sinon.restore();
  });  
});