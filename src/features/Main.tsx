import React from 'react'
import styled from 'reshadow'

import { FC } from '~/utils/types'
import { Action } from '~/blocks'

export const Main: FC = ({ className = '' }) => {
  return styled()`
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
      background-image: url('/img/logo.svg');
      background-repeat: round;
    }
    Action {
      font-size: 35vmin;
    }
  `(
    <main>
      <Action href="/" ratio={1} transform="scale(1.1)">
        🔥
      </Action>
    </main>,
  )
}
