"use client";
import React from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";


const ChatbotButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const handleSend = () => {
        router.push("./summary");
    }

    return (
        <>
            <Button onPress={onOpen} color="primary">Ask GPT</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                                    <Input type="text" label="Prompt" placeholder="Please give me insight regarding ..." />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleSend}>
                                    Send
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChatbotButton