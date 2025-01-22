import inquirer from 'inquirer'

export const proceedWorkspacesAndUsers = async () => {
  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: '¿Desea solo generar los workspaces y usuarios?',
      default: true,
    },
  ])

  return proceed
}
