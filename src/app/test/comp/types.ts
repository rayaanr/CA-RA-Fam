// Types.ts

export interface Person {
    id: number;
    name: string;
    birthYear: number;
    spouseId?: number;
    childrenIds: number[];
    isParent: boolean;
  }
  
  export interface FamilyMemberProps {
    person: Person;
    spouse?: Person;
    children?: Person[];
  }