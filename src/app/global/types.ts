export type relationship = 'parent' | 'spouse';

export type FamilyMember = {
    id: string;
    name: string;
    spouse?: string;
    children?: FamilyMember[];
};

export interface FamilyMemberProps {
    member: FamilyMember;
}

export interface RenderMemberProps {
    name: string;
    id: string;
    spouse?: string;
}