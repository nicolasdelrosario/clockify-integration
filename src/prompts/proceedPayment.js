import inquirer from 'inquirer'

export const proceedPayment = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message:
        '¿Desea registrar las horas trabajadas y el pago de la semana de los usuarios?',
      default: true,
    },
  ])

  return proceed
}
