import { Chessground }  from 'chessground';
import { Unit } from './unit';

export const conflictingAnim: Unit = {
  name: 'Conflicting animation',
  run(el) {
    const cg = Chessground(el, {
      animation: {
        duration: 15000
      },
      fen: '8/8/5p2/4P3/4K3/8/8/8',
      turnColor: 'black',
      movable: {
        color: 'white',
        free: false
      }
    });
    setTimeout(() => {
      cg.move('f6', 'e5');
      cg.playPremove();
      cg.set({
        turnColor: 'white',
        movable: {
          dests: {e4: ['e5']}
        }
      });
    }, 1000);
    return cg;
  }
};

