const STORAGE_KEY = 'gomeme-web-v1';

const DEFAULT_STATE = {
  collection: [],
  coins: 0,
  catches: 0,
  deviceId: `web-${Date.now().toString(36)}`,
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addCatch(meme) {
  const state = loadState();
  state.collection.unshift({
    ...meme,
    caughtAt: Date.now(),
    id: `${meme.slug}-${Date.now()}`,
  });
  state.catches += 1;
  if (meme.rarity !== 'common') {
    state.coins += meme.rarity === 'legendary' ? 50 : meme.rarity === 'epic' ? 25 : 10;
  }
  saveState(state);
  return state;
}
