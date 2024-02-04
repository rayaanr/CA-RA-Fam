import React from "react";
import FamilyMember from "./FamilyMember";
import { Person } from "./types";

interface FamilyGroupProps {
    members: Person[];
}

const FamilyGroup: React.FC<FamilyGroupProps> = ({ members }) => {
    // Function to find spouse and children for a given person
    const findFamily = (person: Person) => {
        const spouse = person.spouseId
            ? members.find((m) => m.id === person.spouseId)
            : undefined;
        const children = members.filter((m) =>
            person.childrenIds.includes(m.id)
        );
        return { spouse, children };
    };

    // Render each family unit
    const renderFamilyUnit = (person: Person) => {
        const { spouse, children } = findFamily(person);

        return (
            <div key={person.id} className="mb-2 border-1 border-blue-500 p-3">
                <div className="flex justify-center mb-2">
                    <FamilyMember person={person} spouse={spouse} />
                </div>
                {children.length > 0 && (
                    <div className="flex justify-center flex-wrap">
                        {children.map((child) => {
                            // Recursively render children and their spouses/families
                            return renderFamilyUnit(child);
                        })}
                    </div>
                )}
            </div>
        );
    };

    // Filter top-level parents (those without parents themselves)
    const topLevelParents = members.filter(
        (m) =>
            m.isParent &&
            !members.some((child) => child.childrenIds.includes(m.id))
    );

    return (
        <div>{topLevelParents.map((parent) => renderFamilyUnit(parent))}</div>
    );
};

export default FamilyGroup;
