// Pinyin reference data — initials, finals, tones, and the standard
// pinyin syllable table.
//
// Data is derived from public references such as the DigMandarin pinyin
// chart, the StudyCLI / Yoyo Chinese / Mandarin Rocks / LTL pinyin charts,
// and the Princeton University Press "Chinese Romanization" introduction.
// Pinyin spellings follow Hanyu Pinyin standard (GB/T 16159).

export const PINYIN_TONES = [
  { n: 1, mark: 'ā', name: '阴平', en: 'High level',     desc: 'Steady, high pitch — like singing one note.', curve: 'M0,15 L60,15' },
  { n: 2, mark: 'á', name: '阳平', en: 'Rising',         desc: 'Pitch rises — like asking a question in English.', curve: 'M0,40 Q30,40 60,5' },
  { n: 3, mark: 'ǎ', name: '上声', en: 'Falling-rising', desc: 'Pitch dips low, then rises.', curve: 'M0,15 Q15,35 30,40 Q45,35 60,10' },
  { n: 4, mark: 'à', name: '去声', en: 'Falling',        desc: 'Sharp drop from high to low — like a firm command.', curve: 'M0,5 L60,40' },
  { n: 0, mark: 'a', name: '轻声', en: 'Neutral',        desc: 'Short, light and unstressed; no tone mark.', curve: 'M0,28 L60,28' },
]

// 21 standard initials, grouped by place / manner of articulation.
export const PINYIN_INITIALS = [
  {
    group: 'Labials',
    en: 'Bilabial / labio-dental',
    color: '#9b2226',
    items: [
      { c: 'b', ipa: '/p/',     hint: 'Like English "b" in "spy" — unaspirated.', sample: 'bā 八' },
      { c: 'p', ipa: '/pʰ/',    hint: 'Like English "p" in "pie" — strong puff.',  sample: 'pà 怕' },
      { c: 'm', ipa: '/m/',     hint: 'Like English "m" in "me".',                 sample: 'mā 妈' },
      { c: 'f', ipa: '/f/',     hint: 'Like English "f" in "fan".',                sample: 'fā 发' },
    ],
  },
  {
    group: 'Alveolars',
    en: 'Tongue-tip · alveolar',
    color: '#0f766e',
    items: [
      { c: 'd', ipa: '/t/',     hint: 'Like English "d" in "stop" — unaspirated.', sample: 'dà 大' },
      { c: 't', ipa: '/tʰ/',    hint: 'Like English "t" in "top" — strong puff.',  sample: 'tā 他' },
      { c: 'n', ipa: '/n/',     hint: 'Like English "n" in "no".',                 sample: 'nǐ 你' },
      { c: 'l', ipa: '/l/',     hint: 'Like English "l" in "love".',               sample: 'lái 来' },
    ],
  },
  {
    group: 'Velars',
    en: 'Back of tongue · soft palate',
    color: '#7c5a1e',
    items: [
      { c: 'g', ipa: '/k/',     hint: 'Like English "g" in "skip" — unaspirated.', sample: 'gē 哥' },
      { c: 'k', ipa: '/kʰ/',    hint: 'Like English "k" in "key" — strong puff.',  sample: 'kàn 看' },
      { c: 'h', ipa: '/x/',     hint: 'Raspier than English "h"; air at back of throat.', sample: 'hǎo 好' },
    ],
  },
  {
    group: 'Palatals',
    en: 'Front of tongue · hard palate (always + i / ü)',
    color: '#4338ca',
    items: [
      { c: 'j', ipa: '/tɕ/',    hint: 'Tongue tip down; like a soft "j" in "jeep".', sample: 'jī 鸡' },
      { c: 'q', ipa: '/tɕʰ/',   hint: 'Aspirated "ch" with a smile.',               sample: 'qī 七' },
      { c: 'x', ipa: '/ɕ/',     hint: 'Soft "sh" — tongue tip behind lower teeth.', sample: 'xǐ 喜' },
    ],
  },
  {
    group: 'Retroflex',
    en: 'Tongue curled back',
    color: '#b45309',
    items: [
      { c: 'zh', ipa: '/ʈʂ/',   hint: 'Like English "j" in "jerk", tongue curled back.', sample: 'zhōng 中' },
      { c: 'ch', ipa: '/ʈʂʰ/',  hint: 'Strong "ch" with curled tongue.',           sample: 'chī 吃' },
      { c: 'sh', ipa: '/ʂ/',    hint: 'Like English "sh", tongue curled back.',    sample: 'shī 师' },
      { c: 'r',  ipa: '/ʐ/',    hint: 'Between English "r" and the "s" in "leisure".', sample: 'rì 日' },
    ],
  },
  {
    group: 'Sibilants',
    en: 'Tongue tip · teeth',
    color: '#be123c',
    items: [
      { c: 'z', ipa: '/ts/',    hint: 'Like English "ds" in "kids".',              sample: 'zì 字' },
      { c: 'c', ipa: '/tsʰ/',   hint: 'Like English "ts" in "its" — aspirated.',   sample: 'cǎo 草' },
      { c: 's', ipa: '/s/',     hint: 'Like English "s" in "see".',                sample: 'sān 三' },
    ],
  },
]

