// HSK course content. Add lessons / vocab as needed.
export const HSK_LEVELS = {
  1: {
    han: '一',
    title: 'HSK 1',
    subtitle: 'Foundations · 150 words',
    intro: 'First steps in Mandarin: greetings, numbers, family, and the basic sentence frame 主 + 谓 + 宾.',
    accent: '#c8a84b',
    lessons: [
      { no: 1, han: '你好',   pinyin: 'nǐ hǎo',     en: 'Hello',           note: 'Greetings & polite phrases' },
      { no: 2, han: '我是',   pinyin: 'wǒ shì',     en: 'I am',            note: 'Self-introduction · 是 verb' },
      { no: 3, han: '数字',   pinyin: 'shùzì',      en: 'Numbers',         note: '0 – 100, age, phone' },
      { no: 4, han: '家人',   pinyin: 'jiārén',     en: 'Family',          note: '爸爸 妈妈 哥哥 姐姐 …' },
      { no: 5, han: '日期',   pinyin: 'rìqī',       en: 'Dates & time',    note: 'Days, months, 几点' },
      { no: 6, han: '吃喝',   pinyin: 'chī hē',     en: 'Eating & drinking', note: '想 + V, 喜欢 + N' },
    ],
  },
  2: {
    han: '二',
    title: 'HSK 2',
    subtitle: 'Daily life · 300 words',
    intro: 'Routines, comparisons, past actions with 了 and the resultative pattern.',
    accent: '#a0906a',
    lessons: [
      { no: 1, han: '一天',     pinyin: 'yī tiān',     en: 'A day in the life', note: '起床 上班 回家' },
      { no: 2, han: '比较',     pinyin: 'bǐjiào',      en: 'Comparison',        note: 'A 比 B 更 …' },
      { no: 3, han: '过去',     pinyin: 'guòqù',       en: 'The past',          note: '了 · 过 · 时间词' },
      { no: 4, han: '出行',     pinyin: 'chūxíng',     en: 'Travel & transport',note: '坐 / 开 / 骑' },
      { no: 5, han: '天气',     pinyin: 'tiānqì',      en: 'Weather',           note: 'Adj. predicates · 比' },
      { no: 6, han: '健康',     pinyin: 'jiànkāng',    en: 'Health',            note: '生病 看病 药' },
    ],
  },
  3: {
    han: '三',
    title: 'HSK 3',
    subtitle: 'Conversation · 600 words',
    intro: 'Complex sentences, 把 / 被 constructions, complements of result and direction.',
    accent: '#8b6914',
    lessons: [
      { no: 1, han: '复杂句',   pinyin: 'fùzá jù',     en: 'Complex sentences', note: '虽然 … 但是 …' },
      { no: 2, han: '把字句',   pinyin: 'bǎ zì jù',    en: 'The 把 pattern',    note: '把 + obj + V + 了/result' },
      { no: 3, han: '被动',     pinyin: 'bèidòng',     en: 'Passive voice',     note: '被 / 让 / 叫' },
      { no: 4, han: '方向',     pinyin: 'fāngxiàng',   en: 'Direction',         note: 'V + 上来 / 下去 …' },
      { no: 5, han: '工作',     pinyin: 'gōngzuò',     en: 'At work',           note: '会议 同事 计划' },
      { no: 6, han: '观点',     pinyin: 'guāndiǎn',    en: 'Opinions',          note: '我觉得 / 应该 / 必须' },
    ],
  },
}

export const useHSK = () => ({ HSK_LEVELS })
