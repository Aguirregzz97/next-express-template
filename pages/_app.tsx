import React from "react"
import "../client/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../client/layouts/Main"

const Website = ({ Component, pageProps, router }: AppProps) => {
  return (
    <React.StrictMode>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </React.StrictMode>
  )
}

export default Website