// 35+ finals grouped by their nucleus vowel.
export const PINYIN_FINALS = [
  {
    group: 'Simple',
    en: 'Single-vowel finals',
    color: '#7c5a1e',
    items: [
      { c: 'a',  hint: 'Open "a" as in "father".',                       sample: 'mā 妈' },
      { c: 'o',  hint: 'Round "o" as in "or".',                          sample: 'wǒ 我' },
      { c: 'e',  hint: 'Schwa-like "uh" as in "the".',                   sample: 'gē 哥' },
      { c: 'i',  hint: 'Long "ee" as in "see" (after most initials).',   sample: 'nǐ 你' },
      { c: 'u',  hint: 'Long "oo" as in "boot".',                        sample: 'wǔ 五' },
      { c: 'ü',  hint: 'Round lips for "u", say "ee" — French "tu".',     sample: 'lǜ 绿' },
    ],
  },
  {
    group: 'Compound (a / o)',
    en: 'Two-vowel diphthongs',
    color: '#0f766e',
    items: [
      { c: 'ai', hint: '"a" + "i" — like "eye".',                        sample: 'mǎi 买' },
      { c: 'ei', hint: '"e" + "i" — like "may".',                        sample: 'měi 美' },
      { c: 'ao', hint: '"a" + "o" — like "ow!".',                        sample: 'hǎo 好' },
      { c: 'ou', hint: '"o" + "u" — like "oh".',                         sample: 'gǒu 狗' },
    ],
  },
  {
    group: 'Nasal -n',
    en: 'Nasal endings (front)',
    color: '#4338ca',
    items: [
      { c: 'an',  hint: '"a" + "n".',                                    sample: 'sān 三' },
      { c: 'en',  hint: '"e" (uh) + "n".',                               sample: 'rén 人' },
    ],
  },
  {
    group: 'Nasal -ng',
    en: 'Nasal endings (back)',
    color: '#312e81',
    items: [
      { c: 'ang', hint: '"a" + "ng" as in "song".',                      sample: 'cháng 长' },
      { c: 'eng', hint: '"e" + "ng".',                                   sample: 'fēng 风' },
      { c: 'ong', hint: '"o" + "ng".',                                   sample: 'dōng 东' },
    ],
  },
  {
    group: 'Special',
    en: 'Retroflex final',
    color: '#9b2226',
    items: [
      { c: 'er',  hint: 'Curl tongue back at the end.',                  sample: 'èr 二' },
    ],
  },
  {
    group: 'i- group',
    en: 'Beginning with "i"',
    color: '#b45309',
    items: [
      { c: 'ia',   hint: '"i" + "a".',                                   sample: 'jiā 家' },
      { c: 'ie',   hint: '"i" + "e" — like "yeh".',                       sample: 'xiě 写' },
      { c: 'iao',  hint: '"i" + "ao".',                                   sample: 'xiǎo 小' },
      { c: 'iu',   hint: 'Spelled "iu" but pronounced "iou".',            sample: 'liù 六' },
      { c: 'ian',  hint: '"i" + "an" — sounds like "yen".',               sample: 'tiān 天' },
      { c: 'in',   hint: 'Like English "in".',                            sample: 'nín 您' },
      { c: 'iang', hint: '"i" + "ang".',                                  sample: 'liáng 凉' },
      { c: 'ing',  hint: 'Like English "ing".',                           sample: 'míng 明' },
      { c: 'iong', hint: '"i" + "ong" — say "ü-ong".',                    sample: 'xiōng 兄' },
    ],
  },
  {
    group: 'u- group',
    en: 'Beginning with "u"',
    color: '#0d9488',
    items: [
      { c: 'ua',   hint: '"u" + "a".',                                   sample: 'huā 花' },
      { c: 'uo',   hint: '"u" + "o" — round, gliding.',                  sample: 'duō 多' },
      { c: 'uai',  hint: '"u" + "ai" — like "why".',                     sample: 'kuài 快' },
      { c: 'ui',   hint: 'Spelled "ui" but pronounced "uei".',           sample: 'huí 回' },
      { c: 'uan',  hint: '"u" + "an".',                                  sample: 'huān 欢' },
      { c: 'un',   hint: 'Spelled "un" but pronounced "uen".',           sample: 'wèn 问' },
      { c: 'uang', hint: '"u" + "ang".',                                 sample: 'huáng 黄' },
      { c: 'ueng', hint: 'Only in "weng" — appears alone.',              sample: 'wēng 翁' },
    ],
  },
  {
    group: 'ü- group',
    en: 'Beginning with "ü"',
    color: '#7c3aed',
    items: [
      { c: 'üe',  hint: '"ü" + "e".',                                    sample: 'xuě 雪' },
      { c: 'üan', hint: '"ü" + "an" — sounds like "üen".',               sample: 'yuán 元' },
      { c: 'ün',  hint: '"ü" + "n".',                                    sample: 'qún 群' },
    ],
  },
]

