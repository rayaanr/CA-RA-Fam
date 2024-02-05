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


  export interface DotPosition {
    x: number;
    y: number;
  }
  
  export interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }