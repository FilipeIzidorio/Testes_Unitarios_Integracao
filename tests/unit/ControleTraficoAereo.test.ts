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
  describe('ControleTraficoAereo - Testes Unitários', () => {
  // Registrar Aeroporto
  test('deve registrar um novo aeroporto', () => {
    const novoAeroporto = new MockAeroporto('Guarulhos', 'GRU');
    controle.registrarAeroporto(novoAeroporto);
    expect(controle['aeroportos']).toContain(novoAeroporto);
  });

  test('deve permitir registrar aeroporto duplicado (falha no design)', () => {
    const aeroportoGIG = new MockAeroporto('Galeão', 'GIG');
    controle.registrarAeroporto(aeroportoGIG);
    controle.registrarAeroporto(aeroportoGIG); // Duplicado
    
    expect(controle['aeroportos'].filter(a => a.codigoIATA === 'GIG').length).toBe(2); // Deveria ser 1
  });

  // Autorizar Decolagem - Cenários de erro
  test('deve lançar erro ao autorizar decolagem em aeroporto não gerenciado', () => {
    expect(() => controle.autorizarDecolagem('PT-999', 'FOR'))
      .toThrow('Aeroporto FOR não encontrado');
  });

  // Autorizar Pouso - Cenários de erro
  test('deve lançar erro ao autorizar pouso em aeroporto não gerenciado', () => {
    expect(() => controle.autorizarPouso(mockAeronave, 'BSB'))
      .toThrow('Aeroporto BSB não encontrado');
  });
});

describe('ControleTraficoAereo - Testes de Integração', () => {
  // Autorizar Decolagem
  test('deve autorizar decolagem válida', () => {
    mockAeroporto.buscarAeronavePorCodigo.mockReturnValue(mockAeronave);
    mockAeronave.decolar.mockReturnValue('Aeronave PT-TST (Teste) decolou!');
    
    const resultado = controle.autorizarDecolagem('PT-TST', 'TST');
    
    expect(mockAeroporto.removerAeronave).toHaveBeenCalledWith('PT-TST');
    expect(mockAeroporto.registrarEvento).toHaveBeenCalledWith('Decolagem autorizada para PT-TST');
    expect(resultado).toBe('Aeronave PT-TST (Teste) decolou!');
  });

  test('deve lançar erro ao autorizar decolagem de aeronave inexistente', () => {
    mockAeroporto.buscarAeronavePorCodigo.mockReturnValue(undefined);
    
    expect(() => controle.autorizarDecolagem('PT-404', 'TST'))
      .toThrow('Aeronave PT-404 não encontrada no aeroporto TST');
  });

  // Autorizar Pouso
  test('deve autorizar pouso válido', () => {
    mockAeronave.pousar.mockReturnValue('Aeronave PT-TST (Teste) pousou!');
    
    const resultado = controle.autorizarPouso(mockAeronave, 'TST');
    
    expect(mockAeroporto.adicionarAeronave).toHaveBeenCalledWith(mockAeronave);
    expect(mockAeroporto.registrarEvento).toHaveBeenCalledWith('Pouso autorizado para PT-TST');
    expect(resultado).toBe('Aeronave PT-TST (Teste) pousou!');
  });

  test('deve lançar erro ao autorizar pouso de aeronave já estacionada (falha no design)', () => {
    mockAeroporto.adicionarAeronave.mockImplementation(() => {
      throw new Error('Aeronave já existe');
    });
    
    expect(() => controle.autorizarPouso(mockAeronave, 'TST'))
      .toThrow('Aeronave já existe');
  });

  // Fluxo Completo
  test('deve gerenciar ciclo completo de voo', () => {
    // Configura mocks
    mockAeronave.pousar.mockReturnValue('Aeronave PT-TST (Teste) pousou!');
    mockAeronave.decolar.mockReturnValue('Aeronave PT-TST (Teste) decolou!');
    mockAeroporto.buscarAeronavePorCodigo.mockReturnValue(mockAeronave);
    
    // Executa fluxo
    const pousoMsg = controle.autorizarPouso(mockAeronave, 'TST');
    const decolagemMsg = controle.autorizarDecolagem('PT-TST', 'TST');
    
    // Verificações
    expect(pousoMsg).toBe('Aeronave PT-TST (Teste) pousou!');
    expect(decolagemMsg).toBe('Aeronave PT-TST (Teste) decolou!');
    
    const eventos = mockAeroporto.registrarEvento.mock.calls.map(args => args[0]);
    expect(eventos).toContain('Pouso autorizado para PT-TST');
    expect(eventos).toContain('Decolagem autorizada para PT-TST');
  });
});

  
});