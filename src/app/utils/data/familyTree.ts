import {Individual} from '@/app/global/types';

const findRootMaleID = (familyData: Individual[]): string =>
  familyData.find((member) => !member.fatherID && member.gender === 'Male')?.id || '';

  // get the individual data by id
export const getIndividualByID = (id: string, treeData: Individual[]) => {
  return treeData.find((individual) => individual.id === id);
};

const findChildrenOfIndividual = (individualID: string, familyData: Individual[]): string[] =>
  familyData.filter(({fatherID, motherID}) => fatherID === individualID || motherID === individualID)
    .map(({id}) => id);

const createFamilyTreeStructure = (individualID: string, familyData: Individual[]): any[] =>
  findChildrenOfIndividual(individualID, familyData).map((childID) => ({
    id: childID,
    children: createFamilyTreeStructure(childID, familyData),
    spouse: familyData.find(({id}) => id === childID)?.spouseID || null,
  }));

export const createFamilyTree = (familyData: Individual[]): any[] => {
  const rootMaleID = findRootMaleID(familyData);
  return rootMaleID ? [{
    id: rootMaleID,
    children: createFamilyTreeStructure(rootMaleID, familyData),
    spouse: familyData.find(({id}) => id === rootMaleID)?.spouseID || null,
  }] : [];
};