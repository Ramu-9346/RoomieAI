/**
 * useMembers — access flat members from store.
 * Selector-based for granular re-renders.
 */

import { useFlatStore }   from '@store/flatStore';
import type { Member }    from '@models/Member';

export function useMembers(): Member[] {
  return useFlatStore((s) => s.members);
}

export function useMember(userId: string): Member | undefined {
  return useFlatStore((s) => s.members.find((m) => m.userId === userId));
}

export function useIsAdmin(userId: string): boolean {
  return useFlatStore((s) =>
    s.members.find((m) => m.userId === userId)?.isAdmin ?? false,
  );
}

export function useOnlineMembers(): Member[] {
  return useFlatStore((s) => s.members.filter((m) => m.isOnline));
}
