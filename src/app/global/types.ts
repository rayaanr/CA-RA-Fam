export interface Individual {
    id: string;
    firstName: string;
    lastName?: string | null;
    gender: "Male" | "Female";
    birthDate?: string | null;
    deathDate?: string | null;
    birthPlace?: string | null;
    motherID?: string | null;
    fatherID?: string | null;
    parentToChild?: string | null;
    spouseID?: string | null;
  }