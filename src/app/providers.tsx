'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from "@/styles/theme";
import { SessionProvider } from "next-auth/react";
export function Providers({ children,session }: { children: React.ReactNode, session?: any }) {
  return(
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </SessionProvider>

  ) 
}


