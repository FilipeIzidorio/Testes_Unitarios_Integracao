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
   test('deve adicionar uma aeronave válida', () => {
    aeroporto.adicionarAeronave(aeronave1);
    expect(aeroporto.listarAeronaves()).toContain(aeronave1);
    expect(aeroporto.obterHistorico()).toContain('Aeronave PT-ABC adicionada ao aeroporto');
  });

  test('deve permitir adicionar aeronave duplicada (falha no design)', () => {
    aeroporto.adicionarAeronave(aeronave1);
    aeroporto.adicionarAeronave(aeronave1); // Duplicada
    
    expect(aeroporto.listarAeronaves().length).toBe(2); // Deveria ser 1
    expect(aeroporto.obterHistorico().filter(e => e.includes('PT-ABC')).length).toBe(2);
  });

  // Listar Aeronaves
  test('deve retornar lista vazia para aeroporto sem aeronaves', () => {
    expect(aeroporto.listarAeronaves()).toEqual([]);
  });

  test('deve listar todas aeronaves corretamente', () => {
    aeroporto.adicionarAeronave(aeronave1);
    aeroporto.adicionarAeronave(aeronave2);
    
    const lista = aeroporto.listarAeronaves();
    expect(lista).toHaveLength(2);
    expect(lista).toContain(aeronave1);
    expect(lista).toContain(aeronave2);
  });

  // Buscar Aeronave
  test('deve encontrar aeronave existente', () => {
    aeroporto.adicionarAeronave(aeronave1);
    expect(aeroporto.buscarAeronavePorCodigo('PT-ABC')).toBe(aeronave1);
  });

  test('deve retornar undefined para aeronave inexistente', () => {
    expect(aeroporto.buscarAeronavePorCodigo('PT-999')).toBeUndefined();
  });

  // Remover Aeronave
  test('deve remover aeronave existente', () => {
    aeroporto.adicionarAeronave(aeronave1);
    const resultado = aeroporto.removerAeronave('PT-ABC');
    
    expect(resultado).toBe(true);
    expect(aeroporto.listarAeronaves()).not.toContain(aeronave1);
    expect(aeroporto.obterHistorico()).toContain('Aeronave PT-ABC removida do aeroporto');
  });

  test('deve retornar false ao tentar remover aeronave inexistente', () => {
    expect(aeroporto.removerAeronave('PT-999')).toBe(false);
  });

  // Registrar Evento
  test('deve registrar evento no histórico', () => {
    aeroporto.registrarEvento('Teste de evento');
    expect(aeroporto.obterHistorico()[0]).toContain('Teste de evento');
  });
  test('deve decolar aeronave existente', () => {
    aeroporto.adicionarAeronave(aeronave1);
    const mensagem = aeroporto.decolarAeronave('PT-ABC');
    
    expect(aeroporto.listarAeronaves()).not.toContain(aeronave1);
    expect(aeroporto.obterHistorico()).toContain('Aeronave PT-ABC decolou do aeroporto');
    expect(mensagem).toBe('Aeronave PT-ABC (Boeing 737) decolou!');
  });

  test('deve lançar erro ao tentar decolar aeronave inexistente', () => {
    expect(() => aeroporto.decolarAeronave('PT-404')).toThrow('Aeronave com código PT-404 não encontrada no aeroporto');
  });

  // Decolar Todas as Aeronaves
  test('deve decolar múltiplas aeronaves', () => {
    aeroporto.adicionarAeronave(aeronave1);
    aeroporto.adicionarAeronave(aeronave2);
    
    const mensagens = aeroporto.decolarAeronaves();
    
    expect(aeroporto.listarAeronaves()).toEqual([]);
    expect(mensagens).toHaveLength(2);
    expect(mensagens).toContain('Aeronave PT-ABC (Boeing 737) decolou!');
    expect(mensagens).toContain('Aeronave PT-XYZ (Airbus A320) decolou!');
  });

  test('deve retornar lista vazia ao decolar todas de aeroporto vazio', () => {
    expect(aeroporto.decolarAeronaves()).toEqual([]);
  });

  // Fluxo Completo
  test('deve registrar histórico corretamente após múltiplas operações', () => {
    aeroporto.adicionarAeronave(aeronave1);
    aeroporto.decolarAeronave('PT-ABC');
    
    const historico = aeroporto.obterHistorico();
    expect(historico[0]).toContain('Aeronave PT-ABC adicionada ao aeroporto');
    expect(historico[1]).toContain('Aeronave PT-ABC decolou do aeroporto');
  });

  

});