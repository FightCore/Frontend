import { EditType } from './edit-type';
import { Editable } from './editable';

export class EditDto {
    id: number;
    original: string;
    target: string;
    userName: string;
    editType: EditType;
    editable: Editable;
    userId: number;
}
