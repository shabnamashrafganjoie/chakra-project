"use client";

import {
  Box,
  Link,
  Text,
  VStack,

} from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
     export default function AdminSidebar() {
        const [mounted, setMounted] = useState(false);
 const pathname = usePathname();
        useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>

    {/* Sidebar */}
      <Box
        w="260px"
        bg="#0A0A0A"
        color="white"
        p={8}
        display={{ base: "none", md: "block" }}
      >
        <Text fontSize="xl" fontWeight="800" letterSpacing="wide" mb={12}>
          STOCKX ADMIN
        </Text>

        <VStack align="start" spacing={6}>
          <SidebarItem label="Dashboard" href="/admin" isActive={pathname === "/admin" } />
          <SidebarItem label="Users" href="/admin/users" isActive={pathname === "/admin/users" } />
          <SidebarItem label="Products" href="/admin/products" isActive={pathname === "/admin/products" } />
        </VStack>
      </Box>
    </>
  );
     }
     /* ============================= */
     
 function SidebarItem({ label, href, isActive }: { label: string; href?: string; isActive?: boolean }) {
  return (
    <NextLink href={href || "#"} passHref legacyBehavior>
      <Text
        as="a"
        display="block"
        fontWeight="600"
        letterSpacing="wide"
        cursor="pointer"
        px={4}
        py={2}
        w="100%"
        bg={isActive  ? "rgba(255,255,255,0.1)" : "transparent"}
        borderLeft={isActive  ? "3px solid #00FF5F" : "3px solid transparent"}
        transition="all 0.2s"
        _hover={{ bg: "rgba(255,255,255,0.08)" }}
      >
        {label}
      </Text>
    </NextLink>
  );
}
