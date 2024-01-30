import { ReactElement } from 'react'
import ISession from '../../../../interfaces/Session'

import useSessionCard from './useSessionCard'

export default function SessionCard({
  session,
}: {
  session: ISession
}): ReactElement {
  const { mutation } = useSessionCard(session.sessionId)

  return (
    <div>
      <p>{session.sessionId}</p>
      <button type='button' onClick={() => mutation.mutate()}>
        Delete session
      </button>
    </div>
  )
}
