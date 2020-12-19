import { Move } from 'src/app/models/framedata/move';

export class MovesHelper {
    static getMoveAttributes(move: Move){
        return [
        { name: 'Start', value: move.start},
        { name: 'End', value: move.end},
        { name: 'IASA', value: move.iasa},
        { name: 'Total Frames', value: move.totalFrames},
        { name: 'Land lag', value: move.landLag},
        { name: 'L-Canceled Land lag', value: move.lCanceledLandLang},
        { name: 'Auto cancel before', value: move.autoCancelBefore},
        { name: 'Auto cancel after', value: move.autoCancelAfter},
      ];
    }
}
