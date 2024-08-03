import { FILE_ASSOCIATED_TYPE } from "../../../common/file/constants/file.constants";

export interface IFile {
  path: string;
  fileName: string;
  mime: string;
  size: number;
  description: string | null;
  associationId: number | null;
  associatedType: FILE_ASSOCIATED_TYPE | null;
}

export interface IAssociationIncoming {
  associationId: number;
  associationType: FILE_ASSOCIATED_TYPE;
}
