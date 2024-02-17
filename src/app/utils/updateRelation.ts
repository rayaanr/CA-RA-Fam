import axios from "axios";
import { nanoid } from "nanoid";
import { Individual } from "../global/types";
import { getIndividualByID } from "./data/familyTree";

async function createUnknownUser(unknownID: string, gender: 'Male' | 'Female' | null, spouseID: string | null = null) {
    const ID = unknownID;
    const unknownFirstName = "Unknown";
    await axios.post("/api/tree/individual", {
        id: ID,
        firstName: unknownFirstName,
        gender: gender,
        spouseID: spouseID
    });
}

export default async function updateRelationOnAdd (treeData:Individual[], selectUserID:string, newUserID:string, selectionKey:string, gender:"Male" | "Female" | null){
    const userData = getIndividualByID(selectUserID, treeData);
    const newUserData = getIndividualByID(newUserID, treeData);
    
    if (selectionKey === "spouse") {
        await axios.put("/api/tree/individual", {
            individualId: selectUserID,
            spouseID: newUserID,
        });
        await axios.put("/api/tree/individual", {
            individualId: newUserID,
            spouseID: selectUserID,
        });
    }

    if (selectionKey === "child") {
        const isSelectedUserMale:boolean = userData?.gender === 'Male';
        if (userData?.spouseID === null) {
            const unknownGender = isSelectedUserMale ? 'Female' : 'Male';
            const unknownID = nanoid();
            await createUnknownUser(unknownID, unknownGender, selectUserID);
            await axios.put("/api/tree/individual", {
                individualId: selectUserID,
                spouseID: unknownID,
            });
            await axios.put("/api/tree/individual", {
                individualId: newUserID,
                fatherID: isSelectedUserMale ? selectUserID : unknownID,
                motherID: isSelectedUserMale ? unknownID : selectUserID,
            });
        } else {
            await axios.put("/api/tree/individual", {
                individualId: newUserID,
                fatherID: isSelectedUserMale ? selectUserID : userData?.spouseID,
                motherID: isSelectedUserMale ? userData?.spouseID : selectUserID,
            });
        }
    }

    if (selectionKey === "parent") {
        const isUserMale = gender === "Male";
        const unknownGender = isUserMale ? 'Female' : 'Male';
        const unknownID = nanoid();
        await createUnknownUser(unknownID, unknownGender, newUserID);

        await axios.put("/api/tree/individual", {
            individualId: newUserID,
            spouseID: unknownID,
        });

        await axios.put("/api/tree/individual", {
            individualId: selectUserID,
            fatherID: isUserMale ? newUserID : unknownID,
            motherID: isUserMale ? unknownID : newUserID,
        });
        
    }

}

