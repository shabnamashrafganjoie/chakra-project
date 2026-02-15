"use client"
import { Box, Flex, HStack, Link, Text, IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

export default function Navbar() {
  return (
    <Box bg="white" px={6} py={4} shadow="sm" position="sticky" top="0" zIndex="100" borderBottom="1px solid" borderColor="gray.200">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        
        {/* Logo */}
        <Text fontSize="2xl" fontWeight="bold" color="brand.500">
          StockX Shop
        </Text>

        {/* Desktop Links */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          <Link href="#" _hover={{ textDecoration: "underline" }}>کاربران</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>محصولات</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>بازی ها</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>Sell</Link>
        </HStack>

        {/* Search + Mobile Hamburger */}
        <HStack spacing={4}>
          {/* Search Input */}
          <InputGroup display={{ base: "none", md: "flex" }}>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.400" />} />
            <Input type="text" placeholder="Search products..." size="sm" />
          </InputGroup>

          {/* Mobile Hamburger */}
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            display={{ base: "flex", md: "none" }}
            variant="ghost"
          />
        </HStack>
      </Flex>
    </Box>
  );
}
