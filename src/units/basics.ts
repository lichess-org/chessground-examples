import { Chessground }  from 'chessground';
import { Unit } from './unit';

export const defaults: Unit = {
  name: 'Default configuration',
  run(el) {
    return Chessground(el);
  }
};

export const fromFen: Unit = {
  name: 'From FEN, from black POV',
  run(el) {
    return Chessground(el, {
      fen:'2r3k1/pp2Qpbp/4b1p1/3p4/3n1PP1/2N4P/Pq6/R2K1B1R w -',
      orientation: 'black'
    });
  }
};

export const lastMoveCrazyhouse: Unit = {
  name: 'Last move: crazyhouse',
  run(el) {
    const cg = Chessground(el);
    setTimeout(() => {
      cg.set({lastMove:['e2', 'e4']});
      setTimeout(() => cg.set({lastMove:['g6']}), 1000);
      setTimeout(() => cg.set({lastMove:['e1']}), 2000);
    });
    return cg;
  }
};

export const checkHighlight: Unit = {
  name: 'Highlight king in check',
  run(el) {
    const fen = 'r1bqkbnr/1ppppBpp/p1n5/8/4P3/8/PPPP1PPP/RNBQK1NR b KQkq - 0 1';
    const cg = Chessground(el, {
      fen: fen,
      turnColor: 'black',
      highlight: {
        check: true
      }
    });
    cg.set({
      check: true
    });
    return cg;
  }
};
