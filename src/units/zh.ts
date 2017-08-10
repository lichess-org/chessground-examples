import { Unit } from './unit';
import { Chessground }  from 'chessground';
import { Key } from 'chessground/types.d';

export const lastMoveDrop: Unit = {
  name: 'Crazyhouse: lastMove = drop',
  run(cont) {
    const configs: Array<() => {fen: string; lastMove: Key[]}> = [() => {
      return {
        fen: 'Bn2kb1r/p1p2ppp/4q3/2Pp4/3p1NP1/2B2n2/PPP2P1P/R2KqB1R/RNpp w k - 42 22',
        lastMove: ['e5', 'd4']
      };
    }, () => {
      return {
        fen: 'Bn2kb1r/p1p2ppp/4q3/2Pp4/3p1NP1/2B2n2/PPP2P1P/R2KqB1R/RNpp w k - 42 22',
        lastMove: ['f4']
      };
    }, () => {
      return {
        fen: 'Bn2kb1r/p1p2ppp/4q3/2Pp4/3p1NP1/2B2n2/PPP2P1P/R2KqB1R/RNpp w k - 42 22',
        lastMove: ['e1']
      };
    }];
    const cg = Chessground(cont, configs[0]());
    const delay = 2000;
    let it = 0;
    function run() {
      if (!cg.state.dom.elements.board.offsetParent) return;
      const config = configs[++it % configs.length];
      console.log(config);
      cg.set(config());
      setTimeout(run, delay);
    }
    setTimeout(run, delay);
    return cg;
  }
};

