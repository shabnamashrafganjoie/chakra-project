"use client";

import React, { useState } from "react";
import { Box, Image, IconButton, Text, Badge, Flex } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";

export interface GameCardProps {
  data: {
    id: number;
    name: string;
    rating:number;
    released:string;
    genres: { id: number; name: string }[];
  background_image: string | null;
  [key: string]: any; 
  };
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ data, onClick }) => {
  const { background_image, genres = [], name, rating, released } = data;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box
      position="relative"
      bg="white"
      borderWidth="1px"
      borderRadius="xl"
      p={3}
      cursor="pointer"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
      transition="0.2s"
      onClick={onClick}
      w="100%"
    >
      {/* قلب */}
      <IconButton
        aria-label="favorite"
        icon={<FiHeart />}
        size="sm"
        position="absolute"
        top={1}
        right={4}
        zIndex={10}
        bg="white"
        padding="1px"
        _hover={{ bg: "gray.100" }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* تصویر */}
      <Box
        h="150px"
        w="full"
        mb={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        borderRadius="md"
        
      >
        {background_image && (
          <Image
            src={background_image}
            alt={name}
            objectFit="contain"
            maxH="full"
          />
        ) }
      </Box>

     
      <Box borderBottom="1px" borderColor="gray.200" mb={2}></Box>

      {/* name */}
      <Text flexWrap="wrap" fontWeight="bold" color="#242424" fontSize="12px" dir="ltr" noOfLines={1}>
        {name}
      </Text>

      {/* rating */}
      <IoIosStar direction="ltr" color="#e2b924"/>
      <Text flexWrap="wrap" fontSize="16px" dir="ltr" color="#242424" fontWeight="bold">
        {rating}
      </Text>
      {/* genres */}
        {genres && genres.length > 0 && (
<Text flexWrap="wrap" colorScheme="blue" fontSize="10px" mt={1} dir="ltr" color="red">
{genres.map((g)=>g.name).join(", ")}
</Text>
        )}
          
      

      {/* released */}
      {released && (
        <Text flexWrap="wrap" dir="ltr"   fontSize="12px"  mt={1} >
          
    {released}

          
        </Text>
      )}
    </Box>
  );
};

export default GameCard;




