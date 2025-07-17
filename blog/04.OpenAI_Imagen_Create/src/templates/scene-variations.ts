import { SceneVariation } from '../lib/prompt-enhancer';

export const createDefaultSceneVariations = (): Map<string, SceneVariation[]> => {
  const variations = new Map<string, SceneVariation[]>();

  // AI関連のテーマ
  variations.set('ai', [
    {
      background: 'モダンなオープンオフィス、大きな窓から自然光',
      sceneDescription: 'について冷静にデータ分析を行っている日常的な風景',
      layout: 'ボス猫が中央デスク、インターン猫が左側のPC、ロボ助手が右側でグラフ表示',
      props: 'ノートパソコン, データ資料, 統計グラフ, ホワイトボード, 観葉植物',
      poses: [
        'データ画面を指差しながら分析指示を出す',
        'ノートパソコンでデータ入力に集中',
        'グラフを整理しながら統計を説明'
      ]
    },
    {
      background: 'アットホームなカフェオフィス、コーヒーの香りが漂う',
      sceneDescription: 'についてリラックスした雰囲気で創造的に議論している風景',
      layout: 'ボス猫がカフェテーブル、インターン猫がソファ、ロボ助手がバリスタカウンター',
      props: 'ラテアート, 手描きスケッチ, ノートPC, 観葉植物, 暖炉',
      poses: [
        'ラテを飲みながらリラックスして説明',
        'ソファで膝にPCを置いて集中',
        'コーヒーを淹れながら会話に参加'
      ]
    },
    {
      background: '和風モダンな畳オフィス、障子から柔らかい光',
      sceneDescription: 'を日本的な落ち着きの中で丁寧に検討している伝統的な場面',
      layout: 'ボス猫が上座、インターン猫が下座で正座、ロボ助手が茶道具準備',
      props: '和紙の資料, 筆ペン, 抹茶とお菓子, 風呂敷包み, 桜の生け花',
      poses: [
        '扇子を持ちながら優雅に提案',
        '正座で緊張しながら真剣に聞く',
        '茶道の動作でお茶を淹れている'
      ]
    },
    {
      background: 'クリエイティブなワーキングスペース、カラフルな家具と壁画',
      sceneDescription: 'についてブレインストーミングする創造的で活気ある場面',
      layout: 'ボス猫がソファ、インターン猫が床のクッション、ロボ助手が立って壁のホワイトボード',
      props: 'カラフルな付箋, マーカー, スケッチブック, インスピレーション写真, アート作品',
      poses: [
        'ソファでリラックスしながらアイデア出し',
        '床に座ってスケッチを描く',
        'ホワイトボードに図解を描く'
      ]
    },
    {
      background: '静かな図書館風オフィス、本棚に囲まれた落ち着いた空間',
      sceneDescription: 'について研究調査する学術的で知的な雰囲気',
      layout: 'ボス猫が読書デスク、インターン猫が資料整理、ロボ助手が書籍検索',
      props: '専門書籍, 調査レポート, 比較表, 虫眼鏡, 読書灯',
      poses: [
        '眼鏡をかけて資料を熟読している',
        '本棚で参考資料を探している',
        '書籍を分類整理している'
      ]
    },
    {
      background: 'スタートアップ風のガレージオフィス、雑然としているが活気に満ちた',
      sceneDescription: 'について革新的なソリューションを熱心に開発している起業家精神溢れる風景',
      layout: 'ボス猫が立ちデスク、インターン猫が床の段ボール箱デスク、ロボ助手がDIY作業台',
      props: 'ピザ箱, エナジードリンク, 付箋だらけのモニター, DIY機材, バイク',
      poses: [
        '立ちながら情熱的に指揮を取る',
        '段ボール箱でも集中して作業',
        'DIY機材で何かを組み立てている'
      ]
    },
    {
      background: 'サイバーパンク風の未来オフィス、ホログラム画面が浮遊',
      sceneDescription: 'について未来的なデータ分析を行っている最先端の風景',
      layout: 'ボス猫が巨大モニター前、インターン猫がタブレット群に囲まれ、ロボ助手が空中に3Dグラフを投影',
      props: 'ホログラム画面, 光るAIチップ, 未来的キーボード, 透明タブレット, 浮遊する数式',
      poses: [
        '空中のデータを操作しながら分析指示を出す',
        '複数のタブレットを同時操作してデータ入力',
        '3Dホログラムを生成しながら統計を表示'
      ]
    },
    {
      background: 'レトロフューチャー風のコンピューター室、古いCRTモニターとネオンライト',
      sceneDescription: 'の歴史を振り返りながら温故知新のアプローチで学習している風景',
      layout: 'ボス猫がレトロPC前、インターン猫が古い書籍を読み、ロボ助手がアナログ機器を操作',
      props: 'CRTモニター, フロッピーディスク, 古いAI書籍, アナログ計算機, ネオンライト',
      poses: [
        'レトロキーボードを叩きながら懐かしむ',
        '古いAI本を読みながら目を輝かせる',
        'アナログ機器とデジタル機器を接続中'
      ]
    }
  ]);

  // 新しい分散型マッピング
  variations.set('開発者', variations.get('default')!);
  variations.set('比較', variations.get('default')!);
  variations.set('ツール', variations.get('default')!);
  variations.set('人工知能', variations.get('ai')!);
  variations.set('最新', variations.get('default')!);
  variations.set('情報', variations.get('default')!);

  // 会議関連
  variations.set('会議', [
    {
      background: '近未来のガラス張り会議室、都市の夜景が見える',
      sceneDescription: 'で重要な決定を下そうとする緊迫した雰囲気',
      layout: 'ボス猫が会議テーブル端、インターン猫が議事録PC前、ロボ助手が壁面スクリーン操作',
      props: 'くしゃくしゃの企画書, 全色付箋, 空のコーヒーカップ, 緊急資料の山',
      poses: [
        '拳を机に叩きつけながら熱弁',
        '必死にタイピングしながら汗をかく',
        'グラフを指差しながら冷静に分析'
      ]
    },
    {
      background: '和風の畳会議室、障子から柔らかい光',
      sceneDescription: 'を日本的なおもてなしの心で進める穏やかな場面',
      layout: 'ボス猫が上座、インターン猫が下座で正座、ロボ助手が茶道具を準備',
      props: '和紙の資料, 筆ペン, 抹茶とお菓子, 風呂敷包み, 桜の生け花',
      poses: [
        '扇子を持ちながら優雅に提案',
        '正座で緊張しながら真剣に聞く',
        '茶道の動作でお茶を淹れている'
      ]
    }
  ]);

  variations.set('meeting', variations.get('会議')!);

  // プレゼンテーション関連
  variations.set('プレゼン', [
    {
      background: 'TEDトーク風の大講堂、スポットライト照明',
      sceneDescription: 'で大勢の前で革新的なアイデアを発表する感動的な瞬間',
      layout: 'ボス猫がステージ中央、インターン猫が客席最前列、ロボ助手が音響ブース',
      props: 'ワイヤレスマイク, 巨大スクリーン, 拍手する観客席, スポットライト',
      poses: [
        '大きく腕を広げながら情熱的にスピーチ',
        '目を輝かせながら感動して拍手',
        'ライトと音響を完璧にコントロール'
      ]
    },
    {
      background: 'アットホームなカフェ、コーヒーの香りが漂う',
      sceneDescription: 'をカジュアルに仲間と共有するリラックスした雰囲気',
      layout: 'ボス猫がカフェテーブル、インターン猫がソファ、ロボ助手がバリスタカウンター',
      props: 'ラテアート, 手描きスケッチ, ノートPC, 観葉植物, 暖炉',
      poses: [
        'ラテを飲みながらリラックスして説明',
        'ソファで膝にPCを置いて集中',
        'コーヒーを淹れながら会話に参加'
      ]
    }
  ]);

  variations.set('presentation', variations.get('プレゼン')!);

  // 研修関連
  variations.set('研修', [
    {
      background: '自然光溢れるモダンな研修施設、緑が見える',
      sceneDescription: 'で新しいスキルを学ぶ前向きな成長の場面',
      layout: 'ボス猫が講師台、インターン猫が実習机、ロボ助手が機材セットアップ',
      props: 'ホワイトボード, 実習用具, 成長グラフ, 励ましのメッセージ',
      poses: [
        '優しく手を差し伸べながら指導',
        '真剣に実習に取り組む',
        '機材を準備しながらサポート'
      ]
    },
    {
      background: '秘密基地風の地下研修室、ハイテク機器が並ぶ',
      sceneDescription: 'で特別なスキルを秘密裏に習得する特訓風景',
      layout: 'ボス猫が指揮台、インターン猫が訓練装置前、ロボ助手が監視パネル',
      props: '訓練用シミュレーター, 秘密マニュアル, ハイテク機器, 非常灯',
      poses: [
        '厳しく指導しながらも温かく見守る',
        '集中して困難な課題に挑戦',
        'データを監視しながら安全確保'
      ]
    }
  ]);

  variations.set('training', variations.get('研修')!);

  // デフォルトバリエーション
  variations.set('default', [
    {
      background: 'モダンなオープンオフィス、大きな窓から自然光',
      sceneDescription: 'について日常的な業務を行う平和な風景',
      layout: 'ボス猫が中央デスク、インターン猫が左側PC、ロボ助手が右側プリンター',
      props: 'デスク用品, 書類ファイル, コンピューター, 観葉植物',
      poses: [
        '仕事の指示を出している',
        '集中して作業している',
        '効率的にサポートしている'
      ]
    },
    {
      background: 'クリエイティブなワーキングスペース、カラフルな家具',
      sceneDescription: 'についてブレインストーミングする創造的な場面',
      layout: 'ボス猫がソファ、インターン猫が床のクッション、ロボ助手が立って壁のホワイトボード',
      props: 'カラフルな付箋, マーカー, スケッチブック, インスピレーション写真',
      poses: [
        'ソファでリラックスしながらアイデア出し',
        '床に座ってスケッチを描く',
        'ホワイトボードに図解を描く'
      ]
    },
    {
      background: '静かな図書館風オフィス、本棚に囲まれた空間',
      sceneDescription: 'について静かに研究調査する学術的な雰囲気',
      layout: 'ボス猫が読書デスク、インターン猫が本棚前、ロボ助手が資料整理',
      props: '専門書, 調査ノート, 虫眼鏡, アンティーク地球儀, 読書灯',
      poses: [
        '眼鏡をかけて資料を熟読',
        '本棚で必要な資料を探す',
        '資料を分類整理している'
      ]
    }
  ]);

  return variations;
};

// 新しいバリエーションを簡単に追加できるヘルパー関数
export const addCustomVariation = (
  variations: Map<string, SceneVariation[]>,
  theme: string,
  variation: SceneVariation
): void => {
  if (!variations.has(theme)) {
    variations.set(theme, []);
  }
  variations.get(theme)!.push(variation);
};

// テーマ別のバリエーション数を取得
export const getVariationCount = (
  variations: Map<string, SceneVariation[]>
): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const [theme, variationArray] of variations) {
    counts.set(theme, variationArray.length);
  }
  return counts;
};

// すべてのテーマを取得
export const getAllThemes = (
  variations: Map<string, SceneVariation[]>
): string[] => {
  return Array.from(variations.keys()).sort();
};