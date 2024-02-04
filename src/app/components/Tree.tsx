"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import AddUserModal from "./custom/modals/AddUserModal";
import MemberProfileCard from "./custom/cards/memberProfileCard";

export default function Tree() {
    const [isOpen, setIsOpen] = useState(false);
    const [allMembersProfile, setAllMembersProfile] = useState([]);

    const handleOpenChange = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const getAllMembersProfile = async () => {
            const response = await fetch("/api/members");
            const data = await response.json();
            setAllMembersProfile(data);
        };

        getAllMembersProfile();
    }, []);

    return (
        <main>
            <h1>Tree</h1>
            <Button isIconOnly onClick={handleOpenChange}>
                <FaPlus />
            </Button>
            <AddUserModal isOpen={isOpen} onOpenChange={handleOpenChange} />
            <div className="flex gap-5">
                {allMembersProfile.map((memberProfile, index) => (
                    <div key={index}>
                        <MemberProfileCard
                            memberProfile={memberProfile}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
