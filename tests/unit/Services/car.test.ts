import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import CarService from '../../../src/Services/CarService';

import { Enter, Out } from '../../mocks/mock.car';

describe('Verifica interação com o banco de dados', function () {
  it('Verifica registro bem sucedido', async function () {
    sinon.stub(Model, 'create').resolves(Out);

    const testService = new CarService();
    const response = await testService.carCreate(Enter);
    expect(response).to.be.deep.equal(Out);
  });

  it('Verifica a consulta por id', async function () {
    sinon.stub(Model, 'findById').resolves(Out);

    const testService = new CarService();
    const response = await testService.carFindById('634852326b35b59438fbea31');
    expect(response).to.be.deep.equal(Out);
  });

  it('Verifica a consulta de todos os carros contidos no banco de dados', async function () {
    sinon.stub(Model, 'find').resolves([Out]);

    const testService = new CarService();
    const response = await testService.carFind();
    expect(response).to.be.deep.equal([Out]);
  });

  afterEach(function () {
    sinon.restore();
  });  
});