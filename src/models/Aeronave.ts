export default class Aeronave {

    passageiros: number = 0;
    cargaAtual: number = 0.0;

    constructor(
        public codigo: string,
        public modelo: string,
        public capacidadePassageiros: number,
        public capacidadeCarga: number
    ) { }

    embarcarPassageiro(): string {
        this.passageiros++;
        return "Passageiro embarcado";
    }

    desembarcarPassageiro(): string {
        this.passageiros--;
        return "Passageiro desembarcado";
    }

    embarcarCarga(pesoCarga: number): string {
        this.cargaAtual += pesoCarga;
        return "Carga embarcada"
    }

    decolar(): string {
        return `Aeronave ${this.codigo} (${this.modelo}) decolou!`;
    }

    pousar(): string {
        return `Aeronave ${this.codigo} (${this.modelo}) pousou!`;
    }
}