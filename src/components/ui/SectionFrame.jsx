const cornerStyle = {
  position: 'absolute',
  background: 'rgba(255,255,255,0.2)',
}

function Corner({ top, bottom, left, right }) {
  const hBar = {
    ...cornerStyle,
    width: '20px',
    height: '1px',
    ...(top !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
  }

  const vBar = {
    ...cornerStyle,
    width: '1px',
    height: '20px',
    ...(top !== undefined && { top }),
    ...(bottom !== undefined && { bottom }),
    ...(left !== undefined && { left }),
    ...(right !== undefined && { right }),
  }

  return (
    <>
      <div style={hBar} />
      <div style={vBar} />
    </>
  )
}

export default function SectionFrame({ children, label, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Corner top={0} left={0} />
      <Corner top={0} right={0} />
      <Corner bottom={0} left={0} />
      <Corner bottom={0} right={0} />

      {label && (
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--muted)',
            position: 'absolute',
            top: '8px',
            left: '8px',
          }}
        >
          ■ {label}
        </div>
      )}

      {children}
    </div>
  )
}
