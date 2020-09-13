function periodValidation(period) {
  if (period.length !== 7) {
    throw new Error(`Valor invalido (${period}). Utilize o formato yyyy-mm.`)
  }

  const year = period.substring(0, 4);
  //verifica já conertendo para number
  if (!+year) {
    throw new Error(`Ano inválido (${year}).`);
  }

  const month = period.substring(5, 7)
  if (!+month || +month < 1 || +month > 12) {
    throw new Error(`Mês invalido (${month}).`)

  }

}

function createPeriodFrom(year, month) {
  //padStart para preencher a string com a string '0' até um certo comprimento
  //predefinido (4 e 2 aqui) início da string e retorna uma string resultante que atinge 
  //um determinado comprimento
  return `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}`
}

function createDateFrom(year, month, day) {
  return `${createPeriodFrom(year, month)}-${day.toString().padStart(2, '0')}`
}

module.exports = {
  periodValidation,
  createPeriodFrom,
  createDateFrom

}