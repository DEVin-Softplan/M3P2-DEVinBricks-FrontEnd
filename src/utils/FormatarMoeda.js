export const formatarMoeda = (valor) => {
  var valorFormatado = new Intl.NumberFormat('PT-BR', { style: 'currency', currency: 'BRL' }).format(valor)

  return valorFormatado;
};