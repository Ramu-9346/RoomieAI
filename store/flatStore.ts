/**
 * FlatStore — current flat context: members, settings, invite state.
 * This is the group identity of the current session.
 */

import { create } from 'zustand';
import { immer }  from 'zustand/middleware/immer';

import type { Flat }        from '@models/Flat';
import type { Member }      from '@models/Member';
import type { FlatSettings } from '@models/Flat';

interface FlatState {
  flat: Flat | null;
  members: Member[];
  isLoading: boolean;

  // Actions
  setFlat:       (flat: Flat) => void;
  setMembers:    (members: Member[]) => void;
  updateMember:  (userId: string, patch: Partial<Member>) => void;
  removeMember:  (userId: string) => void;
  setSettings:   (settings: FlatSettings) => void;
  setLoading:    (loading: boolean) => void;
  clearFlat:     () => void;
}

export const useFlatStore = create<FlatState>()(
  immer((set) => ({
    flat:      null,
    members:   [],
    isLoading: false,

    setFlat: (flat) =>
      set((state) => { state.flat = flat; }),

    setMembers: (members) =>
      set((state) => { state.members = members; }),

    updateMember: (userId, patch) =>
      set((state) => {
        const idx = state.members.findIndex((m) => m.userId === userId);
        if (idx !== -1) Object.assign(state.members[idx]!, patch);
      }),

    removeMember: (userId) =>
      set((state) => {
        state.members = state.members.filter((m) => m.userId !== userId);
      }),

    setSettings: (settings) =>
      set((state) => {
        if (state.flat) state.flat.settings = settings;
      }),

    setLoading: (loading) =>
      set((state) => { state.isLoading = loading; }),

    clearFlat: () =>
      set((state) => {
        state.flat      = null;
        state.members   = [];
        state.isLoading = false;
      }),
  })),
);
