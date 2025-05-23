import Aeronave from '../models/Aeronave';
import Aeroporto from '../models/Aeroporto';

export default class ControleTraficoAereo {
  constructor(private aeroportos: Aeroporto[] = []) {}

  registrarAeroporto(aeroporto: Aeroporto): void {
    this.aeroportos.push(aeroporto);
  }

  autorizarDecolagem(codigoAeronave: string, codigoAeroporto: string): string {
    const aeroporto = this.aeroportos.find(a => a.codigoIATA === codigoAeroporto);
    if (!aeroporto) {
      throw new Error(`Aeroporto ${codigoAeroporto} não encontrado`);
    }

    const aeronave = aeroporto.buscarAeronavePorCodigo(codigoAeronave);
    if (!aeronave) {
      throw new Error(`Aeronave ${codigoAeronave} não encontrada no aeroporto ${codigoAeroporto}`);
    }

    aeroporto.removerAeronave(codigoAeronave);
    aeroporto.registrarEvento(`Decolagem autorizada para ${codigoAeronave}`);
    
    return aeronave.decolar();
  }

  autorizarPouso(aeronave: Aeronave, codigoAeroporto: string): string {
    const aeroporto = this.aeroportos.find(a => a.codigoIATA === codigoAeroporto);
    if (!aeroporto) {
      throw new Error(`Aeroporto ${codigoAeroporto} não encontrado`);
    }

    aeroporto.adicionarAeronave(aeronave);
    aeroporto.registrarEvento(`Pouso autorizado para ${aeronave.codigo}`);
    
    return aeronave.pousar();
  }
}