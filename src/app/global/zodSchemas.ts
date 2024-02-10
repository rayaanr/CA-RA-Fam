import { z } from "zod";

// Custom Zod schema for validating a default nanoid (21 characters)
const nanoidSchema = z.string().refine((value) => value.length === 21 && /^[A-Za-z0-9_-]+$/.test(value), {
    message: "Invalid nanoid",
});

// Placeholder for Relationship schema to be defined later
// Needed for circular reference in Individual schema
const relationshipSchemaPlaceholder = z.lazy(() => relationshipSchema);

// Define the AdditionalDetail schema
export const additionalDetailSchema = z.object({
    individualId: nanoidSchema, // Use the custom nanoidSchema for validation
    detailType: z.string(),
    detailValue: z.string(),
});

// Define the Individual schema
export const individualSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
    birthDate: z.date().optional(),
    deathDate: z.date().optional(),
    birthPlace: z.string().optional(),
    relationshipsAsIndividual1: z.array(relationshipSchemaPlaceholder).optional(),
    relationshipsAsIndividual2: z.array(relationshipSchemaPlaceholder).optional(),
    additionalDetails: z.array(additionalDetailSchema).optional(),
});

// Define the Relationship schema
export const relationshipSchema = z.object({
    individual1Id: nanoidSchema, // Use the custom nanoidSchema for validation
    individual2Id: nanoidSchema, // Use the custom nanoidSchema for validation
    relationshipType: z.enum(["parent", "spouse"]),
    // Note: The relations to Individual are not included to prevent deep nesting and circular dependency issues
});

// Note: You had a placeholder method .nanoid() which is not a method provided by Zod.
// The corrections replace it with the custom `nanoidSchema` for validating nanoid strings.
