"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/features/products/redux/getAllProductsSlice";
import Loading from "@/components/shared/Loading";
import ProductCard from "@/features/products/components/ProductCard";
import type { RootState, AppDispatch } from "@/store/store";
import type { Product } from "@/features/products/types/product.types";
import { useRouter } from "next/navigation";
import { Box, Heading } from "@chakra-ui/react";
import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // گرفتن state محصولات از Redux
  const { loading, products, error } = useSelector(
    (state: RootState) => state.products
  );
const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={6} p={4} width="100%">
      {/* لودینگ */}
      {loading && <Loading />}

      {/* خطا */}
      {error && (
        <Heading as="h2" size="lg" color="red.500" textAlign="center">
          {error}
        </Heading>
      )}
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }} // responsive
        gap={6}
        width="100%"
      >
        {/* سمت راست: sidebar */}
  <Box w={{ base: "100%", md: "30%" }} border="1px solid #ddd" p={4} rounded="md" h="fit-content" bg="gray.50">
  <Heading as="h3" size="md" mb={4}>فیلتر محصولات</Heading>

  {/* MultiSelectDropdown */}
  <MultiSelectDropdown
  options={products} // آرایه کامل محصولات از Redux
  onChange={(selected) => setSelectedProducts(selected)} // انتخاب‌ها رو نگه دار
/>


</Box>

        {/* سمت چپ: محصولات */}
        <Box w={{ base: "100%", md: "70%" }}>
          {products.length > 0 && (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(162px, 1fr))"
              gap={4}
            >
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
