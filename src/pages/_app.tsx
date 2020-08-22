import 'normalize.css'

import React, { CSSProperties } from 'react'
import styled from 'reshadow'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { theme } from '~/utils/styles'
import { FC } from '~/utils/types'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return styled()`
    :global(html) {
      font-family: 'Open Sans', sans-serif;
    }

    :global(ul) {
      margin: unset;
      padding: unset;
      list-style-type: none;
    }

    :global(button),
    :global(a) {
      cursor: pointer;
    }

    app {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      color: var(--font);
      --icon: var(--main);
    }

    .Component {
      flex-grow: 1;
    }
  `(
    <app style={theme as CSSProperties}>
      <Head>
        <title>Guild</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=1260"></meta>
      </Head>
      <Component {...pageProps} />
    </app>,
  )
}

export default App
