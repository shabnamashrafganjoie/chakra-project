"use client";

import React, { useState } from "react";
import { Box, Image, IconButton, Text, Badge, Flex } from "@chakra-ui/react";
import { FiHeart } from "react-icons/fi";

export interface ProductCardProps {
  data: {
    id: number;
    title: string;
    price: number;
    discountPercentage?: number;
    images?: string[];
  };
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ data, onClick }) => {
  const { images = [], title, price, discountPercentage } = data;
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
      {/* Favorite button */}
      <IconButton
        aria-label="favorite"
        icon={<FiHeart />}
        size="sm"
        position="absolute"
        top={4}
        right={4}
        zIndex={10}
        bg="gray-50"
        padding="2px"
        _hover={{ bg: "gray.100" }}
        onClick={(e) => e.stopPropagation()}
      />
{/* Product image */}
      <Box
        h="150px"
        w="full"
        mb={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        borderRadius="md"
        bg="gray.50"
      >
        {images.length > 0 ? (
          <Image
            src={images[activeIndex]}
            alt={title}
            objectFit="contain"
            maxH="full"
          />
        ) : (
          <Text fontSize="xs" color="gray.400">
            No Image
          </Text>
        )}
      </Box>
      {/* Image indicators/dots */}

      {images.length > 1 && (
        <Flex justify="center" gap={2} mb={2}>
          {images.map((_, index) => (
            <Box
              key={index}
              w={2}
              h={2}
              borderRadius="full"
              bg={index === activeIndex ? "gray.800" : "gray.300"}
              cursor="pointer"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
              }}
            />
          ))}
        </Flex>
      )}

      <Box borderBottom="1px" borderColor="gray.200" mb={2}></Box>
{/* Product title */}
      <Text fontWeight="bold" color="#242424" fontSize="12px" dir="ltr" noOfLines={1}>
        {title}
      </Text>
 {/* Product price */}
      <Text fontSize="16px" dir="ltr" color="#242424" fontWeight="bold">
        ${price}
      </Text>
{/* Discount percentage */}
      {discountPercentage && (
        <Text dir="ltr"  color="red" fontSize="12px"  mt={1} textDecoration="line-through">
          
    {discountPercentage}%

          
        </Text>
      )}
    </Box>
  );
};

export default ProductCard;




