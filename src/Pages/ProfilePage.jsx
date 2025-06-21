import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Box minH="100vh" bg="gray.50" px={8} py={10}>
      <VStack spacing={6} align="center">
        <Avatar size="xl" name={user?.name} />
        <Heading size="lg" color="teal.500">Profile</Heading>
        <Text fontSize="lg"><strong>Name:</strong> {user?.name}</Text>
        <Text fontSize="lg"><strong>Email:</strong> {user?.email}</Text>
        <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
      </VStack>
    </Box>
  );
}
