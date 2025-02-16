import { cloneObject, sleep, generateInvoiceNumber, convertDateStrToDate } from './app';

describe('App Utility Functions', () => {

  describe('cloneObject', () => {
    it('should deep clone an object', () => {
      const obj = {
        name: 'Fathan Rohman',
        age: 30,
        address: {
          city: 'Sukabumi',
          zip: '43135'
        }
      };

      const clonedObj = cloneObject(obj);
      expect(clonedObj).toEqual(obj);
      expect(clonedObj).not.toBe(obj);
      expect(clonedObj.address).not.toBe(obj.address);
    });

    it('should convert undefined to null', () => {
      const obj = { name: 'John', age: undefined };
      const clonedObj = cloneObject(obj);
      expect(clonedObj.age).toBeNull();
    });
  });

  describe('sleep', () => {
    it('should resolve after the specified time', async () => {
      const start = Date.now();
      await sleep(1000);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('generateInvoiceNumber', () => {
    it('should generate a valid invoice number', () => {
      const invoiceNumber = generateInvoiceNumber();
      expect(invoiceNumber).toMatch(/^INV-\d{8}-\d{4}$/);
    });
  });

  describe('convertDateStrToDate', () => {
    it('should convert a date string in dd/mm/yyyy format to Date object', () => {
      const dateStr = '16/02/2024';
      const dateObj = convertDateStrToDate(dateStr);
      expect(dateObj).toEqual(new Date('2024-02-16T00:00:00'));
    });

    it('should handle invalid date format', () => {
      const invalidDateStr = '2024-16-02';
      expect(() => convertDateStrToDate(invalidDateStr)).toThrow();
    });

    it('should handle invalid date format and show error', () => {
      const invalidDateStr = '2024-16-02';
      expect(() => convertDateStrToDate(invalidDateStr)).toThrow('Invalid date format');
    });
  });

});

