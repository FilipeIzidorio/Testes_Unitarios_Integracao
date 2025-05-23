import Aeronave from '../../src/models/Aeronave';

describe('Aeronave', () => {
  const aeronave = new Aeronave('PT-ABC', 'Boeing 737', 180, 20000);

  test('deve criar uma aeronave corretamente', () => {
    expect(aeronave.codigo).toBe('PT-ABC');
    expect(aeronave.modelo).toBe('Boeing 737');
    expect(aeronave.capacidadePassageiros).toBe(180);
    expect(aeronave.capacidadeCarga).toBe(20000);
  });

  test('decolar deve retornar mensagem correta', () => {
    expect(aeronave.decolar()).toBe('Aeronave PT-ABC (Boeing 737) decolou!');
  });

  test('pousar deve retornar mensagem correta', () => {
    expect(aeronave.pousar()).toBe('Aeronave PT-ABC (Boeing 737) pousou!');
  });
});