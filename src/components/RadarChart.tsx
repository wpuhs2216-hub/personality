import type { AxisScores } from '../data/questions'

interface Props {
  scores: AxisScores
  size?: number
}

// 4軸のラベル
const axisLabels: { key: keyof AxisScores; label: string }[] = [
  { key: 'extroversion', label: '外向性' },
  { key: 'logic', label: '論理性' },
  { key: 'planning', label: '計画性' },
  { key: 'assertiveness', label: '主張性' },
]

export default function RadarChart({ scores, size = 280 }: Props) {
  const center = size / 2
  const maxRadius = size * 0.35
  const levels = 5 // グリッドの数

  // 4軸の角度（上から時計回り）
  const angles = axisLabels.map((_, i) => (i * 2 * Math.PI) / 4 - Math.PI / 2)

  // 座標計算
  const getPoint = (angle: number, radius: number) => ({
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius,
  })

  // グリッド線のポイント
  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const r = (maxRadius / levels) * (level + 1)
    return angles.map((a) => getPoint(a, r))
  })

  // データポイント
  const dataPoints = axisLabels.map((axis, i) => {
    const value = scores[axis.key] / 10 // 0-10を0-1に正規化
    return getPoint(angles[i], maxRadius * value)
  })

  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* グリッド */}
      {gridPolygons.map((points, level) => (
        <polygon
          key={level}
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
        />
      ))}

      {/* 軸線 */}
      {angles.map((angle, i) => {
        const end = getPoint(angle, maxRadius)
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        )
      })}

      {/* データ領域 */}
      <path
        d={dataPath}
        fill="rgba(139, 92, 246, 0.25)"
        stroke="var(--color-primary)"
        strokeWidth={2.5}
      />

      {/* データポイント */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="var(--color-primary)"
          stroke="white"
          strokeWidth={1.5}
        />
      ))}

      {/* ラベル */}
      {axisLabels.map((axis, i) => {
        const labelOffset = maxRadius + 30
        const pos = getPoint(angles[i], labelOffset)
        const value = scores[axis.key]
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--color-text)"
            fontSize={13}
            fontWeight="bold"
          >
            {axis.label}
            <tspan
              x={pos.x}
              dy={16}
              fontSize={11}
              fill="var(--color-text-muted)"
              fontWeight="normal"
            >
              {value.toFixed(1)}
            </tspan>
          </text>
        )
      })}
    </svg>
  )
}
