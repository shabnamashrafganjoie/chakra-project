'use client'

import { ChakraProvider } from '@chakra-ui/react'
import theme from "@/styles/theme";
export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}



// import { ChakraProvider } from '@chakra-ui/react'
// import { ReactNode } from "react";

// type ProvidersProps = {
//   children: ReactNode;
//   theme: any;
// };
// export function Providers({ children, theme }: ProvidersProps) {
//   return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
// }