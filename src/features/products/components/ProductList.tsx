"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/features/products/redux/getAllProductsSlice";
import Loading from "@/components/shared/Loading";
import ProductCard from "@/features/products/components/ProductCard";
import type { RootState, AppDispatch } from "@/store/store";
import type { Product } from "@/features/products/types/product.types";
import { usePathname,useRouter } from "next/navigation";
import { Box, Button, Flex, Heading, HStack } from "@chakra-ui/react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { loading, products, error } = useSelector(
    (state: RootState) => state.products
  );
const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
 const pathname = usePathname();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={6} p={4} width="100%">
      {loading && <Loading />}

      {error && (
        <Heading as="h2" size="lg" color="red.500" textAlign="center">
          {error}
        </Heading>
      )}
 {/* Mobile navigation buttons */}
              <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        mb={3}
        mt={2}
        display={{sm:"flex",md:"none"}}
       
      >
      <HStack spacing={3} flexWrap="wrap"  >
        <Button
          size="sm"
          onClick={() => router.push("/")}
          bg={pathname === "./" ? "#2f855a" : "white"}
          color={pathname === "./" ? "white" : "#2f855a"}
          border="1px solid"
          borderColor="#2f855a"
          _hover={{
            bg: "#2f855a",
            color: "white",
          }}
        >
          خانه
        </Button>
      
        <Button
          size="sm"
          onClick={() => router.push("/products")}
          bg={pathname === "/products" ? "#2f855a" : "white"}
          color={pathname === "/products" ? "white" : "#2f855a"}
          border="1px solid"
          borderColor="#2f855a"
          _hover={{
            bg: "#2f855a",
            color: "white",
          }}
        >
          محصولات
        </Button>
      
        <Button
          size="sm"
          onClick={() => router.push("/games")}
          bg={pathname === "/games" ? "#2f855a" : "white"}
          color={pathname === "/games" ? "white" : "#2f855a"}
          border="1px solid"
          borderColor="#2f855a"
          _hover={{
            bg: "#2f855a",
            color: "white",
          }}
        >
          بازی ها
        </Button>
      </HStack>
           </Flex>    
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }} 
        gap={6}
        width="100%"
      >
        {/* Sidebar with filters */}
  <Box w={{ base: "100%", md: "30%" }} border="1px solid #ddd" p={4} rounded="md" h="fit-content" bg="gray.50">
  <Heading as="h3" size="md" mb={4}>فیلتر محصولات</Heading>

  {/* MultiSelectDropdown */}
  <MultiSelectDropdown
  options={products} 
  onChange={(selected) => setSelectedProducts(selected)} 
/>


</Box>
 {/* Products grid */}
        <Box w={{ base: "100%", md: "70%" }}>
          {products.length > 0 && (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(162px, 1fr))"
              gap={4}
            >
  {/* Show selected products if any, otherwise show all products */}

           {(selectedProducts.length > 0 ? selectedProducts : products).map((product: Product) => (
  <ProductCard
    key={product.id}
    data={product}
    onClick={() => router.push(`/products/${product.id}`)}
  />
))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
