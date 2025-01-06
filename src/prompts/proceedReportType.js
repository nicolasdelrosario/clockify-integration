import inquirer from 'inquirer'

export const proceedReportType = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: 'list',
      name: 'proceed',
      message: '¿Qué tipo de reporte deseas generar?',
      choices: ['Semanal', 'Mensual'],
      default: 'Semanal',
    },
  ])

  return proceed
}
