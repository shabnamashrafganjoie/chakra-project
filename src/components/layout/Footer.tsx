import { Box, Flex, Text, Link, Stack, VStack, HStack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="gray.50" color="gray.700" py={10} dir="ltr">
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
            StockX
          </Text>
        </Box>

    
        <HStack spacing={{ base: 4, md: 10 }} wrap="wrap">
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>قوانین و مقررات</Link>
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>سوالات متداول</Link>
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>ارتباط با ما</Link>
          <Link fontSize="12px" href="#" _hover={{ textDecoration: "underline" }}>درباره ما</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
