const cloneObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj, (_, value) => 
    value === undefined ? null : value
  ));
};


const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const generateInvoiceNumber = (): string => {
  const prefix = 'INV';
  const date = new Date();

  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);

  const result = `${ prefix }-${formattedDate}-${random}`;

  return result;
};

const convertDateStrToDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/');

  if (!day || !month || !year || isNaN(new Date(`${year}-${month}-${day}`).getTime())) {
    throw new Error('Invalid date format');
  }

  const dateObject = new Date(`${year}-${month}-${day}T00:00:00`);
  return dateObject;
};

export {
  cloneObject,
  sleep,
  generateInvoiceNumber,
  convertDateStrToDate
}