/**
 * RoomieAI Z-Index Layer System
 *
 * Defines a strict z-index stack so layers never fight each other.
 * Higher number = closer to user.
 *
 * Layers from bottom to top:
 *   base → above → card → sticky → floating → overlay → modal → toast
 *
 * Always use these tokens. Never hardcode z-index values.
 * On React Native, z-index is managed via `zIndex` in ViewStyle.
 */

export const zIndex = {
  /**
   * base — 0
   * Used: Default document flow, screen background, standard content
   */
  base: 0,

  /**
   * above — 1
   * Used: Elements that need to sit just above their siblings
   * Example: Member avatar overlap in the member row
   */
  above: 1,

  /**
   * card — 10
   * Used: Standard interactive cards in lists/feeds
   */
  card: 10,

  /**
   * sticky — 20
   * Used: Sticky headers, section list headers that pin on scroll
   */
  sticky: 20,

  /**
   * tabBar — 30
   * Used: Bottom tab navigation bar
   */
  tabBar: 30,

  /**
   * chatInput — 35
   * Used: Floating chat input anchored above tab bar
   * Must sit above tab bar content but below overlays
   */
  chatInput: 35,

  /**
   * floating — 40
   * Used: FAB, floating tooltips, dropdown menus
   */
  floating: 40,

  /**
   * header — 50
   * Used: Top app bar / navigation header
   */
  header: 50,

  /**
   * overlay — 60
   * Used: Semi-transparent overlay behind modals and bottom sheets
   */
  overlay: 60,

  /**
   * bottomSheet — 70
   * Used: Bottom sheet panels
   */
  bottomSheet: 70,

  /**
   * modal — 80
   * Used: Full modal dialogs (ConfirmDialog)
   */
  modal: 80,

  /**
   * toast — 90
   * Used: Toast notifications and snackbars — always on top of everything
   */
  toast: 90,

  /**
   * debug — 999
   * Used: Development overlays only — never in production
   */
  debug: 999,

} as const;

export type ZIndexKey = keyof typeof zIndex;
