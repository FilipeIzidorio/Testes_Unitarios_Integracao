import Aeroporto from '../../src/models/Aeroporto';
import Aeronave from '../../src/models/Aeronave';

describe('Aeroporto', () => {
  let aeroporto: Aeroporto;
  let aeronave1: Aeronave;
  let aeronave2: Aeronave;

  beforeEach(() => {
    aeroporto = new Aeroporto('Aeroporto Internacional', 'GRU');
    aeronave1 = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);
    aeronave2 = new Aeronave('PT-XYZ', 'Airbus A320', 150, 18000);
  });

});