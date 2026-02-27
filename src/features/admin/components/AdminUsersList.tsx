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
import {useUser} from "@/features/admin/hooks/useAdminUsers"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminDashboard() {
  const isMobile = useBreakpointValue({ base: true, md: false });
const router = useRouter();
const { user: users, loading, error } = useUser(0);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const totalPages = Math.ceil(users.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedUsers = users.slice(
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
      variant="outline"
      onClick={() => router.push("/admin")}
    >
      Dashboard
    </Button>

    <Button
      size="sm"
      variant="solid"
      colorScheme="purple"
      onClick={() => router.push("/admin/users")}
    >
      Users
    </Button>

    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push("/admin/products")}
    >
      Products
    </Button>
  </HStack>
</Flex>

          
        </Flex>

        
        {/* User Table / Card Section */}
        <Box bg="white" p={{ base: 4, md: 6 }} rounded="xl" shadow="sm" width="100%">
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            Users List
          </Text>

          {isMobile ? (
            // Mobile: Cards
            <VStack spacing={4} width="100%">
              {paginatedUsers.map((u) => (
                <MobileUserCard key={u.email} user={u} />
              ))}
            </VStack>
          ) : (
            // Desktop: Table
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedUsers.map((u) => (
                    <UserRow key={u.email} user={u} />
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

function UserRow({ user }: { user: any }) {
  return (
    <Tr>
      <Td>
        <HStack>
          <Avatar size="sm" name={user.firstName} />
          <Text fontWeight="medium">{user.firstName}</Text>
        </HStack> 
      </Td>
      <Td>{user.firstName} {user.lastName}</Td>
      <Td>{user.email}</Td>
      <Td>{user.phone}</Td>
  <Td>{user.role}</Td>
      <Td>
        <Badge colorScheme={user.role === "Admin" ? "purple" : "gray"} rounded="full" px={3}>
          {user.role}
        </Badge>
      </Td>
    </Tr>
  );
}

/* ========================== */
/* Mobile Card */
function MobileUserCard({ user }: { user: any }) {
  return (
    <Box bg="gray.50" w="100%" borderRadius="md" p={4} shadow="sm">
      <Flex justify="space-between" align="center" flexWrap="wrap" gap={2}>
        <HStack spacing={3} flex="1" minW="200px">
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
          <VStack align="start" spacing={0}>
            <Text fontWeight="600">{user.firstName} {user.lastName}</Text>
            <Text fontSize="sm" color="gray.600" wordBreak="break-word">
              {user.email}
            </Text>
            <Text fontSize="sm" color="gray.600" wordBreak="break-word">
              {user.phone}
            </Text>
          </VStack>
        </HStack>

      <Badge colorScheme={user.role === "Admin" ? "purple" : "gray"} rounded="full" px={3}>
        {user.role}
      </Badge>

      </Flex>

    </Box>
  );
}