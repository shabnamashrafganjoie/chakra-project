"use client"
import { Box, Button, Input, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Search() {
 const router = useRouter();
const [search,setSearch]=useState("");
const API_KEY = "3d6c1fae19c3464fa0e8b2c9fc9bacc0";
const handleSearch =()=>{

 const trimmed = search.trim();
   if (trimmed === "") {
    router.push("/games");  
    return;
  }

    router.push(`/games?search=${encodeURIComponent(trimmed)}`);
}
  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={10}
      p={4}
      borderRadius="lg"
      bg="gray.50"
      shadow="md"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        color="green.600"
      >
        جستجوی بازی‌ها
      </Text>

      <HStack spacing={2}>
        <Input
          placeholder="جستجو کنید..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          bg="white"
          borderColor="gray.300"
          _hover={{ borderColor: "green.400" }}
          onKeyDown={(e) => {
    if (e.key === "Enter") handleSearch();}}
        />
        <Button colorScheme="green" onClick={handleSearch}>
          جستجو
        </Button>
      </HStack>
    </Box>
  );
}