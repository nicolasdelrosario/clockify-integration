// Clockify
import { getWorkspaces } from './services/clockify/workspace.js'
import { getUsers } from './services/clockify/user.js'
import { getTimeEntries } from './services/clockify/timeEntries.js'

// Supabase
import { getWorkspace, createWorkspace } from './services/supabase/workspace.js'
import { getUser, createUser } from './services/supabase/user.js'
import { getPaymentPerHour } from './services/supabase/levels.js'
import {
  registerWeeklyPayment,
  registerMonthlyPayment,
} from './services/supabase/payment.js'

// Prompts
import { proceedReportType } from './prompts/proceedReportType.js'
import { proceedPayment } from './prompts/proceedPayment.js'

// Utils
import { getStartAndEndOfWeek } from './utils/getStartAndEndOfWeek.js'
import { getStartAndEndOfMonth } from './utils/getStartAndEndOfMonth.js'
import { calculateTotalHours } from './utils/calculateTotalHours.js'
import { calculateTotalPayment } from './utils/calculateTotalPayment.js'

const main = async () => {
  // ? Preguntamos si quiere un reporte semanal o mensual
  const proceedReports = await proceedReportType()
  // ? Preguntamos si quiere realizar el registro de los pagos
  const proceedPayments = await proceedPayment()

  const { startDate, endDate } =
    proceedReports === 'Semanal'
      ? getStartAndEndOfWeek()
      : getStartAndEndOfMonth()

  console.log(`Iniciando proceso: ${startDate} - ${endDate}`)

  // * 1. Obtener los workspaces de Clockify
  const workspaces = await getWorkspaces()

  // * 2. Conseguir o crear los workspaces en Supabase
  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces[i]

    let workspaceRecord = await getWorkspace(workspace.id)
    // ? En caso no exista el workspace, lo creamos
    if (!workspaceRecord) workspaceRecord = await createWorkspace(workspace)

    // * 3. Obtener los usuarios de Clockify
    const users = await getUsers(workspaceRecord.id)

    // * 4. Conseguir o crear los usuarios en Supabase
    for (let j = 0; j < users.length; j++) {
      const user = users[j]

      let userRecord = await getUser(user.id)
      // ? En caso no exista el usuario, lo creamos
      if (!userRecord) userRecord = await createUser(user)

      if (proceedPayments) {
        // * 5. Realizar el registro de los pagos
        // Obtener timeEntries de Clockify
        const timeEntries = await getTimeEntries(
          workspaceRecord.id,
          userRecord.id,
          startDate,
          endDate
        )
        // Calcular el total de horas trabajadas
        const totalHours = calculateTotalHours(timeEntries)
        // Obtener el pago por hora del usuario
        const paymentPerHour = await getPaymentPerHour(userRecord.level_id)
        // Calcular el pago total
        const totalPayment = calculateTotalPayment(
          totalHours,
          paymentPerHour.cost_per_hour
        )

        // * Validaciones: En caso no haya horas reportadas o un pago que realizar, no se genera el reporte.
        if (totalHours > 0 && totalPayment > 0) {
          if (proceedReports === 'Semanal') {
            await registerWeeklyPayment({
              user_id: userRecord.id,
              workspace_id: workspaceRecord.id,
              talent: userRecord.name,
              company: workspaceRecord.name,
              total_hours: totalHours,
              total_payment: totalPayment,
              start_date: startDate,
              end_date: endDate,
            })
          } else {
            await registerMonthlyPayment({
              subscription_start_date: workspaceRecord.subscription_start_date,
              user_id: userRecord.id,
              workspace_id: workspaceRecord.id,
              talent: userRecord.name,
              company: workspaceRecord.name,
              total_hours: totalHours,
              total_payment: totalPayment,
              start_date: startDate,
              end_date: endDate,
            })
          }
        }
      } else return
    }
  }

  console.log('Proceso completado.')
}

main()
