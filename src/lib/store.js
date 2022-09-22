import { ActivePlayers } from 'boardgame.io/core';

function resetBuzzers(G) {
  G.queue = {};
}

function resetBuzzer(G, ctx, id) {
  const newQueue = { ...G.queue };
  delete newQueue[id];
  G.queue = newQueue;
}

function toggleLock(G) {
  G.locked = !G.locked;
}

function setupScore(G, ctx, score) {
  G.custom.score = score;
}

function buzz(G, ctx, id) {
  const newQueue = {
    ...G.queue,
  };
  if (!newQueue[id]) {
    // buzz on server will overwrite the client provided timestamp
    newQueue[id] = { id, timestamp: new Date().getTime(), points: 0 };
  } else {
    newQueue[id] = { ...newQueue[id], points: newQueue[id].points + 1 };
  }
  G.queue = newQueue;
}

const setup = { score: 1 };
export const Buzzer = {
  name: 'buzzer',
  minPlayers: 2,
  maxPlayers: 200,
  setup: (ctx) => ({ queue: {}, locked: false, custom: { ...setup } }),
  phases: {
    play: {
      start: true,
      moves: { buzz, resetBuzzer, resetBuzzers, toggleLock, setupScore },
      turn: {
        activePlayers: ActivePlayers.ALL,
      },
    },
  },
};
