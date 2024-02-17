import React, { use, useEffect, useState } from "react";
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
import axios from "axios";
import { nanoid } from "nanoid";
import updateRelationOnAdd from "@/app/utils/updateRelation";

interface AddUserModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    userID: string;
    treeData: Individual[];
    selectionKey: string;
    onDataUpdated: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    isOpen,
    onOpenChange,
    userID,
    treeData,
    selectionKey,
    onDataUpdated,
}) => {
    const userData = getIndividualByID(userID, treeData);
    const [gender, setGender] = useState<"Male" | "Female" | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function handleModalClose() {
        onOpenChange(false);
        setGender(null);
    }

    async function handleSave() {
        try {
            const newUserID = nanoid();
    
            await axios.post("/api/tree/individual", {
                id: newUserID,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
            });

            await updateRelationOnAdd(treeData, userID, newUserID, selectionKey, gender);

            onDataUpdated();
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            onClose={handleModalClose}
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
                                type="text" isRequired
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                label="Last Name"
                                placeholder="Enter your last name"
                                type="text"
                                variant="bordered"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <section className="flex gap-5">
                                <Checkbox
                                    isSelected={gender === "Male"}
                                    onChange={() => setGender("Male")}
                                >
                                    Male
                                </Checkbox>
                                <Checkbox
                                    isSelected={gender === "Female"}
                                    onChange={() => setGender("Female")}
                                >
                                    Female
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
                            <Button color="primary" onPress={onClose} onClick={handleSave}>
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
