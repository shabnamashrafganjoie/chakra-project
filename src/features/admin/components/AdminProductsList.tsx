"use client";

import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Input,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import AdminSidebar from "./AdminSidebar";
import {useAdminProducts} from "@/features/admin/hooks/useAdminProducts"
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Product } from "@/features/admin/types/adminProduct.type";
export default function AdminDashboard() {
   const pathname = usePathname();

  const isMobile = useBreakpointValue({ base: true, md: false });
const router = useRouter();
const { products, loading, error } = useAdminProducts();
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(products.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedProducts = products.slice(
  startIndex,
  startIndex + itemsPerPage
);
  return (
    <>
    <Flex minH="100vh" bg="gray.50" width="100%">
      
      <AdminSidebar />

      {/* Main Content */}
      <Box flex="1" p={{ base: 4, md: 8 }} maxW="100%" overflowX="hidden">
        {/* Topbar */}
        <Flex 
          direction={{ base: "column", sm: "row" }} 
          justify="space-between" 
          align={{ base: "stretch", sm: "center" }} 
          gap={4}
          mb={6}
        >

        <Flex
  justify="space-between"
  align={{ base: "start", md: "center" }}
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={6}
  display={{md:"none"}}
>

  <HStack spacing={3} flexWrap="wrap">
    <Button
      size="sm"
      
      onClick={() => router.push("/admin")}
        variant={pathname === "/admin" ? "solid" : "outline"}
  colorScheme="purple"
    >
      Dashboard
    </Button>

    <Button
      size="sm"
      
     
      onClick={() => router.push("/admin/users")}
       variant={pathname === "/admin/users" ? "solid" : "outline"}
  colorScheme="purple"
    >
      Users
    </Button>

    <Button
      size="sm"
      
      onClick={() => router.push("/admin/products")}
        variant={pathname === "/admin/products" ? "solid" : "outline"}
  colorScheme="purple"
    >
      Products
    </Button>
  </HStack>
</Flex>

        
        </Flex>

        
        {/* Product Table / Card Section */}
        <Box bg="white" p={{ base: 4, md: 6 }} rounded="xl" shadow="sm" width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            Products List
          </Text>

          {isMobile ? (
            // Mobile: Cards
            <VStack spacing={4} width="100%">
              {paginatedProducts.map((p:Product) => (
                <MobileProductCard key={p.id} product={p} />
              ))}
            </VStack>
          ) : (
            // Desktop: Table
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Brand</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedProducts.map((p:Product) => (
                    <ProductRow key={p.id} product={p} />
                  ))}
                </Tbody>
              </Table>
            </Box>
            
          )}
                <Flex justify="center" mt={6} gap={2} flexWrap="wrap" dir="ltr">
  <Button
    size="sm"
    onClick={() => setCurrentPage((prev) => prev - 1)}
    isDisabled={currentPage === 1}
  >
    Previous
  </Button>

  {Array.from({ length: totalPages }, (_, i) => (
    <Button
      key={i}
      size="sm"
      variant={currentPage === i + 1 ? "solid" : "outline"}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </Button>
  ))}

  <Button
    size="sm"
    onClick={() => setCurrentPage((prev) => prev + 1)}
    isDisabled={currentPage === totalPages}
  >
    Next
  </Button>
</Flex>
        </Box>
      </Box>

    </Flex>

</>

  );
}

/* ========================== */

function ProductRow({ product }: { product: any }) {
  return (
    <Tr>
      <Td>
        <HStack>
          <Avatar size="sm" name={product.title} />
          <Text fontWeight="medium">{product.title}</Text>
        </HStack> 
      </Td>
      <Td>{product.title}</Td>
      <Td>{product.category}</Td>
  <Td>{product.brand}</Td>
      <Td>{product.price}</Td>
      <Td>
        <Badge colorScheme={"gray"} rounded="full" px={3}>
          {product.category}
        </Badge>
      </Td>
    </Tr>
  );
}

/* ========================== */
/* Mobile Card */
function MobileProductCard({ product }: { product: any }) {
  return (
    <Box bg="gray.50" w="100%" borderRadius="md" p={4} shadow="sm">
      <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
        <HStack spacing={3} flex="1" minW="200px">
          <Avatar size="sm" name={`${product.title}`} src={product.images?.[0]}/>
          <VStack align="start" spacing={0}>
            <Text fontWeight="600">{product.title}</Text>
            <Text fontSize="sm" color="gray.600" wordBreak="break-word">
              {product.category}
            </Text>
            <Text fontSize="sm" color="gray.600" wordBreak="break-word">
              {product.brand}
            </Text>
          </VStack>
        </HStack>

      <Badge colorScheme={"gray"} rounded="full" px={3}>
        ${product.price}
      </Badge>

      </Flex>

    </Box>
  );
}