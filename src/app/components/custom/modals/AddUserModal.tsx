'use client'

import React, {useState} from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

interface CheckoutModalCardProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const AddUserModal: React.FC<CheckoutModalCardProps> = ({
    isOpen,
    onOpenChange
}) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  const handleAddUser = async () => {
    const response = await axios.post("/api/members", {
        name: name,
        parent: parent
    });
    if (response.status === 201) {
      onOpenChange(false);
      console.log('Response:', response);
    } else {
      console.log('Error:', response);
    }
    
}


  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <form>
                <Input
                  autoFocus
                  label="First Name"
                  placeholder="Enter your first name"
                  variant="bordered"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Last Name"
                  placeholder="Enter your last name"
                  variant="bordered"
                  onChange={(e) => setParent(e.target.value)}
                />
                <Input
                  label="Birth Day"
                  type="string"
                  placeholder="Enter your birth day"
                  variant="bordered"
                />
                     <select
        name="gender"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <input
        type="text"
        name="birthPlace"
        placeholder="Birth Place"
      />


                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleAddUser}>
                  Add User
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUserModal;