---
'@tanstack/virtual-core': minor
---

Add an `adjustOnBackwardScroll` option. By default the scroll position is not adjusted when an already-measured item above the viewport changes size while the user scrolls backward, so content finishing loading there (an image, an embed) shifts the items being read. Set `adjustOnBackwardScroll: true` to adjust in either direction without replacing the whole default with `shouldAdjustScrollPositionOnItemSizeChange`.
