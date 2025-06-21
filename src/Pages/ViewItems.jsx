import {
  Box,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Stack,
  IconButton,
  Button,
  Flex,
  useColorModeValue
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig.js";
import ItemModal from "../Components/ItemModal.jsx";

export default function ViewItems() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "gray.700");

  const [items, setItems] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const docRef = doc(db, "ItemsCollection", "itemsData");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("✅ Items Fetched:", data);
          setItems(data.items || []);
        } else {
          console.warn("⚠️ No items found in Firebase.");
        }
      } catch (err) {
        console.error("🔥 Fetch error:", err);
      }
    };
    fetchItems();
  }, []);

  const handleDeleteItem = async (indexToDelete) => {
    try {
      const docRef = doc(db, "ItemsCollection", "itemsData");
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;

      const existingItems = docSnap.data().items || [];
      const updatedItems = existingItems.filter((_, i) => i !== indexToDelete);
      await setDoc(docRef, { items: updatedItems });
      setItems(updatedItems);
    } catch (err) {
      console.error("🔥 Delete error:", err);
    }
  };

  return (
    <Box minH="100vh" bg={bg} py={10} px={{ base: 4, md: 10 }}>
      <Flex justify="space-between" align="center" mb={8}>
        <Button as={Link} to="/" variant="ghost" colorScheme="blue">
          Home
        </Button>
        <Heading size="lg" color="blue.600">
          All Items
        </Heading>
        <Button as={Link} to="/additems" colorScheme="teal">
          Add Item
        </Button>
      </Flex>

      {items.length === 0 ? (
        <Text textAlign="center" color="gray.500" fontSize="lg">
          No items available. Please add some items.
        </Text>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {items.map((item, index) => (
            <GridItem
              key={index}
              bg={cardBg}
              border="1px solid"
              borderColor={border}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="sm"
              position="relative"
              _hover={{
                boxShadow: "lg",
                transform: "scale(1.02)",
                transition: "0.3s ease",
              }}
              onClick={() => {
                setClickedItem(item);
                onOpen();
              }}
            >
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete item"
                colorScheme="red"
                size="sm"
                position="absolute"
                top="2"
                right="2"
                zIndex="1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteItem(index);
                }}
              />
              <Image
                src={item.coverImage}
                alt={item.itemName || "Item"}
                fallbackSrc="https://via.placeholder.com/250"
                width="100%"
                height="200px"
                objectFit="cover"
              />
              <Stack p={4}>
                <Text fontWeight="bold" fontSize="lg" color="gray.700">
                  {item.itemName || "Unnamed"}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {item.description ? "Click to view details" : "No description"}
                </Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
      )}

      {clickedItem && (
        <ItemModal isOpen={isOpen} onClose={onClose} item={clickedItem} />
      )}
    </Box>
  );
}
