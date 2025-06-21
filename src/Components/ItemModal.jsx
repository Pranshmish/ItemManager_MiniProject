import { Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,Image,Text,Box,Stack,Button,useToast,} from "@chakra-ui/react";
import { useState } from "react";
import emailjs from "emailjs-com";

export default function ItemModal({ isOpen, onClose, item }) {
  const toast = useToast();
  const [isSending, setIsSending] = useState(false)

  const sendEnquiry = () => {
    if (isSending) return

    setIsSending(true)

    const templateParams = {
      item_name: item?.itemName,
      item_type: item?.selectedItem,
    };

    emailjs
      .send(
        "service_yzq41l1",
        "template_sqmrhlb",
        templateParams,
        "yqQ13HoWpaQuOQmMI"
      )
      .then(() => {
        toast({
          title: "Enquiry sent.",
          description: "We'll get back to you soon!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        toast({
          title: "Failed to send enquiry.",
          description: "Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsSending(false); 
      });
  };

  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.itemName}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>
            <Image
              src={item.coverImage || "https://via.placeholder.com/300"}
              alt="Cover"
              borderRadius="md"
              maxH="200px"
              objectFit="cover"
            />

            <Box>
              <Text fontWeight="bold">Type:</Text>
              <Text>{item.selectedItem}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold">Description:</Text>
              <Text>{item.discription}</Text>
            </Box>

            <Button
              colorScheme="blue"
              mt={4}
              width="full"
              onClick={sendEnquiry}
              isLoading={isSending} 
              loadingText="Sending..." 
            >
              Enquire
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
