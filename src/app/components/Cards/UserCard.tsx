import { getIndividualByID } from "@/app/utils/data/familyTree";
import { Individual } from "@/app/global/types";
import {
    Card,
    CardBody,
    CardFooter,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";

export default function UserCard({
    userID,
    treeData,
}: {
    userID: string;
    treeData: Individual[];
}) {
    const userData = getIndividualByID(userID, treeData);

    return (
        <main className="relative">
            <Card radius="sm">
                <CardBody>
                    <p className="text-xs text-center">
                        {userData?.firstName} {userData?.lastName}
                    </p>
                </CardBody>
            </Card>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        isIconOnly
                        radius="full"
                        className="w-6 h-6 min-w-unit-6 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                    >
                        <FaPlus className="text-[10px]" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" variant="bordered">
                    <DropdownItem key="new">Add Father</DropdownItem>
                    <DropdownItem key="copy">Add Mother</DropdownItem>
                    <DropdownItem key="edit">Add Son</DropdownItem>
                    <DropdownItem key="delete">Add Daughter</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </main>
    );
}
