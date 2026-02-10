import { motion } from 'framer-motion'
import { Share2, RotateCcw, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import type { PersonalityType } from '../data/types'
import type { AxisScores } from '../data/questions'
import RadarChart from './RadarChart'

interface Props {
  name: string
  type: PersonalityType
  scores: AxisScores
  onRetry: () => void
}

export default function ResultScreen({ name, type, scores, onRetry }: Props) {
  const [copied, setCopied] = useState(false)

  const shareText = `${name}の性格は「${type.name}」でした！ #えぐしゅぎラボ #性格診断`

  const handleShare = async () => {
    // Web Share API対応チェック
    if (navigator.share) {
      try {
        await navigator.share({
          title: '性格診断結果',
          text: shareText,
        })
        return
      } catch {
        // ユーザーがキャンセルした場合など、フォールバック
      }
    }

    // フォールバック: クリップボードにコピー
    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードも使えない場合は何もしない
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center min-h-dvh px-6 py-8"
    >
      {/* ヘッダー */}
      <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {name}さんの診断結果
      </p>

      {/* タイプ名 */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-center mb-6"
      >
        <span className="text-6xl block mb-3">{type.emoji}</span>
        <h1 className="text-2xl font-bold"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {type.name}
        </h1>
      </motion.div>

      {/* 説明 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm leading-relaxed text-center max-w-sm mb-8"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {type.description}
      </motion.p>

      {/* レーダーチャート */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <RadarChart scores={scores} />
      </motion.div>

      {/* ボタン群 */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {/* シェアボタン */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-white cursor-pointer border-none"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              コピーしました！
            </>
          ) : (
            <>
              {'share' in navigator ? <Share2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              結果をシェア
            </>
          )}
        </motion.button>

        {/* もう一度ボタン */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-bold cursor-pointer border"
          style={{
            background: 'transparent',
            borderColor: 'rgba(255,255,255,0.15)',
            color: 'var(--color-text)',
          }}
        >
          <RotateCcw className="w-5 h-5" />
          もう一度診断
        </motion.button>
      </div>

      {/* フッター */}
      <p className="mt-8 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        えぐしゅぎラボ
      </p>
    </motion.div>
  )
}
