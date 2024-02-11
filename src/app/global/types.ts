type relationship = 'parent' | 'spouse';

type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say'

export interface Individual {
    id: string;
    firstName: string;
    lastName?: string;
    gender: Gender
    birthDate?: Date;
    deathDate?: Date;
    birthPlace?: string;
    relationshipsAsIndividual1?: Relationship[];
    relationshipsAsIndividual2?: Relationship[];
    additionalDetails?: AdditionalDetail[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Relationship {
    id: string;
    individual1Id: string;
    individual2Id: string;
    relationshipType: relationship;
    individual1: Individual;
    individual2: Individual;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdditionalDetail {
    id: string;
    individualId: string;
    detailType: string;
    detailValue: string;
    individual: Individual;
    createdAt: Date;
    updatedAt: Date;
}