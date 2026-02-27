"use client";

import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Badge,
  Button,
  Grid,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import AdminSidebar from "./AdminSidebar";
import {
  FiPackage,
  FiUsers,
} from "react-icons/fi";
import { useUser } from "@/features/admin/hooks/useAdminUsers";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Loading from "@/components/shared/Loading";
import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {useAdminProducts} from "@/features/admin/hooks/useAdminProducts";
import { Product } from "@/features/admin/types/adminProduct.type";


export default function AdminDashboard() {
  const pathname = usePathname();
  const isMobile = useBreakpointValue({ base: true, md: false });
    // NOTE: useUser hook is called with id=0 but it fetches all users (see hook implementation)

  const { user: users } = useUser(0);
    const { loading, error   } = useSelector(
    (state: RootState) => state.games
  );
  const router = useRouter();
  // Calculate total users count
  const usersCount = users?.length || 0;

  const { data: session } = useSession();
  // Extract unique roles - filtering out undefined values
  const uniqueRoles: string[] = users 
    ? users
        .map(u => u.role)
        .filter((role): role is string => role !== undefined && role !== null)
        .filter((role, index, self) => self.indexOf(role) === index)
    : [];
const username = session?.user ? ((session.user as any).username || session.user.name) : "Admin";
const { products} = useAdminProducts();
  //total products count
  const productsCount = products?.length || 0;
  return (
    <Flex minH="100vh" bg="#F5F5F5" width="100%">
      <AdminSidebar />

      {/* Main Content */}
      <Box 
        flex="1" 
        ml={{ base: 0, md: "0" }}
        minH="100vh"
        width={{ base: "100%", md: "calc(100% - 260px)" }}
      >
         {/* Loading indicator */}
      {loading && <Loading />}

      {/* Error message display */}
      {error && (
        <Heading as="h2" size="lg" color="red.500" textAlign="center">
          {error}
        </Heading>
      )}
    
        <Flex
  justify="space-between"
  align={{ base: "start", md: "center" }}
  direction={{ base: "column", md: "row" }}
  gap={4}
  mb={3}
  mt={2}
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

        {/* Dashboard Content */}
        <Box p={{ base: 3, md: 8 }} width="100%">
          {/* Welcome Section */}
          <Flex justify="space-between" align="center" mb={6} width="100%">
            <Box>
              <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="700">
                Welcome back,{username}👋
              </Text>
            </Box>
          </Flex>

          {/* Stats Grid - Full Width */}
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={{ base: 3, md: 6 }}
            mb={6}
            width="100%"
          >
            <StatCard
              icon={FiUsers}
              label="Total Users"
              value={usersCount.toString()}
            
              isPositive={true}
              bgColor="#0A0A0A"
              roles={uniqueRoles}
            />
            <StatCard
              icon={FiPackage}
              label="Total Products"
              value={productsCount.toString()}
          
              isPositive={false}
              bgColor="#0A0A0A"
              roles={[]}
            />
          </Grid>

          {/* Users List */}
          <Box 
            bg="white" 
            p={{ base: 4, md: 6 }} 
            rounded="xl" 
            shadow="sm" 
            border="1px solid" 
            borderColor="gray.100"
            width="100%"
            marginBottom={2}
          >
            <Flex justify="space-between" align="center" mb={4} width="100%">
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="700">
                Users List
              </Text>
              <HStack spacing={2}>
              
                <Button 
                  variant="ghost" 
                  size={{ base: "xs", md: "sm" }} 
                  color="#00FF5F" 
                  _hover={{ bg: "rgba(0,255,95,0.1)" }}
                  onClick={()=>router.push("/admin/users")}
                >
                  View All
                </Button>
              </HStack>
            </Flex>

            {isMobile ? (
              // Mobile: Card View
              <VStack spacing={3} width="100%">
                {users?.slice(0,3).map((u) => (
                  <MobileUserCard key={u.id} user={u} />
                ))}
              </VStack>
            ) : (
              // Desktop: Table View
              <Box overflowX="auto" width="100%">
                <Table variant="unstyled" size="md" width="100%">
                  <Thead>
                    <Tr borderBottom="1px solid" borderColor="gray.100">
                      <Th color="gray.500" fontWeight="500" width="25%">Name</Th>
                      <Th color="gray.500" fontWeight="500" width="30%">Email</Th>
                      <Th color="gray.500" fontWeight="500" width="20%">Role</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users?.slice(0,3).map((u) => (
                      <Tr key={u.id} _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="500">{u.firstName} {u.lastName}</Td>
                        <Td>{u.email}</Td>
                        <Td>
                          {u.role && (
                            <Badge 
                              colorScheme={u.role === "ADMIN" ? "purple" : "blue"}
                              rounded="full"
                              px={3}
                              py={1}
                            >
                              {u.role}
                            </Badge>
                          )}
                        </Td>

                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>


                    {/* Products List */}
          <Box 
            bg="white" 
            p={{ base: 4, md: 6 }} 
            rounded="xl" 
            shadow="sm" 
            border="1px solid" 
            borderColor="gray.100"
            width="100%"
          >
            <Flex justify="space-between" align="center" mb={4} width="100%">
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="700">
                Products List
              </Text>
              <HStack spacing={2}>
              
                <Button 
                  variant="ghost" 
                  size={{ base: "xs", md: "sm" }} 
                  color="#00FF5F" 
                  _hover={{ bg: "rgba(0,255,95,0.1)" }}
                  onClick={()=>router.push("/admin/products")}
                >
                  View All
                </Button>
              </HStack>
            </Flex>

            {isMobile ? (
              // Mobile: Card View
              <VStack spacing={3} width="100%">
                {products?.slice(0,3).map((p) => (
                  <MobileProductCard key={p.id} product={p} />
                ))}
              </VStack>
            ) : (
              // Desktop: Table View
              <Box overflowX="auto" width="100%">
                <Table variant="unstyled" size="md" width="100%">
                  <Thead>
                    <Tr borderBottom="1px solid" borderColor="gray.100">
                      <Th color="gray.500" fontWeight="500" width="25%">Name</Th>
                      <Th color="gray.500" fontWeight="500" width="30%">Email</Th>
                      <Th color="gray.500" fontWeight="500" width="20%">Role</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {products?.slice(0,3).map((p) => (
                      <Tr key={p.id} _hover={{ bg: "gray.50" }}>
                        <Td fontWeight="500">{p.title}</Td>
                        <Td>{p.category}</Td>
                        <Td>
                          {p.price && (
                            <Badge 
                              colorScheme={"blue"}
                              rounded="full"
                              px={3}
                              py={1}
                            >
                              ${p.price}
                            </Badge>
                          )}
                        </Td>

                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

/* ========================== */
// Mobile product Card Component
function MobileProductCard({ product }: { product: any }) {
  return (
    <Box 
      width="100%" 
      bg="gray.50" 
      p={4} 
      rounded="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <HStack spacing={3}>
          <Avatar size="sm" name={product.title} />
          <Box>
            <Text fontWeight="700" fontSize="sm">
              {product.title}
            </Text>
            <Text fontSize="xs" color="gray.500">{product.category}</Text>
            <Text fontSize="xs" color="gray.500">{product.brand}</Text>
          </Box>
        </HStack>
      <Flex justify="space-between" align="center" mt={3}>
        {product.price && (
          <Badge 
            colorScheme={"blue"}
            rounded="full"
            px={3}
            py={1}
            fontSize="xs"
          >
            ${product.price}
          </Badge>
        )}
  
      </Flex>
      </Flex>
      

    </Box>
  );
}
/* ========================== */
// Mobile User Card Component
function MobileUserCard({ user }: { user: any }) {
  return (
    <Box 
      width="100%" 
      bg="gray.50" 
      p={4} 
      rounded="lg"
      border="1px solid"
      borderColor="gray.100"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <HStack spacing={3}>
          <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
          <Box>
            <Text fontWeight="700" fontSize="sm">
              {user.firstName} {user.lastName}
            </Text>
            <Text fontSize="xs" color="gray.500">{user.email}</Text>
            <Text fontSize="xs" color="gray.500">{user.phone}</Text>
          </Box>
        </HStack>
      <Flex justify="space-between" align="center" mt={3}>
        {user.role && (
          <Badge 
            colorScheme={user.role === "ADMIN" ? "purple" : "blue"}
            rounded="full"
            px={3}
            py={1}
            fontSize="xs"
          >
            {user.role}
          </Badge>
        )}
  
      </Flex>
      </Flex>
      

    </Box>
  );
}

/* ========================== */

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
 
  isPositive,
  bgColor,
  roles 
}: { 
  icon: any; 
  label: string; 
  value: string; 

  isPositive: boolean;
  bgColor: string;
  roles: string[];
}) {
  return (
    <Box 
      bg={bgColor} 
      p={{ base: 4, md: 6 }} 
      rounded="xl" 
      border="1px solid" 
      borderColor="gray.800"
      color="white"
      width="100%"
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Box
          p={1.5}
          bg="rgba(255,255,255,0.1)"
          rounded="lg"
        >
          <Icon size={16} />
        </Box>

      </Flex>
      
      <Text fontSize="xs" color="gray.400" mb={0.5}>
        {label}
      </Text>
      
      <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="700" mb={2}>
        {value}
      </Text>

      {roles && roles.length > 0 && (
        <Flex wrap="wrap" gap={1} mt={2}>
          {roles.map((role, index) => (
            <Badge
              key={index}
              colorScheme={role === "ADMIN" ? "purple" : "blue"}
              rounded="full"
              px={2}
              py={0.5}
              fontSize="2xs"
            >
              {role}
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  );
}