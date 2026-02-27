"use client";
import { Box, Flex, Image, Text, Spinner, HStack, Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { product, loading, error } = useProduct(productId);

  const [activeImage, setActiveImage] = useState(0);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!product) return <Text>Product not found</Text>;

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={8} p={8}>
       {/* Left column - Images */}
      <Box flex="1">
        <Box bg="gray.50" borderRadius="xl" p={4}>
          <Image
            src={product.images[activeImage]}
            alt={product.title}
            borderRadius="lg"
            w="100%"
            h="400px"
            objectFit="contain"
          />
        </Box>

        {/* thumbnails */}
        <HStack mt={4} spacing={3}>
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`${product.title} ${idx}`}
              boxSize="70px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              border={activeImage === idx ? "2px solid black" : "1px solid #ddd"}
              onClick={() => setActiveImage(idx)} 
            />
          ))}
        </HStack>
      </Box>
 {/* Right column - Product details */}
      <Box flex="1" display="flex" flexDirection="column" gap={4} dir="ltr">
        <Text fontSize="3xl" fontWeight="bold">
          {product.title}
        </Text>

        <Text fontSize="2xl" color="green.600" fontWeight="bold">
          ${product.price}
        </Text>

        <Text color="gray.600">{product.description}</Text>

        <HStack mt={4}>
          <Button size="lg" colorScheme="brand">
            Add to cart
          </Button>
          <Button size="lg" variant="outline">
            Favorite
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
}
