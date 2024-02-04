import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { memberProfile } from "@/app/utils/types";

interface MemberProfileCardProps {
    memberProfile: memberProfile;
}

export default function MemberProfileCard({
    memberProfile,
}: MemberProfileCardProps) {
    return (
        <Card className="max-w-[250px]">
            <CardBody>
                <p>Name: {memberProfile.name}</p>
                <p>Parent: {memberProfile.parent}</p>
            </CardBody>
        </Card>
    );
}
