Usage examples for [lichess' chessground](https://github.com/lichess-org/chessground).

```
pnpm install
pnpm run build (or npm run watch)
pnpm run serve (or any other local http server of your choice)
```

Then browse http://127.0.0.1:8080

To try out a local chessground, modify package.json to use the local version of chessground:

```json
"dependencies": {
  "chessground": "file:~/chessground",
}
```

then run `pnpm install` again.
