import { Move } from './move';
import { CharacterStatistics } from './character-statistics';

export class FrameDataCharacter {
    name: string;
    normalizedName: string;
    moves: Move[];
    fightCoreId: number;
    characterStatistics: CharacterStatistics;
}
