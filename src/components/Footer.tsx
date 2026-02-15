import { Box, Flex, Text, Link, Stack, VStack, HStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.50" color="gray.700" py={10}>
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        mx="auto"
        px={6}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
      >
  
        <Box mb={{ base: 6, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" color="brand.500">
            StockX Shop
          </Text>
        </Box>

    
        <HStack spacing={{ base: 4, md: 10 }} wrap="wrap">
          <Link href="#" _hover={{ textDecoration: "underline" }}>About</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>Contact</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>Privacy</Link>
          <Link href="#" _hover={{ textDecoration: "underline" }}>Terms</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
