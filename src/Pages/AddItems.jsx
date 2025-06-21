import { Box, Heading, VStack, FormControl, FormLabel, Input,Textarea, Select, Button, useColorModeValue} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function AddItem() {
  const bg = useColorModeValue("blue.100", "white");
  const border = useColorModeValue("blue.900", "blue.700");

  const [itemName, setItemName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleAddItems = async (e) => {
    e.preventDefault();
    if (!itemName || !selectedItem || !description || !coverImage) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const coverBase64 = await fileToBase64(coverImage);
    const newItem = {
  itemName,
  itemType: selectedItem, 
  description,            
  coverImage: coverBase64,
};

      const docRef = doc(db, "ItemsCollection", "itemsData");
      const docSnap = await getDoc(docRef);

      let existingItems = [];
      if (docSnap.exists()) {
        existingItems = docSnap.data().items || [];
      }

      const updatedItems = [...existingItems, newItem];
      await setDoc(docRef, { items: updatedItems });

      console.log("✅ Item added to Firebase");
      setSuccess(true);
    } catch (error) {
      console.error("🔥 Firebase Add Error:", error);
    } finally {
      setLoading(false);
      setItemName("");
      setSelectedItem("");
      setDescription("");
      setCoverImage(null);
    }
  };

  return (
    <Box maxW="2xl" mx="auto" mt={10} p={8} bg={bg} borderRadius="xl" border="1px solid" borderColor={border} boxShadow="lg">
      <Heading size="lg" mb={6} textAlign="center" color="blue.600">
        Add New Item
      </Heading>
      <form onSubmit={handleAddItems}>
        <VStack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Item Name</FormLabel>
            <Input value={itemName} onChange={(e) => setItemName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Item Type</FormLabel>
            <Select placeholder="Select item type" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)}>
              <option value="shirt">Shirt</option>
              <option value="pant">Pant</option>
              <option value="shoes">Shoes</option>
              <option value="sports">Sports Gear</option>
              <option value="other">Other</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Cover Image</FormLabel>
            <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />
          </FormControl>

          <Button type="submit" colorScheme="blue" isLoading={loading} loadingText="Adding...">
            Add Item
          </Button>
          {success && (
            <Box mt="4" textAlign="center" color="green.500" fontWeight="semibold">
              ✅ Item added successfully!
              <Button as={Link} to="/viewitems" ml="4" size="sm" colorScheme="teal">
                View Items
              </Button>
            </Box>
          )}
        </VStack>
      </form>
    </Box>
  );
}
