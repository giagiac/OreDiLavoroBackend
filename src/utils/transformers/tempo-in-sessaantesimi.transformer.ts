import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class TempoOperatoreToSessantesimiTransformer {
  /**
   * Converte un numero decimale (dove la parte decimale rappresenta i minuti)
   * in un formato hh:mm.
   * @param oreDecimali Numero decimale che rappresenta ore e minuti.
   * @returns Stringa nel formato hh:mm.
   */
  convertiOreInFormatoHHMM(oreDecimali: number): string {
    const ore = Math.floor(oreDecimali); // Parte intera rappresenta le ore
    const minutiDecimali = oreDecimali - ore; // Parte decimale rappresenta i minuti
    const minuti = Math.round(minutiDecimali * 60); // Converti i minuti in base 60

    // Formatta il risultato in hh:mm
    return `${String(ore).padStart(2, '0')}:${String(minuti).padStart(2, '0')}`;
  }
}
