import React from "react"
import Head from "next/head"
import { Router } from "next/dist/client/router"
import favicon from "../assets/favicon/favicon.ico"

type MainProps = {
  router: Router
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Template - Template</title>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      {children}
    </main>
  )
}

export default Main
