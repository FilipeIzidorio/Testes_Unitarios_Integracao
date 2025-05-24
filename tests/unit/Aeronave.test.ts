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
  // Teste de embarcar passageiro com capacidade
  test('deve embarcar passageiro quando há capacidade', () => {
    const resultado = aeronave.embarcarPassageiro();
    expect(aeronave.passageiros).toBe(1);
    expect(resultado).toBe('Passageiro embarcado');
  });

  // Teste de desembarcar passageiro
  test('deve desembarcar passageiro quando há passageiros', () => {
    aeronave.embarcarPassageiro(); // Embarca primeiro
    const resultado = aeronave.desembarcarPassageiro();
    expect(aeronave.passageiros).toBe(0);
    expect(resultado).toBe('Passageiro desembarcado');
  });

  // Teste de embarcar carga dentro do limite
  test('deve embarcar carga dentro do limite', () => {
    const resultado = aeronave.embarcarCarga(300);
    expect(aeronave.cargaAtual).toBe(300);
    expect(resultado).toBe('Carga embarcada');
  });

  // Teste de decolagem
  test('deve retornar mensagem correta ao decolar', () => {
    expect(aeronave.decolar()).toBe('Aeronave PT-TST (Test Model) decolou!');
  });

  // Teste de pouso
  test('deve retornar mensagem correta ao pousar', () => {
    expect(aeronave.pousar()).toBe('Aeronave PT-TST (Test Model) pousou!');
  });


});