// Spelling and pronunciation rules students often miss.
export const PINYIN_RULES = [
  {
    title: 'Standalone "i", "u", "ü"',
    body: 'When a final starting with i, u, or ü appears with no initial, it is rewritten with y or w: i → yi, u → wu, ü → yu, ie → ye, iao → yao, ian → yan, in → yin, ing → ying, iong → yong, ua → wa, uo → wo, uai → wai, ui → wei, uan → wan, un → wen, uang → wang, ueng → weng, üe → yue, üan → yuan, ün → yun.',
  },
  {
    title: 'ü loses its dots after j q x y',
    body: 'After j, q, x, or y, ü is always written u — but still pronounced ü: ju (jü), qu (qü), xu (xü), yu (ü). After n and l it keeps its dots: nü, lü.',
  },
  {
    title: 'Hidden vowels',
    body: 'iu is short for iou: liù = li-ou. ui is short for uei: huí = hu-ei. un is short for uen: chūn = chu-en.',
  },
  {
    title: 'Tone-mark placement',
    body: 'Place the tone mark on a > o > e > the last letter when only i and u appear together (liú, guì). For "iu" the mark goes on u; for "ui" it goes on i.',
  },
  {
    title: 'Third-tone sandhi',
    body: 'When two third-tone syllables come together, the first becomes a second tone in speech: nǐ hǎo → ní hǎo. The written form keeps the original ǎ.',
  },
  {
    title: '"Empty" rime after z c s zh ch sh r',
    body: 'When you see "zi · ci · si · zhi · chi · shi · ri", the "i" is a buzzing continuation of the consonant, NOT a true "ee" sound.',
  },
]

// Curated set of valid pinyin syllables (Hanyu Pinyin standard).
// This list is used by the syllable explorer / matrix below to mark
// valid initial × final combinations.  Source: standard pinyin chart.
const VALID_SYLLABLES = new Set([
  // null-initial (rewritten with y / w)
  'a','o','e','ai','ei','ao','ou','an','en','ang','eng','er',
  'yi','ya','ye','yao','you','yan','yin','yang','ying','yong',
  'wu','wa','wo','wai','wei','wan','wen','wang','weng',
  'yu','yue','yuan','yun',

  // b
  'ba','bo','bai','bei','bao','ban','ben','bang','beng',
  'bi','bie','biao','bian','bin','bing','bu',
  // p
  'pa','po','pai','pei','pao','pou','pan','pen','pang','peng',
  'pi','pie','piao','pian','pin','ping','pu',
  // m
  'ma','mo','me','mai','mei','mao','mou','man','men','mang','meng',
  'mi','mie','miao','miu','mian','min','ming','mu',
  // f
  'fa','fo','fei','fou','fan','fen','fang','feng','fu',

  // d
  'da','de','dai','dei','dao','dou','dan','den','dang','deng','dong',
  'di','die','diao','diu','dian','ding','du','duo','dui','duan','dun',
  // t
  'ta','te','tai','tao','tou','tan','tang','teng','tong',
  'ti','tie','tiao','tian','ting','tu','tuo','tui','tuan','tun',
  // n
  'na','ne','nai','nei','nao','nou','nan','nen','nang','neng','nong',
  'ni','nie','niao','niu','nian','nin','niang','ning','nu','nuo','nuan',
  'nü','nüe',
  // l
  'la','le','lai','lei','lao','lou','lan','lang','leng','long',
  'li','lia','lie','liao','liu','lian','lin','liang','ling',
  'lu','luo','luan','lun',
  'lü','lüe',

  // g
  'ga','ge','gai','gei','gao','gou','gan','gen','gang','geng','gong',
  'gu','gua','guo','guai','gui','guan','gun','guang',
  // k
  'ka','ke','kai','kei','kao','kou','kan','ken','kang','keng','kong',
  'ku','kua','kuo','kuai','kui','kuan','kun','kuang',
  // h
  'ha','he','hai','hei','hao','hou','han','hen','hang','heng','hong',
  'hu','hua','huo','huai','hui','huan','hun','huang',

  // j (always + i / ü, written u)
  'ji','jia','jie','jiao','jiu','jian','jin','jiang','jing','jiong',
  'ju','jue','juan','jun',
  // q
  'qi','qia','qie','qiao','qiu','qian','qin','qiang','qing','qiong',
  'qu','que','quan','qun',
  // x
  'xi','xia','xie','xiao','xiu','xian','xin','xiang','xing','xiong',
  'xu','xue','xuan','xun',

  // zh
  'zha','zhe','zhi','zhai','zhei','zhao','zhou','zhan','zhen','zhang','zheng','zhong',
  'zhu','zhua','zhuo','zhuai','zhui','zhuan','zhun','zhuang',
  // ch
  'cha','che','chi','chai','chao','chou','chan','chen','chang','cheng','chong',
  'chu','chua','chuo','chuai','chui','chuan','chun','chuang',
  // sh
  'sha','she','shi','shai','shei','shao','shou','shan','shen','shang','sheng',
  'shu','shua','shuo','shuai','shui','shuan','shun','shuang',
  // r
  're','ri','rao','rou','ran','ren','rang','reng','rong',
  'ru','rua','ruo','rui','ruan','run',

  // z
  'za','ze','zi','zai','zei','zao','zou','zan','zen','zang','zeng','zong',
  'zu','zuo','zui','zuan','zun',
  // c
  'ca','ce','ci','cai','cao','cou','can','cen','cang','ceng','cong',
  'cu','cuo','cui','cuan','cun',
  // s
  'sa','se','si','sai','sao','sou','san','sen','sang','seng','song',
  'su','suo','sui','suan','sun',
])

