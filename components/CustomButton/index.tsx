"use client";
import React from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Link } from "@nextui-org/react";


const ChatbotButton = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                                <Link href="/summary">
                                    <Button color="primary">
                                        Send
                                    </Button>
                                </Link>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ChatbotButton