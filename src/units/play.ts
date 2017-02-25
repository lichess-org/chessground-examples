import { Chess } from 'chess.js';
import { Chessground }  from 'chessground';
import { Api } from 'chessground/api';
import { Unit } from './unit';
import { toColor, toDests } from '../util'

export const initial: Unit = {
  name: 'Play legal moves from initial position',
  run(el) {
    const chess = new Chess();
    const cg = Chessground(el, {
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess)
      }
    });
    cg.set({
      // draggable: {
      //   showGhost: false
      // },
      movable: {
        events: {
          after: automove(cg, chess)
        }
      }
    });
    return cg;
  }
};

export const castling: Unit = {
  name: 'Castling',
  run(el) {
    const fen = 'rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4';
    const chess = new Chess(fen);
    const cg = Chessground(el, {
      fen: fen,
      turnColor: toColor(chess),
      movable: {
        color: 'white',
        free: false,
        dests: toDests(chess)
      }
    });
    cg.set({
      // draggable: {
      //   showGhost: false
      // },
      movable: {
        events: {
          after: automove(cg, chess)
        }
      }
    });
    return cg;
  }
};

function automove(cg: Api, chess) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest});
    cg.set({
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      }
    });
  };
}