// Returns the syllable form for a given initial + final, applying the
// standard Hanyu Pinyin spelling rules (or null if the combination is
// not a real Mandarin syllable).
export function pinyinSyllable(initial, final) {
  if (!final) return null
  let syl = ''
  if (!initial) {
    // null-initial: rewrite with y / w as needed
    const map = {
      'i':'yi','u':'wu','ü':'yu',
      'ia':'ya','ie':'ye','iao':'yao','iu':'you','ian':'yan','in':'yin','iang':'yang','ing':'ying','iong':'yong',
      'ua':'wa','uo':'wo','uai':'wai','ui':'wei','uan':'wan','un':'wen','uang':'wang','ueng':'weng',
      'üe':'yue','üan':'yuan','ün':'yun',
    }
    syl = map[final] ?? final
  } else if ('jqxy'.includes(initial)) {
    // ü → u after j q x (and y)
    const noUmlaut = final.replaceAll('ü', 'u')
    syl = initial + noUmlaut
  } else {
    syl = initial + final
  }
  return VALID_SYLLABLES.has(syl) ? syl : null
}

// Convenience: list of base initials including null
export const INITIAL_KEYS = ['', 'b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s']

// Convenience: list of final keys in display order
export const FINAL_KEYS = [
  'a','o','e','i','u','ü',
  'ai','ei','ao','ou',
  'an','en','ang','eng','ong','er',
  'ia','ie','iao','iu','ian','in','iang','ing','iong',
  'ua','uo','uai','ui','uan','un','uang','ueng',
  'üe','üan','ün',
]

// Apply tone-mark to a syllable. Tone numbers 1..4 (5/0 = neutral).
const TONE_MARKS = {
  a: ['a','ā','á','ǎ','à'],
  e: ['e','ē','é','ě','è'],
  i: ['i','ī','í','ǐ','ì'],
  o: ['o','ō','ó','ǒ','ò'],
  u: ['u','ū','ú','ǔ','ù'],
  ü: ['ü','ǖ','ǘ','ǚ','ǜ'],
}
function pickToneVowel(syl) {
  // Priority a > o > e ; else last of i/u (with iu / ui exception)
  if (syl.includes('a')) return 'a'
  if (syl.includes('o')) return 'o'
  if (syl.includes('e')) return 'e'
  if (syl.endsWith('iu')) return 'u'
  if (syl.endsWith('ui')) return 'i'
  // last vowel
  const m = syl.match(/[iuü]/g)
  return m ? m[m.length - 1] : null
}
export function applyTone(syl, tone) {
  if (!syl || !tone || tone < 1 || tone > 4) return syl
  const v = pickToneVowel(syl)
  if (!v) return syl
  const replaced = TONE_MARKS[v][tone]
  // Replace only the *last* occurrence to handle "guo" → "guǒ" etc.
  const idx = syl.lastIndexOf(v)
  return syl.slice(0, idx) + replaced + syl.slice(idx + 1)
}

export const usePinyin = () => ({
  PINYIN_TONES, PINYIN_INITIALS, PINYIN_FINALS, PINYIN_RULES,
  INITIAL_KEYS, FINAL_KEYS,
  pinyinSyllable, applyTone,
})
