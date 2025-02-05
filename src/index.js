import { generateDailyReport } from './generateDailyReport.js'
import { generateMonthlyReport } from './generateMonthlyReport.js'
import { generateWeeklyReport } from './generateWeeklyReport.js'
import { generateWorkspacesAndUsers } from './generateWorkspacesAndUsers.js'

import { proceedWeeklyReport } from './prompts/proceedWeeklyReport.js'
import { proceedWorkspacesAndUsers } from './prompts/proceedWorkspacesAndUsers.js'

const main = async () => {
  // * Preguntamos si solo desea generar los workspaces y users
  const shouldJustGenerateWorkspacesAndUsers = await proceedWorkspacesAndUsers()
  if (shouldJustGenerateWorkspacesAndUsers)
    return await generateWorkspacesAndUsers()

  await generateWorkspacesAndUsers()
  await generateDailyReport()
  await generateMonthlyReport()

  // * Los lunes generamos el reporte semanal de la semana pasada
  const shouldGenerateWeeklyReport = await proceedWeeklyReport()
  if (shouldGenerateWeeklyReport) await generateWeeklyReport()

  return console.log('✅ Reportes generados correctamente')
}

main()
