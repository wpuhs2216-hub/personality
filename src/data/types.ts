import type { AxisScores } from './questions'

// 性格タイプの型
export interface PersonalityType {
  id: string
  name: string
  emoji: string
  description: string
  // 各軸の理想的な重み（マッチング用）
  weights: {
    extroversion: [number, number]   // [最小, 最大] の理想範囲
    logic: [number, number]
    planning: [number, number]
    assertiveness: [number, number]
  }
}

// 8つの性格タイプ
export const personalityTypes: PersonalityType[] = [
  {
    id: 'leader',
    name: 'リーダータイプ',
    emoji: '🦁',
    description: '決断力があり行動的。周囲を引っ張る存在。困難な状況でも率先して動き、チームを目標に導く力を持っています。自信に満ちた姿勢で、周りに安心感を与えます。',
    weights: {
      extroversion: [6, 10],
      logic: [4, 7],
      planning: [5, 8],
      assertiveness: [8, 10],
    },
  },
  {
    id: 'supporter',
    name: 'サポータータイプ',
    emoji: '🐕',
    description: '面倒見が良く協調性が高い。縁の下の力持ち。相手の気持ちに寄り添い、チームの潤滑油として欠かせない存在です。困っている人を見ると放っておけない優しさがあります。',
    weights: {
      extroversion: [5, 8],
      logic: [3, 6],
      planning: [4, 7],
      assertiveness: [1, 3],
    },
  },
  {
    id: 'creator',
    name: 'クリエイタータイプ',
    emoji: '🦋',
    description: '独創的で自由な発想。常に新しいものを求める。既存の枠にとらわれず、ユニークなアイデアを生み出します。直感を信じ、自分だけの世界観を持っています。',
    weights: {
      extroversion: [4, 7],
      logic: [1, 4],
      planning: [1, 3],
      assertiveness: [4, 7],
    },
  },
  {
    id: 'analyst',
    name: 'アナリストタイプ',
    emoji: '🦉',
    description: '論理的で冷静。データや根拠を重視する。物事を多角的に分析し、最適な答えを導き出します。感情に流されず、客観的な判断ができる頼れる存在です。',
    weights: {
      extroversion: [1, 4],
      logic: [7, 10],
      planning: [6, 9],
      assertiveness: [3, 6],
    },
  },
  {
    id: 'entertainer',
    name: 'エンターテイナータイプ',
    emoji: '🐵',
    description: '場を盛り上げるムードメーカー。人を楽しませる天才。明るいオーラで周囲を巻き込み、どんな場面でもポジティブな雰囲気を作り出します。',
    weights: {
      extroversion: [8, 10],
      logic: [1, 4],
      planning: [1, 4],
      assertiveness: [4, 7],
    },
  },
  {
    id: 'dreamer',
    name: 'ドリーマータイプ',
    emoji: '🦄',
    description: '理想を追い求めるロマンチスト。想像力が豊か。大きなビジョンを描き、それに向かって情熱的に進む力があります。美しいものや感動に敏感な感性の持ち主です。',
    weights: {
      extroversion: [3, 6],
      logic: [2, 5],
      planning: [2, 5],
      assertiveness: [5, 8],
    },
  },
  {
    id: 'challenger',
    name: 'チャレンジャータイプ',
    emoji: '🐺',
    description: '困難に立ち向かう勇気の持ち主。負けず嫌い。高い目標を設定し、諦めずに挑戦し続ける強靭な精神力があります。逆境をバネに成長するタイプです。',
    weights: {
      extroversion: [5, 8],
      logic: [5, 8],
      planning: [4, 7],
      assertiveness: [7, 10],
    },
  },
  {
    id: 'healer',
    name: 'ヒーラータイプ',
    emoji: '🐱',
    description: '穏やかで人を癒す存在。共感力が高い。相手の感情を敏感に感じ取り、安心できる空間を作り出します。一緒にいるだけで心が穏やかになる不思議な魅力があります。',
    weights: {
      extroversion: [2, 5],
      logic: [2, 5],
      planning: [3, 6],
      assertiveness: [1, 3],
    },
  },
]

// スコアからタイプを判定
export function determineType(scores: AxisScores): PersonalityType {
  let bestType = personalityTypes[0]
  let bestScore = -Infinity

  for (const pType of personalityTypes) {
    // 各軸について理想範囲の中心との距離を計算
    const axes: (keyof AxisScores)[] = ['extroversion', 'logic', 'planning', 'assertiveness']
    let totalScore = 0

    for (const axis of axes) {
      const [min, max] = pType.weights[axis]
      const _center = (min + max) / 2
      const range = (max - min) / 2
      void _center
      const value = scores[axis]
      // 範囲内なら高スコア、範囲外なら距離に応じて減点
      if (value >= min && value <= max) {
        totalScore += 10
      } else {
        const distance = value < min ? min - value : value - max
        totalScore += Math.max(0, 10 - distance * 2 / range)
      }
    }

    if (totalScore > bestScore) {
      bestScore = totalScore
      bestType = pType
    }
  }

  return bestType
}

// イカサマ名前のマッピング
export const cheatNames: Record<string, { typeId: string; scores: AxisScores }> = {
  'えぐしゅぎ': {
    typeId: 'entertainer',
    scores: { extroversion: 9, logic: 8, planning: 8, assertiveness: 8 },
  },
  'あまつき': {
    typeId: 'leader',
    scores: { extroversion: 9, logic: 8, planning: 9, assertiveness: 9 },
  },
  'おおふぐり': {
    typeId: 'healer',
    scores: { extroversion: 2, logic: 2, planning: 2, assertiveness: 1 },
  },
}
