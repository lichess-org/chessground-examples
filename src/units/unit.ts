import { Api } from 'chessground/api';

import * as basics from './basics'
import * as play from './play'
import * as perf from './perf'
import * as zh from './zh'
import * as anim from './anim'
import * as svg from './svg'
import * as in3d from './in3d'
import * as fen from './fen'
import * as viewOnly from './viewOnly'

export interface Unit {
  name: string;
  run: (el: HTMLElement) => Api
}

export const list: Unit[] = [
  basics.defaults, basics.fromFen, basics.lastMoveCrazyhouse, basics.checkHighlight,
  play.initial, play.castling, play.vsRandom, play.fullRandom, play.slowAnim, play.conflictingHold,
  perf.move, perf.select,
  anim.conflictingAnim, anim.withSameRole, anim.notSameRole, anim.whileHolding,
  zh.lastMoveDrop,
  svg.presetUserShapes, svg.changingShapesHigh, svg.changingShapesLow, svg.brushModifiers, svg.autoShapes, svg.visibleFalse, svg.enabledFalse, svg.customSvg,
  in3d.defaults, in3d.vsRandom, in3d.fullRandom,
  fen.autoSwitch,
  viewOnly.fullRandom
];
