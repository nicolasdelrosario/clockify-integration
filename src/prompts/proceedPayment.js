import inquirer from 'inquirer'

export const proceedPayment = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: '¿Desea generar reporte de pagos?',
      default: true,
    },
  ])

  return proceed
}
