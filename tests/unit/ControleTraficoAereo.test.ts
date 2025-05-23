import ControleTraficoAereo from '../../src/services/ControleTraficoAereo';
import Aeronave from '../../src/models/Aeronave';
import Aeroporto from '../../src/models/Aeroporto';

jest.mock('../../src/models/Aeroporto');
jest.mock('../../src/models/Aeronave');

const MockAeroporto = Aeroporto as jest.MockedClass<typeof Aeroporto>;
const MockAeronave = Aeronave as jest.MockedClass<typeof Aeronave>;

describe('ControleTraficoAereo', () => {
  let controle: ControleTraficoAereo;
  let mockAeroporto: jest.Mocked<Aeroporto>;
  let mockAeronave: jest.Mocked<Aeronave>;

  beforeEach(() => {
    MockAeroporto.mockClear();
    MockAeronave.mockClear();

    mockAeroporto = new MockAeroporto('Teste', 'TST') as jest.Mocked<Aeroporto>;
    mockAeronave = new MockAeronave('PT-TST', 'Teste', 0, 0) as jest.Mocked<Aeronave>;

    controle = new ControleTraficoAereo([mockAeroporto]);
  });

  
});