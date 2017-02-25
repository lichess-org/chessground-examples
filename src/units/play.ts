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
      movable: { events: { after: playOtherSide(cg, chess) } }
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
      movable: { events: { after: playOtherSide(cg, chess) } }
    });
    return cg;
  }
};

export const vsRandom: Unit = {
  name: 'Play vs random AI',
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
      movable: {
        events: {
          after: aiPlay(cg, chess, 1000, false)
        }
      }
    });
    return cg;
  }
};

export const conflictingHold: Unit = {
  name: 'Conflicting hold/premove',
  run(el) {
    const cg = Chessground(el, {
      fen: '8/8/5p2/4P3/8/8/8/8',
      turnColor: 'black',
      movable: {
        color: 'white',
        free: false,
        dests: {e5: ['f6']}
      }
    });
    setTimeout(() => {
      cg.move('f6', 'e5');
      cg.playPremove();
    }, 1000);
    return cg;
  }
};

function playOtherSide(cg: Api, chess) {
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

function aiPlay(cg: Api, chess, delay: number, firstMove: boolean) {
  return (orig, dest) => {
    chess.move({from: orig, to: dest});
    setTimeout(() => {
      const moves = chess.moves({verbose:true});
      const move = firstMove ? moves[0] : moves[Math.floor(Math.random() * moves.length)];
      chess.move(move.san);
      cg.move(move.from, move.to);
      cg.set({
        turnColor: toColor(chess),
        movable: {
          color: toColor(chess),
          dests: toDests(chess)
        }
      });
      cg.playPremove();
    }, delay);
  };
}
