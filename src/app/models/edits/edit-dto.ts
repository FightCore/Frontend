import { EditType } from './edit-type';

export class EditDto {
    id: number;
    original: string;
    target: string;
    userName: string;
    editType: EditType;
}
