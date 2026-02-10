import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'

interface Props {
  onComplete: () => void
}

export default function AnalyzingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh px-6"
    >
      {/* 光るブレインアイコン */}
      <div className="relative mb-8">
        {/* 背景グロー */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: 'var(--color-primary)', opacity: 0.3 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* アイコン本体 */}
        <motion.div
          className="relative w-28 h-28 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Brain className="w-14 h-14 text-white" />
        </motion.div>
        {/* パーティクル的な光点 */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: 'var(--color-primary)', top: '50%', left: '50%' }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 2) * 60, 0],
              y: [0, Math.sin((i * Math.PI) / 2) * 60, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* テキスト */}
      <motion.h2
        className="text-xl font-bold mb-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        分析中...
      </motion.h2>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        あなたの性格を分析しています
      </p>

      {/* ローディングドット */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ background: 'var(--color-primary)' }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
