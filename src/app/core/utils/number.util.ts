export class NumberUtil {
  public static buildLegend(num: number): string {
    num = parseFloat(num.toFixed(2));
    const arrayNumber = `${num}`.split('.');
    console.log({ arrayNumber });
    const ones = [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
    ];
    const tens = [
      '',
      '',
      'veinte',
      'treinta',
      'cuarenta',
      'cincuenta',
      'sesenta',
      'setenta',
      'ochenta',
      'noventa',
    ];
    const teens = [
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciseis',
      'diecisiete',
      'dieciocho',
      'diecinueve',
    ];
    function convert_millions(num) {
      if (num >= 1000000) {
        return (
          convert_millions(Math.floor(num / 1000000)) +
          ' million ' +
          convert_thousands(num % 1000000)
        );
      } else {
        return convert_thousands(num);
      }
    }

    function convert_thousands(num) {
      if (num >= 1000) {
        return (
          convert_hundreds(Math.floor(num / 1000)) +
          ' thousand ' +
          convert_hundreds(num % 1000)
        );
      } else {
        return convert_hundreds(num);
      }
    }

    function convert_hundreds(num) {
      if (num > 99) {
        return (
          ones[Math.floor(num / 100)] + ' hundred ' + convert_tens(num % 100)
        );
      } else {
        return convert_tens(num);
      }
    }

    function convert_tens(num) {
      if (num < 10) return ones[num];
      else if (num >= 10 && num < 20) return teens[num - 10];
      else {
        return tens[Math.floor(num / 10)] + ' ' + ones[num % 10];
      }
    }

    if (num == 0) {
      return 'cero';
    } else {
      const firstPart: string = convert_millions(arrayNumber[0]);

      return `${firstPart.toUpperCase().trim()} CON ${
        arrayNumber[1]
      }/100 SOLES`;
    }
  }
}
