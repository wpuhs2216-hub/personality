import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, ArrowRight } from 'lucide-react'

interface Props {
  onStart: (name: string) => void
}

export default function StartScreen({ onStart }: Props) {
  const [name, setName] = useState('')

  // localStorageから名前を復元
  useEffect(() => {
    const saved = localStorage.getItem('personality-name')
    if (saved) setName(saved)
  }, [])

  const handleStart = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    localStorage.setItem('personality-name', trimmed)
    onStart(trimmed)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6"
    >
      {/* アイコン */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
        >
          <Brain className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-2 text-center">
        性格診断
      </h1>
      <p className="text-sm mb-8 text-center" style={{ color: 'var(--color-text-muted)' }}>
        10の質問であなたの性格タイプを診断します
      </p>

      {/* 名前入力 */}
      <div className="w-full max-w-xs mb-6">
        <label htmlFor="name-input" className="block text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
          あなたの名前
        </label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleStart() }}
          placeholder="名前を入力..."
          className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all duration-200 focus:ring-2"
          style={{
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          maxLength={20}
          autoComplete="off"
        />
      </div>

      {/* スタートボタン */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleStart}
        disabled={!name.trim()}
        className="flex items-center gap-2 px-8 py-3 rounded-xl text-base font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        style={{
          background: name.trim()
            ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
            : 'var(--color-surface)',
        }}
      >
        診断スタート
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* フッター */}
      <p className="mt-12 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        えぐしゅぎラボ
      </p>
    </motion.div>
  )
}
