import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import NavigationBar from "../components/NavigationBar"
import { useEffect } from 'react';
import  Router  from 'next/router';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        Router.push("/appointments");

    }, []);
    return <>
        <ChakraProvider>
            <NavigationBar />
            <Component {...pageProps} />
        </ChakraProvider>
    </>
}

export default MyApp
