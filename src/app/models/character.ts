import { Game } from './game';
import { NotablePlayer } from './notablePlayer';
import { FightCoreImage } from './fightcoreImage';
import { VideoResource } from './videoResource';
import { GameSeries } from './gameSeries';
import { Contributor } from './contributor';
import { InformationSource } from './informationSource';

export class Character {
    id: number;
    name: string;
    generalInformation: string;
    game?: Game;
    notablePlayers: NotablePlayer[];
    stockIcon?: FightCoreImage;
    characterImage?: FightCoreImage;
    videos: VideoResource[];
    series?: GameSeries;
    contributors?: Contributor[];
    informationSources: InformationSource[];
}
