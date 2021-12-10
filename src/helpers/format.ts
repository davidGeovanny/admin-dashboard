export const formatDate = ( date: string | number | Date | null | undefined ): string => {
  const d = new Date( date ? date : new Date() );

  const year = d.getFullYear();
  let month  = '' + ( d.getMonth() + 1 );
  let day    = '' + d.getDate();

  
  if( month.length < 2 ) {
    month = '0' + month;
  }

  if( day.length < 2 ) {
    day = '0' + day;
  }

  return [ year, month, day ].join('-');
}

export const formatCurrency = ( currency: number ): string => {
  const formatMX = Intl.NumberFormat('es-MX', {
    style:    'currency',
    currency: 'MXN',

  });

  return formatMX.format( currency );
}

export const formatNumberWithCommas = ( x: number ): string => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}