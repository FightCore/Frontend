import { Character } from './character';

export class Matchup {
    character1: Character;
    character1Id: number;
    character2: Character;
    character2Id: number;

    /**
     * Looks at the matchup from character 1.
     * Negative means the matchup is losing for character 1.
     * Positive means the matchup is winning for character 1.
     */
    value: number;
}
