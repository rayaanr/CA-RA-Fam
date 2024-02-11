import { getIndividualByID } from "@/app/utils/data/familyTree"
import { Individual } from "@/app/global/types"
import {Card, CardBody} from "@nextui-org/react";

export default function UserCard({userID, treeData}: {userID: string, treeData: Individual[]}) {
    const userData = getIndividualByID(userID, treeData)

    return (
        <Card>
          <CardBody>
            <p>{userData?.firstName} {userData?.lastName}</p>
          </CardBody>
        </Card>
      );
}