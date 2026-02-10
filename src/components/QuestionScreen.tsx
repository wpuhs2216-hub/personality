import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { questions } from '../data/questions'

interface Props {
  onComplete: (answers: number[]) => void
  onBack: () => void
}

// スライド方向を管理するための型
type Direction = 'next' | 'prev'

const slideVariants = {
  enter: (direction: Direction) => ({
    x: direction === 'next' ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: Direction) => ({
    x: direction === 'next' ? -300 : 300,
    opacity: 0,
  }),
}

export default function QuestionScreen({ onComplete, onBack }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [direction, setDirection] = useState<Direction>('next')

  const question = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  const handleAnswer = (choiceIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = choiceIndex
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setDirection('next')
      setCurrentIndex(currentIndex + 1)
    } else {
      // 全問回答完了
      onComplete(newAnswers)
    }
  }

  const handlePrev = () => {
    if (currentIndex === 0) {
      onBack()
      return
    }
    setDirection('prev')
    setCurrentIndex(currentIndex - 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-dvh px-6 py-8"
    >
      {/* ヘッダー: 戻るボタン + 問番号 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 text-sm cursor-pointer bg-transparent border-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          戻る
        </button>
        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* プログレスバー */}
      <div className="w-full h-2 rounded-full mb-8 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 質問エリア */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {/* 質問テキスト */}
            <h2 className="text-xl font-bold mb-8 text-center">
              Q{question.id}. {question.text}
            </h2>

            {/* 選択肢 */}
            <div className="flex flex-col gap-3">
              {question.choices.map((choice, idx) => {
                const isSelected = answers[currentIndex] === idx
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(idx)}
                    className="w-full px-5 py-4 rounded-xl text-left text-base transition-all duration-200 cursor-pointer border"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                        : 'var(--color-surface)',
                      borderColor: isSelected
                        ? 'transparent'
                        : 'rgba(255,255,255,0.08)',
                      color: 'var(--color-text)',
                    }}
                  >
                    <span className="font-bold mr-2" style={{ color: isSelected ? 'white' : 'var(--color-primary)' }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {choice.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
