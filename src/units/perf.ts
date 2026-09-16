import { Unit } from "./unit";
import { Chessground } from "@lichess-org/chessground";

export const metaSquares: Unit = {
  name: "Perf: meta squares",
  run(cont) {
    const cg = Chessground(cont, {
      fen: "k7/8/8/8/8/4K3/4P3/8 w - - 0 1",
      movable: {
        free: false,
        dests: new Map([
          ["a8", ["b8", "a7", "b7"]],
          ["e3", ["f2", "f3", "f4", "e4", "d2", "d3", "d4"]],
        ]),
      },
    });
    return cg;
  },
};
export const move: Unit = {
  name: "Perf: piece move",
  run(cont) {
    const cg = Chessground(cont, {
      animation: { duration: 500 },
    });
    const delay = 400;
    function run() {
      if (!cg.state.dom.elements.board.offsetParent) return;
      cg.move("e2", "a8");
      setTimeout(() => {
        cg.move("a8", "e2");
        setTimeout(run, delay);
      }, delay);
    }
    setTimeout(run, delay);
    return cg;
  },
};
export const select: Unit = {
  name: "Perf: square select",
  run(cont) {
    const cg = Chessground(cont, {
      movable: {
        free: false,
        dests: new Map([["e2", ["e3", "e4", "d3", "f3"]]]),
      },
    });
    const delay = 500;
    function run() {
      if (!cg.state.dom.elements.board.offsetParent) return;
      cg.selectSquare("e2");
      setTimeout(() => {
        cg.selectSquare("d4");
        setTimeout(run, delay);
      }, delay);
    }
    setTimeout(run, delay);
    return cg;
  },
};
