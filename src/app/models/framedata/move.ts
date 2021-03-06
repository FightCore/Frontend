import { FrameDataCharacter } from './framedata-character';
import { Hitbox } from './hitbox';
import { MoveType } from './move-type';

export class Move {
    hitboxes: Hitbox[];
    name: string;
    normalizedName: string;
    landLag?: number;
    lCanceledLandLang?: number;
    totalFrames: number;
    iasa?: number;
    autoCancelBefore?: number;
    autoCancelAfter?: number;
    type: MoveType;
    start?: number;
    end?: number;
    notes?: string;
    source?: string;
    character?: FrameDataCharacter;
}
