import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface Props {
  onBack: () => void
  onStartDiagnosis: () => void
}

// 各軸の定義データ
const axes = [
  {
    icon: '👥',
    name: '群れ度',
    high: { letter: 'G', label: '群れ', desc: 'みんなでワイワイが元気の源。一人は寂しい' },
    low: { letter: 'B', label: 'ぼっち', desc: '一人の時間が最高の贅沢。人混みは疲れる' },
    character: { name: 'ぺかりん', type: 'GRCT', side: 'high' as const, img: 'pekarin.png' },
  },
  {
    icon: '💭',
    name: '現実逃避度',
    high: { letter: 'M', label: '妄想', desc: '「もしも」の世界に生きる夢想家。可能性にワクワク' },
    low: { letter: 'R', label: 'リアル', desc: '数字と事実が全て。地に足ついた現実主義者' },
    character: null,
  },
  {
    icon: '❄️',
    name: '薄情度',
    high: { letter: 'C', label: 'クール', desc: '論理で判断、感情に流されない。合理的だけど冷たいかも' },
    low: { letter: 'W', label: 'ウェット', desc: '感情豊か、共感力の塊。涙もろいけど人の気持ちがわかる' },
    character: { name: 'しゃっちー', type: 'BMCT', side: 'high' as const, img: 'shacchi.png' },
  },
  {
    icon: '📋',
    name: '仕切り度',
    high: { letter: 'K', label: 'きっちり', desc: '計画通りに進めたい完璧主義。ルールは守るもの' },
    low: { letter: 'T', label: 'テキトー', desc: 'なんとかなるさ精神。自由と柔軟さが信条' },
    character: null,
  },
]

// 組み合わせ例
const examples = [
  { code: 'GMCK', name: 'とらぶる', emoji: '📉' },
  { code: 'BRWT', name: 'らむむ', img: 'ramumu.jpg' },
  { code: 'BMCT', name: 'しゃっちー', img: 'shacchi.png' },
  { code: 'GRCT', name: 'ぺかりん', img: 'pekarin.png' },
]

export default function HowItWorksScreen({ onBack, onStartDiagnosis }: Props) {
  const basePath = import.meta.env.BASE_URL

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="min-h-dvh px-4 py-6"
    >
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg transition-colors cursor-pointer hover:opacity-80"
          style={{ background: 'var(--color-surface)' }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">診断の仕組み</h1>
      </div>

      {/* イントロ */}
      <div
        className="rounded-xl p-4 mb-6 text-center"
        style={{ background: 'var(--color-surface)' }}
      >
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          10の質問で<span className="font-bold" style={{ color: 'var(--color-text)' }}>4つの軸</span>を測定
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          組み合わせで<span className="font-bold" style={{ color: 'var(--color-text)' }}>16タイプ</span>に分類
        </p>
      </div>

      {/* 各軸セクション */}
      {axes.map((axis, i) => (
        <div key={i} className="mb-6">
          {/* 軸ヘッダー */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{axis.icon}</span>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>
              軸{i + 1}:
            </span>
            <span className="font-bold">{axis.high.letter} / {axis.low.letter}</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              — {axis.name}
            </span>
          </div>

          {/* カード2枚 */}
          <div className="grid grid-cols-2 gap-3">
            {/* 高い方 */}
            <div
              className="rounded-xl p-3"
              style={{ background: 'var(--color-surface)', border: '1px solid rgba(139,92,246,0.3)' }}
            >
              <div className="flex items-center gap-1 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-primary)', color: 'white' }}
                >
                  {axis.high.letter}
                </span>
                <span className="text-sm font-bold">{axis.high.label}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {axis.high.desc}
              </p>
            </div>

            {/* 低い方 */}
            <div
              className="rounded-xl p-3"
              style={{ background: 'var(--color-surface)', border: '1px solid rgba(99,102,241,0.3)' }}
            >
              <div className="flex items-center gap-1 mb-1">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-accent)', color: 'white' }}
                >
                  {axis.low.letter}
                </span>
                <span className="text-sm font-bold">{axis.low.label}</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {axis.low.desc}
              </p>
            </div>
          </div>

          {/* キャラ例 */}
          {axis.character && (
            <div className="flex items-center gap-3 mt-3 px-2">
              <img
                src={`${basePath}characters/${axis.character.img}`}
                alt={axis.character.name}
                className="w-12 h-12 rounded-full object-cover"
                style={{ border: '2px solid var(--color-primary)' }}
              />
              <div>
                <span className="text-sm font-bold">{axis.character.name}</span>
                <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)' }}>
                  ({axis.character.type}) — {axis.character.side === 'high' ? axis.high.letter : axis.low.letter} の例
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 組み合わせ例 */}
      <div className="mb-8">
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--color-text-muted)' }}>
          4文字の組み合わせ例
        </h2>
        <div className="space-y-2">
          {examples.map((ex) => (
            <div
              key={ex.code}
              className="flex items-center gap-3 rounded-xl p-3"
              style={{ background: 'var(--color-surface)' }}
            >
              {ex.img ? (
                <img
                  src={`${basePath}characters/${ex.img}`}
                  alt={ex.name}
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ border: '2px solid var(--color-primary)' }}
                />
              ) : (
                <span className="text-2xl w-10 h-10 flex items-center justify-center">{ex.emoji}</span>
              )}
              <div>
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded mr-2"
                  style={{ background: 'rgba(139,92,246,0.2)', color: 'var(--color-primary)' }}
                >
                  {ex.code}
                </span>
                <span className="text-sm font-bold">{ex.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTAボタン */}
      <div className="flex flex-col items-center gap-4 pb-8">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStartDiagnosis}
          className="flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
        >
          診断してみる
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        {/* フッター */}
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          えぐしゅぎラボ
        </p>
      </div>
    </motion.div>
  )
}
