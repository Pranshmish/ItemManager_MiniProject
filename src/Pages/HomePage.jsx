import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Box minH="100vh" px={8} py={4} bg="gray.50">
      <Flex align="center" mb={8}>
        <Heading size="lg" color="teal.500">
          Item Manager
        </Heading>
        <Spacer />
        {isAuthenticated ? (
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Avatar size="sm" name={user?.name || "User"} />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem as={Link} to="/profile">Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme="teal" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Flex>
      <Box textAlign="center" mt={20}>
        <Heading>Welcome to Item Manager</Heading>
        <Text fontSize="lg" mt={4} color="gray.600">
          Manage your inventory easily and efficiently.
        </Text>

        {isAuthenticated ? (
          <Flex justify="center" gap={4} mt={8}>
            <Button colorScheme="teal" onClick={() => navigate("/additems")}>
              Add Items
            </Button>
            <Button colorScheme="blue" onClick={() => navigate("/viewitems")}>
              View Items
            </Button>
          </Flex>
        ) : (
          <Text mt={8} fontSize="md" fontWeight="semibold" color="red.500">
            🚨 Please login to proceed further.
          </Text>
        )}
      </Box>
    </Box>
  );
}
