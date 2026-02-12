import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { questions } from './data/questions'
import type { AxisScores } from './data/questions'
import { determineType, cheatNames, personalityTypes } from './data/types'
import type { PersonalityType } from './data/types'
import StartScreen from './components/StartScreen'
import QuestionScreen from './components/QuestionScreen'
import AnalyzingScreen from './components/AnalyzingScreen'
import ResultScreen from './components/ResultScreen'
import HowItWorksScreen from './components/HowItWorksScreen'

// 画面の状態
type Screen = 'start' | 'questions' | 'analyzing' | 'result' | 'howItWorks'

function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [name, setName] = useState('')
  const [resultType, setResultType] = useState<PersonalityType | null>(null)
  const [resultScores, setResultScores] = useState<AxisScores | null>(null)

  // スタート画面から質問画面へ
  const handleStart = (inputName: string) => {
    setName(inputName)
    setScreen('questions')
  }

  // 質問完了 → 分析画面へ
  const handleQuestionsComplete = (answers: number[]) => {
    // イカサマ判定
    const cheat = cheatNames[name]
    if (cheat) {
      const type = personalityTypes.find((t) => t.id === cheat.typeId)!
      setResultType(type)
      setResultScores(cheat.scores)
    } else {
      // 通常のスコア計算
      const totalScores: AxisScores = { extroversion: 0, logic: 0, planning: 0, assertiveness: 0 }
      answers.forEach((choiceIdx, qIdx) => {
        const choice = questions[qIdx].choices[choiceIdx]
        totalScores.extroversion += choice.scores.extroversion
        totalScores.logic += choice.scores.logic
        totalScores.planning += choice.scores.planning
        totalScores.assertiveness += choice.scores.assertiveness
      })
      // 10問の平均（各質問0-10なので合計を10で割る）
      const avgScores: AxisScores = {
        extroversion: totalScores.extroversion / questions.length,
        logic: totalScores.logic / questions.length,
        planning: totalScores.planning / questions.length,
        assertiveness: totalScores.assertiveness / questions.length,
      }
      const type = determineType(avgScores)
      setResultType(type)
      setResultScores(avgScores)
    }

    setScreen('analyzing')
  }

  // 分析完了 → 結果画面へ
  const handleAnalyzingComplete = useCallback(() => {
    setScreen('result')
  }, [])

  // もう一度診断
  const handleRetry = () => {
    setScreen('start')
    setResultType(null)
    setResultScores(null)
  }

  // 質問画面から戻る
  const handleBackToStart = () => {
    setScreen('start')
  }

  // 診断の仕組みページへ
  const handleShowHowItWorks = () => {
    setScreen('howItWorks')
  }

  // 診断の仕組みから戻る
  const handleHowItWorksBack = () => {
    setScreen('start')
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {screen === 'start' && (
          <StartScreen key="start" onStart={handleStart} onShowHowItWorks={handleShowHowItWorks} />
        )}
        {screen === 'howItWorks' && (
          <HowItWorksScreen key="howItWorks" onBack={handleHowItWorksBack} onStartDiagnosis={() => setScreen('start')} />
        )}
        {screen === 'questions' && (
          <QuestionScreen key="questions" onComplete={handleQuestionsComplete} onBack={handleBackToStart} />
        )}
        {screen === 'analyzing' && (
          <AnalyzingScreen key="analyzing" onComplete={handleAnalyzingComplete} />
        )}
        {screen === 'result' && resultType && resultScores && (
          <ResultScreen
            key="result"
            name={name}
            type={resultType}
            scores={resultScores}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
