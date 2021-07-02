import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Login from "../components/Login";
import Layout from "../components/Layout";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const user = false;
  const token = false;
  return (
    <AuthProvider>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {user && token ? (
          <Layout {...pageProps}>
            {" "}
            <Component {...pageProps} />{" "}
          </Layout>
        ) : (
          <Login />
        )}
      </ThemeProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
