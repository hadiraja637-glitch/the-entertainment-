/**
 * Freshness Engine
 * Tracks viewed item IDs in localStorage to ensure visitors don't repeatedly
 * see the same jokes, riddles, trivia, or facts in succession.
 * When the library is fully explored, it recycles cleanly with a fresh shuffle.
 */

export class FreshnessService {
  private getSeenIds(storageKey: string): Set<string> {
    try {
      const raw = localStorage.getItem(`te_seen_${storageKey}`);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  private saveSeenIds(storageKey: string, ids: Set<string>): void {
    try {
      localStorage.setItem(`te_seen_${storageKey}`, JSON.stringify(Array.from(ids)));
    } catch {
      // Ignore localStorage quotas
    }
  }

  /**
   * Returns a fresh, previously unseen item from the pool.
   * If all items have been seen, it resets the viewed cache so the cycle restarts seamlessly.
   */
  public getNextFreshItem<T extends { id: string }>(
    pool: T[],
    storageKey: string,
    currentId?: string
  ): { item: T; isFirstEncounter: boolean; seenCount: number; totalCount: number } {
    if (!pool || pool.length === 0) {
      throw new Error(`Pool for ${storageKey} is empty`);
    }

    if (pool.length === 1) {
      return { item: pool[0], isFirstEncounter: true, seenCount: 1, totalCount: 1 };
    }

    const seen = this.getSeenIds(storageKey);

    // Unseen candidates excluding currently visible item
    let candidates = pool.filter(item => !seen.has(item.id) && item.id !== currentId);

    let isFirstEncounter = true;

    // If all items have been seen, reset seen memory and candidates
    if (candidates.length === 0) {
      seen.clear();
      // Candidates now any item except current
      candidates = pool.filter(item => item.id !== currentId);
      isFirstEncounter = false;
    }

    // Pick a random candidate from the fresh set
    const selected = candidates[Math.floor(Math.random() * candidates.length)] || pool[0];

    // Mark selected as seen
    seen.add(selected.id);
    this.saveSeenIds(storageKey, seen);

    return {
      item: selected,
      isFirstEncounter,
      seenCount: seen.size,
      totalCount: pool.length,
    };
  }

  public markSeen(id: string, storageKey: string): void {
    const seen = this.getSeenIds(storageKey);
    seen.add(id);
    this.saveSeenIds(storageKey, seen);
  }

  public getStats(storageKey: string, total: number): { seen: number; total: number } {
    const seen = this.getSeenIds(storageKey);
    return {
      seen: Math.min(seen.size, total),
      total,
    };
  }

  public resetAllFreshness(): void {
    const keys = ['jokes', 'riddles', 'wyr', 'trivia', 'facts', 'captions'];
    keys.forEach(k => localStorage.removeItem(`te_seen_${k}`));
  }
}

export const freshness = new FreshnessService();
