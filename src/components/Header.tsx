"use client"
import {
  Box,
  Flex,
  HStack,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link
} from "@chakra-ui/react";

import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <Box
        bg="white"
        px={6}
        py={4}
        shadow="sm"
        position="sticky"
        top="0"
        zIndex="100"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex 
          maxW="1300px" 
          mx="auto" 
          align="center"
          direction={{ base: "row", md: "row" }}
          position={{ base: "relative", md: "static" }}
          justify={{ base: "space-between", md: "flex-start" }}
        >

          <Flex 
            flex={{ base: "0", md: "1" }}
            display={{ base: "none", md: "flex" }}
          >
            <Text fontSize="2xl" fontWeight="bold" color="brand.500">
              StockX
            </Text>
          </Flex>



<Flex 
            flex={{ base: "1", md: "1" }} 
            justify="flex-end"
            display={{ base: "block", md: "none" }}
          >
            <HStack spacing={3}>
            <IconButton
                aria-label="menu"
                icon={<HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                variant="ghost"
              />
              
              {/* <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>ورود/‌ثبت‌نام</Link> */}

            </HStack>
          </Flex>

          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="brand.500"
            display={{ base: "block", md: "none" }}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            StockX
          </Text>

          <Flex 
            flex={{ base: "0", md: "2" }} 
            justify="center"
            display={{ base: "none", md: "flex" }}
          >
            <InputGroup maxW="700px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="جستجو..."
                size="sm"
                bg="gray.50"
                borderRadius="2px"
                _focus={{
                  bg: "white",
                  borderColor: "black",
                  boxShadow: "none"
                }}
              />
            </InputGroup>
          </Flex>

          <Flex 
            flex={{ base: "1", md: "1" }} 
            justify="flex-end"
          >
            <HStack spacing={3}>
            <Link display={{ base: "none", md: "block" }} fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>ورود/‌ثبت‌نام</Link>

              {/* <IconButton
                aria-label="menu"
                icon={<HamburgerIcon />}
                display={{ base: "flex", md: "none" }}
                variant="ghost"
              /> */}


<Link display={{ base: "block", md: "none" }} fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>ورود/‌ثبت‌نام</Link>

            </HStack>
          </Flex>
        </Flex>
      </Box>

      <Navbar />
    </>
  );
}