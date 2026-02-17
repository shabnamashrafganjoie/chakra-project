"use client"
import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Input, InputGroup, InputLeftElement, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <>
      <Box 
        bg="gray.50"
        h="50px"
        shadow="sm"
        position="sticky"
        top="68"
        zIndex="100"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={{ base: 2, md: 6 }} // padding کمتر در موبایل
        py="2"
      >
        {/* دسکتاپ */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>کاربران</Link>
          <Link fontSize="12px" href="./products" _hover={{ textDecoration: "underline" }}>محصولات</Link>
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>بازی ها</Link>
          <Link fontSize="12px" href="./" _hover={{ textDecoration: "underline" }}>خانه</Link>
        </HStack>

        {/* موبایل - سرچ full-width */}
        <Flex 
          display={{ base: "flex", md: "none" }} 
          w="100%" 
         
          justify="center"
        >
          <InputGroup w="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="جستجو..."
              size="sm"
              bg="gray.50"
              borderRadius="md"
              _focus={{
                bg: "white",
                borderColor: "black",
                boxShadow: "none"
              }}
            />
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
}
