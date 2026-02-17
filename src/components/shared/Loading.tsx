"use client"
import { Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { Circles } from "react-loader-spinner";


function Loading() {
    return (



<Box position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      w="full"
      h="full"
      bg="white"
      zIndex={50}
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Spinner  size="xl" color="brand.500" />
    </Box>
    );
  }
  
  export default Loading;
  