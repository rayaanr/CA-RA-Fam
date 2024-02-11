import axios from "axios";

// Assuming these are the types based on your model
import { Individual, Relationship, AdditionalDetail } from '../global/types'; // Adjust the import path

const getAllIndividuals = async (): Promise<Individual[]> => {
    try {
        const res = await axios.get<Individual[]>('/api/tree/individual');
        return res.data;
    } catch (error) {
        console.error("Failed to fetch individuals:", error);
        return [];
    }
};

const getRelationships = async (): Promise<Relationship[]> => {
    try {
        const res = await axios.get<Relationship[]>('/api/tree/relationship');
        return res.data;
    } catch (error) {
        console.error("Failed to fetch relationships:", error);
        return [];
    }
};

export const fetchAndProcessFamilyData = async () => {
    const allIndividuals = await getAllIndividuals();
    const allRelationships = await getRelationships();

    // Index individuals by ID for quick access
    const individualsById: { [key: string]: Individual } = {};
    allIndividuals.forEach(individual => {
        individualsById[individual.id] = {
            ...individual,
            relationshipsAsIndividual1: [],
            relationshipsAsIndividual2: [],
            additionalDetails: []
        };
    });

    // Process relationships
    allRelationships.forEach(relationship => {
        const { individual1Id, individual2Id } = relationship;
        if (individualsById[individual1Id] && individualsById[individual2Id]) {
            individualsById[individual1Id].relationshipsAsIndividual1?.push(relationship);
            individualsById[individual2Id].relationshipsAsIndividual2?.push(relationship);
        }
    });

    // Optional: Process additional details if needed

    // Construct a family tree object - for simplicity, starting with root individuals
    // Root individuals might be defined as those who are not listed as a child (individual2) in any relationship
    const rootIndividuals = allIndividuals.filter(individual =>
        !allRelationships.some(rel => rel.individual2Id === individual.id)
    );

    return {
        roots: rootIndividuals.map(individual => individualsById[individual.id])
    };
};

// Example usage:

