"use client";

import React, { useState } from "react";
import { Box, Image, IconButton, Text, Badge, Flex } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { Result } from "postcss";
import { GamePlatform } from "../types/game.types";


export interface GameCardProps {
  data: {
    id: number;
    name: string;
    rating:number;
    released:string;
    genres: { id: number; name: string }[];
  background_image: string | null;
  parent_platforms: GamePlatform[];
  [key: string]: any; 
  };
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ data, onClick }) => {
  const { background_image, genres = [], name, rating, released } = data;
  const [activeIndex, setActiveIndex] = useState(0);// NOTE: activeIndex state is declared but never used

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
      {/* Favorite button */}
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
      {/* Game image */}

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
      {/* Game title */}

      <Text flexWrap="wrap" fontWeight="bold" color="#242424" fontSize="12px" dir="ltr" noOfLines={1}>
        {name}
      </Text>
    {/* Rating */}

        <Flex align="center" gap={2} dir="ltr">
        <FaStar color="#facc15" />
        <Text fontSize="lg" fontWeight="bold" >
          {rating ?? "N/A"}
        </Text>
      </Flex>
      
      {/* Genres */}
        {genres && genres.length > 0 && (
<Text flexWrap="wrap" colorScheme="blue" fontSize="10px" mt={1} dir="ltr" color="red">
{genres.map((g)=>g.name).join(", ")}
</Text>
        )}
          
      
{/* Release date */}
      {released && (
        <Text flexWrap="wrap" dir="ltr"   fontSize="12px"  mt={1} >
          
    {released}

          
        </Text>
      )}


{data.parent_platforms && data.parent_platforms.length > 0 && (
  <Text flexWrap="wrap" colorScheme="blue" fontSize="10px" mt={1} dir="ltr" >
    {data.parent_platforms.map((pp: GamePlatform) => pp.platform?.name).filter(Boolean).join(", ")}
  </Text>
)}
       

     
    </Box>
  );
};

export default GameCard;




