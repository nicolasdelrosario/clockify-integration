import inquirer from 'inquirer'

export const proceedWeeklyReport = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: '🙋 ¿Desea generar un reporte semanal?',
      default: true,
    },
  ])

  return proceed
}
