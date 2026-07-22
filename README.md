# Connect 4

A browser-based Connect 4 game — local 2-player, pass-and-play. Built with Vue 3, Vite, TypeScript, and Tailwind CSS. Ships with a Dockerfile so it can run as a standalone container anywhere on your network (including from your phone).

> **Status**: frontend only. The `backend/` folder is an empty placeholder reserved for a future online-multiplayer version — nothing there yet, safe to ignore.

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| UI framework | [Vue 3](https://vuejs.org/) (Composition API) | Component-based UI, small learning curve, good TypeScript support |
| Build tool / dev server | [Vite](https://vite.dev/) | Fast dev server with hot-reload, bundles the app for production |
| Language | TypeScript | Catches type errors (e.g. passing a string where a number is expected) before runtime |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) | Utility classes instead of hand-written CSS files |
| Testing | [Vitest](https://vitest.dev/) | Unit tests for the game logic (win detection, board state) |
| Packaging | Docker (multi-stage build + nginx) | Runs the built app in a small, portable container |

## Project structure

```
Connect-4/
├── backend/                  # empty placeholder — not implemented yet
├── docker-compose.yml        # empty placeholder — not implemented yet
└── frontend/
    ├── index.html             # HTML shell the browser loads first
    ├── src/
    │   ├── main.ts             # entry point — mounts App.vue into index.html
    │   ├── App.vue             # root component, wires everything together
    │   ├── style.css           # Tailwind import + minimal global CSS
    │   ├── components/
    │   │   ├── ConnectFourBoard.vue   # the 7x6 clickable grid
    │   │   └── GameStatus.vue         # turn/winner/draw text + reset button
    │   └── composables/
    │       ├── useConnect4Game.ts       # game rules + reactive game state
    │       └── useConnect4Game.test.ts  # unit tests for the rules
    ├── Dockerfile             # multi-stage build: node (build) -> nginx (serve)
    ├── .dockerignore
    └── package.json
```

## Running it locally

Requires [Node.js](https://nodejs.org/) (v20+ recommended).

```bash
cd frontend
npm install       # install dependencies (first time only)
npm run dev       # start the dev server
```

Open the URL it prints (usually `http://localhost:5173`).

Other useful commands, run from `frontend/`:

```bash
npm run test       # run the unit tests (Vitest)
npm run build      # type-check + build a production bundle into frontend/dist/
npm run preview    # locally preview the production build
```

## Running it with Docker

Requires [Docker](https://www.docker.com/) installed and running.

```bash
cd frontend
docker build -t connect4-frontend .
docker run -d -p 8080:80 connect4-frontend
```

Open `http://localhost:8080`.

To stop it later:

```bash
docker ps                       # find the container ID or name
docker rm -f <container-id>     # stop and remove it
```

### Playing from your phone

Since the container just serves a normal responsive website, any device on the same Wi-Fi network can load it:

1. Find your computer's local network IP (e.g. `192.168.1.23`) — on macOS: `ipconfig getifaddr en0`
2. On your phone's browser, go to `http://<that-ip>:8080`

No app install needed — it's just a web page.

## How the game works

- Standard Connect 4 rules: 7 columns, 6 rows, players alternate turns (Red goes first), discs fall to the lowest empty cell in the chosen column.
- Win condition: 4 discs of the same color in a row — horizontally, vertically, or diagonally (either direction).
- If the board fills up with no winner, it's a draw.
- The board and win-check logic live entirely in `src/composables/useConnect4Game.ts`, as plain, side-effect-free TypeScript functions — no Vue dependency. This makes them easy to unit test (see `useConnect4Game.test.ts`) independently of the UI.

## Roadmap / explicitly out of scope for now

- No AI opponent — 2 human players only, same screen
- No backend — no online multiplayer, no persistence/history, no accounts
- No linting/formatting setup (ESLint/Prettier)
- No component-level UI tests — only the underlying game-logic functions are unit tested

These may be added later; see the empty `backend/` folder and root `docker-compose.yml` reserved for that.
