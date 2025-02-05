import { getTimeEntries } from './services/clockify/timeEntries.js'
import { getUsers } from './services/clockify/user.js'
import { getWorkspaces } from './services/clockify/workspace.js'

import {
  getPaymentPerHour,
  registerDailyPayment,
} from './services/supabase/payment.js'
import { getUser } from './services/supabase/user.js'
import { getWorkspace } from './services/supabase/workspace.js'

import { calculateTotalHours } from './utils/calculateTotalHours.js'
import { calculateTotalPayment } from './utils/calculateTotalPayment.js'
import { getStartAndEndOfYesterday } from './utils/getStartAndEndOfYesterday.js'

export async function generateDailyReport() {
  const reports = []
  const workspaces = await getWorkspaces()

  const { startDate, endDate } = getStartAndEndOfYesterday()

  for (const workspace of workspaces) {
    const { id } = workspace
    const workspaceRecord = await getWorkspace(id)

    const users = await getUsers(id)

    for (const user of users) {
      const { id } = user
      const userRecord = await getUser(id)

      const timeEntries = await getTimeEntries(
        workspaceRecord.id,
        userRecord.id,
        startDate,
        endDate
      )

      const totalHours = calculateTotalHours(timeEntries)
      const { cost_per_hour } = await getPaymentPerHour(userRecord.level_id)
      const total = calculateTotalPayment(totalHours, cost_per_hour)

      if (total > 0 && totalHours > 0) {
        const data = {
          email: userRecord.email,
          talent: userRecord.name,
          company: workspaceRecord.name,
          phone: userRecord.phone,
          total_hours: totalHours,
          total_payment: total,
          start_date: startDate,
          end_date: endDate,
        }

        await registerDailyPayment(data)
        reports.push(data)
      }
    }
  }

  console.group('✅ Reporte diario:')
  console.table(reports)
  console.groupEnd()
}
