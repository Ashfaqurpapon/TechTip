import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { makePayment } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";

export default function PremiumModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useUser();

  const backdrops = ["blur"];

  const handleOpen = () => {
    onOpen();
  };

  const handlePayment = async () => {
    onClose();
    const paymentResult = await makePayment({ userId: user?._id });

    window.location.href = paymentResult.payment_url;
  };

  return (
    <>
      {/* className="absolute text-white bg-yellow-500 top-2 right-2" */}
      {/* <div className="absolute text-white top-2 right-2"> */}
      <div>
        {backdrops.map((b) => (
          <Button
            key={b}
            className="capitalize"
            color="warning"
            variant="flat"
            onPress={() => handleOpen()}
          >
            {"Premium Post"}
          </Button>
        ))}
      </div>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose: any) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  {" "}
                  This is Premium post. If you want to read full post, you have
                  to Pay 20$ yearly.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handlePayment}>
                  Make Payment
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
