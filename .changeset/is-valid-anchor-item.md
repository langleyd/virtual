---
'@tanstack/virtual-core': minor
---

Add an `isValidAnchorItem` option for `anchorTo: 'end'`. When list edges change, the virtualizer anchors on the item under the current scroll offset and restores it by key after the update. Return `false` from `isValidAnchorItem(item)` to reject an anchor candidate — intended for transient placeholder rows rendered at the extreme edges (loading spinners, "load more", skeletons) whose key does not survive the next update. Anchoring on such a row leaves a prepend uncompensated and jumps the list to the edge; when it is rejected, the virtualizer anchors on the nearest accepted item one index inward, whose key persists.
