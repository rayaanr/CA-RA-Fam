// FamilyMember.tsx
import React from "react";
import { FamilyMemberProps, Person } from "./types";

const renderMember = (person: Person) => {
    return (
        <div
            key={person.id}
            className="border-1 border-black p-2"
        >
            <p>
                {person.name} ({person.birthYear})
            </p>
        </div>
    );
};

const FamilyMember: React.FC<FamilyMemberProps> = ({ person, spouse }) => {
    return (
        <div className={`flex ${spouse ? "flex-row p-1 gap-5 border-1 border-red-500" : "flex-col"}`}
        >
            {renderMember(person)}
            {spouse && renderMember(spouse)}
        </div>
    );
};

export default FamilyMember;
