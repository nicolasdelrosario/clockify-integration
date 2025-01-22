import { getWorkspaces } from './services/clockify/workspace.js'
import { getUsers } from './services/clockify/user.js'

import { getWorkspace, createWorkspace } from './services/supabase/workspace.js'
import { getUser, createUser } from './services/supabase/user.js'

export async function generateWorkspacesAndUsers() {
  const workspaces = await getWorkspaces()

  for (const workspace of workspaces) {
    const { id } = workspace

    let workspaceRecord = await getWorkspace(id)

    if (!workspaceRecord) {
      await createWorkspace(workspace)
      workspaceRecord = await getWorkspace(id)
    }

    const users = await getUsers(id)

    for (const user of users) {
      const { id } = user

      let userRecord = await getUser(id)

      if (!userRecord) {
        await createUser(user)
        userRecord = await getUser(id)
      }
    }
  }

  console.log('Workspaces y Usuarios creados correctamente')
}
