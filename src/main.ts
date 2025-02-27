import {
  h,
  init,
  VNode,
  classModule,
  attributesModule,
  eventListenersModule,
} from "snabbdom";
import { Api } from "chessground/api";
import page from "page";
import { Unit, list } from "./units/unit";

export function run(element: Element) {
  const patch = init([classModule, attributesModule, eventListenersModule]);

  const lastZoom =
    parseFloat(localStorage.getItem("lichess-dev.cge.zoom")!) || 100;

  let unit: Unit, cg: Api, vnode: VNode;

  function redraw() {
    vnode = patch(vnode || element, render());
  }

  function runUnit(vnode: VNode) {
    const el = vnode.elm as HTMLElement;
    el.className = "cg-wrap";
    cg = unit.run(el);
    window["cg"] = cg; // for messing up with it from the browser console
    if (lastZoom !== 100) setZoom(lastZoom);
  }

  function setZoom(zoom: number) {
    const width = (zoom / 100) * 320;
    const el = document.querySelector(".cg-wrap") as HTMLElement;
    if (el) {
      el.style.width = `${width}px`;
      el.style.height = `${width}px`;
    }
    const el3d = document.querySelector(".in3d .cg-wrap") as HTMLElement;
    if (el3d) {
      el3d.style.height = `${(width * 464.5) / 512}px`;
    }
    document.body.dispatchEvent(new Event("chessground.resize"));
  }

  function render() {
    return h("div#chessground-examples", [
      h(
        "menu",
        list.map((ex, id) => {
          return h(
            "a",
            {
              class: {
                active: unit.name === ex.name,
              },
              on: { click: () => page(`/${id}`) },
            },
            ex.name,
          );
        }),
      ),
      h("section.blue.merida", [
        h("div.cg-wrap", {
          hook: {
            insert: runUnit,
            postpatch: runUnit,
          },
        }),
        h("p", unit.name),
      ]),
      h("control", [
        h(
          "button",
          {
            on: {
              click() {
                cg.toggleOrientation();
              },
            },
          },
          "Toggle orientation",
        ),
        h("label.zoom", [
          "Zoom",
          h(
            "input",
            {
              attrs: {
                type: "number",
                value: lastZoom,
              },
              on: {
                change(e) {
                  const zoom = parseFloat((e.target as HTMLInputElement).value);
                  localStorage.setItem("lichess-dev.cge.zoom", zoom.toString());
                  setZoom(zoom);
                },
              },
            },
            "Toggle orientation",
          ),
        ]),
      ]),
    ]);
  }

  page({ click: false, popstate: false, dispatch: false, hashbang: true });
  page("/:id", (ctx) => {
    unit = list[parseInt(ctx.params.id) || 0];
    redraw();
  });
  page(location.hash.slice(2) || "/0");
}
