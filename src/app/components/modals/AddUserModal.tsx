import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalFooter,
    Button,
    Input,
    Checkbox,
    Link,
} from "@nextui-org/react";
import { Individual } from "@/app/global/types";
import { getIndividualByID } from "@/app/utils/data/familyTree";
import { capitalizeFirstLetter } from "@/app/global/functions";

interface AddUserModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userID: string;
    treeData: Individual[];
    selectionKey: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isOpen,
    onOpenChange,
    userID,
    treeData,
    selectionKey,
}) => {
    const userData = getIndividualByID(userID, treeData);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Add {capitalizeFirstLetter(selectionKey)} for{" "}
                            {userData?.firstName} {userData?.lastName}
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                label="First Name"
                                placeholder="Enter your first name"
                                variant="bordered"
                                type="text"
                            />
                            <Input
                                label="Last Name"
                                placeholder="Enter your last name"
                                type="text"
                                variant="bordered"
                            />
                            <section className="flex gap-10">
                                <Checkbox
                                    defaultSelected={
                                        selectionKey === "father" ||
                                        selectionKey === "son"
                                    }
                                >
                                    Male
                                </Checkbox>
                                <Checkbox
                                    defaultSelected={
                                        selectionKey === "mother" ||
                                        selectionKey === "daughter"
                                    }
                                >
                                    FeMale
                                </Checkbox>
                            </section>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default AddUserModal;
