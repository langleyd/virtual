import React from 'react'
import ReactDOM from 'react-dom/client'
import { useVirtualizer } from '@tanstack/react-virtual'

// Deterministic sizing: every row is ITEM_SIZE tall while the virtualizer
// estimates ESTIMATE. The gap means every above-viewport item that gets
// measured for the first time produces a predictable estimate→actual delta,
// which is exactly the scenario where scrolling up must compensate scrollTop
// to keep the anchored content visually stable.
const ITEM_SIZE = 90
const ESTIMATE = 50

const App = () => {
  const parentRef = React.useRef<HTMLDivElement>(null)
  const params = new URLSearchParams(window.location.search)
  const initialOffset = Number(params.get('initialOffset') ?? 0)
  const overscan = Number(params.get('overscan') ?? 1)
  const adjustOnBackwardScroll = params.has('adjustOnBackwardScroll')
  const [grownBy, setGrownBy] = React.useState<Record<number, number>>({})
  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATE,
    initialOffset,
    overscan,
    adjustOnBackwardScroll,
  })
  // Lets a test grow a row after it was measured, like an image loading in it.
  ;(window as any).__growRow = (index: number, by: number) =>
    setGrownBy((current) => ({ ...current, [index]: by }))

  return (
    <div
      ref={parentRef}
      id="scroll-container"
      style={{ height: 400, overflow: 'auto' }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((v) => (
          <div
            key={v.key}
            data-testid={`item-${v.index}`}
            ref={rowVirtualizer.measureElement}
            data-index={v.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translateY(${v.start}px)`,
              width: '100%',
            }}
          >
            <div style={{ height: ITEM_SIZE + (grownBy[v.index] ?? 0) }}>
              Row {v.index}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
