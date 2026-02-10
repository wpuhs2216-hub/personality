// 4軸のスコア型
export interface AxisScores {
  extroversion: number   // 外向性
  logic: number          // 論理性
  planning: number       // 計画性
  assertiveness: number  // 主張性
}

// 選択肢の型
export interface Choice {
  label: string
  scores: AxisScores
}

// 質問の型
export interface Question {
  id: number
  text: string
  choices: Choice[]
}

// 全10問の質問データ
export const questions: Question[] = [
  {
    id: 1,
    text: '休日の過ごし方は？',
    choices: [
      { label: '友達と外出', scores: { extroversion: 8, logic: 3, planning: 4, assertiveness: 5 } },
      { label: '一人で趣味', scores: { extroversion: 2, logic: 5, planning: 5, assertiveness: 3 } },
      { label: '新しい場所を探検', scores: { extroversion: 6, logic: 3, planning: 2, assertiveness: 6 } },
      { label: '家でゆっくり読書', scores: { extroversion: 1, logic: 7, planning: 6, assertiveness: 2 } },
    ],
  },
  {
    id: 2,
    text: 'グループワークでの役割は？',
    choices: [
      { label: 'まとめ役', scores: { extroversion: 7, logic: 5, planning: 7, assertiveness: 8 } },
      { label: 'アイデア出し', scores: { extroversion: 5, logic: 3, planning: 2, assertiveness: 5 } },
      { label: '資料作成', scores: { extroversion: 2, logic: 8, planning: 8, assertiveness: 3 } },
      { label: '雰囲気作り', scores: { extroversion: 8, logic: 2, planning: 3, assertiveness: 4 } },
    ],
  },
  {
    id: 3,
    text: '買い物のスタイルは？',
    choices: [
      { label: '計画的に必要なものだけ', scores: { extroversion: 3, logic: 8, planning: 9, assertiveness: 5 } },
      { label: '直感で気に入ったものを', scores: { extroversion: 5, logic: 2, planning: 1, assertiveness: 6 } },
      { label: '徹底リサーチ', scores: { extroversion: 2, logic: 9, planning: 7, assertiveness: 4 } },
      { label: '人の意見を参考に', scores: { extroversion: 6, logic: 4, planning: 4, assertiveness: 2 } },
    ],
  },
  {
    id: 4,
    text: '友達から相談されたら？',
    choices: [
      { label: '解決策を提案', scores: { extroversion: 5, logic: 8, planning: 6, assertiveness: 8 } },
      { label: 'とにかく話を聞く', scores: { extroversion: 4, logic: 3, planning: 3, assertiveness: 1 } },
      { label: '一緒に調べる', scores: { extroversion: 4, logic: 7, planning: 5, assertiveness: 3 } },
      { label: '気分転換に誘う', scores: { extroversion: 8, logic: 2, planning: 2, assertiveness: 5 } },
    ],
  },
  {
    id: 5,
    text: 'ストレス解消法は？',
    choices: [
      { label: '運動やアクティビティ', scores: { extroversion: 7, logic: 4, planning: 5, assertiveness: 7 } },
      { label: '音楽や映画', scores: { extroversion: 2, logic: 3, planning: 3, assertiveness: 3 } },
      { label: '誰かに話す', scores: { extroversion: 8, logic: 2, planning: 2, assertiveness: 4 } },
      { label: '一人の時間を作る', scores: { extroversion: 1, logic: 6, planning: 5, assertiveness: 4 } },
    ],
  },
  {
    id: 6,
    text: '旅行の計画は？',
    choices: [
      { label: '細かくスケジュールを組む', scores: { extroversion: 4, logic: 7, planning: 10, assertiveness: 6 } },
      { label: '行き当たりばったり', scores: { extroversion: 6, logic: 2, planning: 1, assertiveness: 5 } },
      { label: '現地の人におすすめを聞く', scores: { extroversion: 8, logic: 3, planning: 3, assertiveness: 3 } },
      { label: '有名スポットを効率よく回る', scores: { extroversion: 5, logic: 8, planning: 8, assertiveness: 5 } },
    ],
  },
  {
    id: 7,
    text: '意見が対立したとき？',
    choices: [
      { label: '自分の意見を主張', scores: { extroversion: 6, logic: 5, planning: 5, assertiveness: 10 } },
      { label: '相手の意見を尊重', scores: { extroversion: 4, logic: 4, planning: 4, assertiveness: 1 } },
      { label: '妥協点を探す', scores: { extroversion: 5, logic: 7, planning: 6, assertiveness: 5 } },
      { label: '第三者の意見を求める', scores: { extroversion: 5, logic: 6, planning: 5, assertiveness: 3 } },
    ],
  },
  {
    id: 8,
    text: '褒められたときの反応は？',
    choices: [
      { label: '素直に喜ぶ', scores: { extroversion: 7, logic: 3, planning: 3, assertiveness: 5 } },
      { label: '照れる', scores: { extroversion: 3, logic: 3, planning: 4, assertiveness: 2 } },
      { label: '次も頑張ろうと思う', scores: { extroversion: 4, logic: 6, planning: 7, assertiveness: 7 } },
      { label: 'お世辞かなと疑う', scores: { extroversion: 2, logic: 8, planning: 5, assertiveness: 4 } },
    ],
  },
  {
    id: 9,
    text: '仕事・勉強のスタイルは？',
    choices: [
      { label: 'コツコツ計画的に', scores: { extroversion: 3, logic: 7, planning: 10, assertiveness: 5 } },
      { label: '締め切り直前に集中', scores: { extroversion: 4, logic: 4, planning: 1, assertiveness: 5 } },
      { label: 'チームで協力', scores: { extroversion: 8, logic: 4, planning: 5, assertiveness: 3 } },
      { label: '自分のペースで', scores: { extroversion: 2, logic: 5, planning: 6, assertiveness: 6 } },
    ],
  },
  {
    id: 10,
    text: '理想のリーダー像は？',
    choices: [
      { label: 'カリスマ的で引っ張る人', scores: { extroversion: 7, logic: 4, planning: 5, assertiveness: 9 } },
      { label: '話をよく聞いてくれる人', scores: { extroversion: 5, logic: 3, planning: 4, assertiveness: 1 } },
      { label: '公平で論理的な人', scores: { extroversion: 3, logic: 9, planning: 7, assertiveness: 5 } },
      { label: 'ユーモアがある人', scores: { extroversion: 8, logic: 2, planning: 2, assertiveness: 4 } },
    ],
  },
]
