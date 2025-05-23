import ControleTraficoAereo from '../../src/services/ControleTraficoAereo';
import Aeronave from '../../src/models/Aeronave';
import Aeroporto from '../../src/models/Aeroporto';

describe('Integração Aeroporto e ControleTráfegoAereo', () => {
  let controle: ControleTraficoAereo;
  let aeroporto: Aeroporto;
  let aeronave: Aeronave;

  beforeEach(() => {
    aeroporto = new Aeroporto('Aeroporto Internacional', 'GRU');
    controle = new ControleTraficoAereo([aeroporto]);
    aeronave = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);
  });
  
});