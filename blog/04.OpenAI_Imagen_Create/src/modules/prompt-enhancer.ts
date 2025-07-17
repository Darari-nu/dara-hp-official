import fs from 'fs-extra';
import path from 'path';

interface YAMLTemplate {
  固定設定: {
    比率: string;
    質感: string;
    ライティング: string;
  };
  可変ブロック: {
    背景: string;
    シーン概要: string;
    レイアウト: string;
    キャラクター: Array<{
      名前: string;
      役割: string;
      外見: string;
      ポーズ: string;
      小道具: string;
    }>;
    小物: string;
  };
  画面効果: string[];
  禁止: string[];
}

export class PromptEnhancer {
  private guideFile: string;
  private promptGuide: string = '';
  private yamlTemplate: YAMLTemplate | null = null;

  constructor(guideFile: string = './prompt_guide.md') {
    this.guideFile = guideFile;
  }

  async loadPromptGuide(): Promise<void> {
    try {
      if (await fs.pathExists(this.guideFile)) {
        this.promptGuide = await fs.readFile(this.guideFile, 'utf-8');
        this.yamlTemplate = this.parseYAMLTemplate(this.promptGuide);
      } else {
        console.warn(`Prompt guide file not found: ${this.guideFile}`);
        this.promptGuide = this.getDefaultPromptGuide();
        this.yamlTemplate = null;
      }
    } catch (error) {
      console.warn('Failed to load prompt guide:', error);
      this.promptGuide = this.getDefaultPromptGuide();
      this.yamlTemplate = null;
    }
  }

  private getDefaultPromptGuide(): string {
    return `
# Default SDXL Prompt Enhancement Rules

## Quality Enhancement
- Add "high quality, masterpiece, detailed" for better results
- Include "8k resolution, professional photography" for photorealistic images
- Add "digital art, concept art" for artistic styles

## Lighting and Composition
- Specify lighting: "golden hour lighting", "soft diffused lighting", "dramatic lighting"
- Add composition terms: "rule of thirds", "cinematic composition", "wide angle"

## Style Modifiers
- For landscapes: "breathtaking, scenic, natural lighting"
- For portraits: "professional headshot, studio lighting, sharp focus"
- For abstract: "vibrant colors, geometric patterns, modern art style"

## Technical Terms
- Resolution: "4K, 8K, ultra high resolution"
- Camera: "DSLR, professional camera, macro lens"
- Rendering: "octane render, unreal engine, ray tracing"
`;
  }

  async enhancePrompt(simplePrompt: string): Promise<string> {
    if (!this.promptGuide) {
      await this.loadPromptGuide();
    }

    if (this.yamlTemplate) {
      return this.generateFromYAMLTemplate(simplePrompt);
    } else {
      const enhancedPrompt = this.applyEnhancementRules(simplePrompt);
      return enhancedPrompt;
    }
  }

  private applyEnhancementRules(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    let enhanced = prompt;

    const qualityTerms = [
      'high quality', 'masterpiece', 'detailed', 'sharp focus',
      'professional', '8k resolution', 'ultra high resolution'
    ];

    const hasQualityTerms = qualityTerms.some(term => 
      lowerPrompt.includes(term.toLowerCase())
    );

    if (!hasQualityTerms) {
      enhanced += ', high quality, masterpiece, detailed, sharp focus';
    }

    if (lowerPrompt.includes('風景') || lowerPrompt.includes('landscape') || 
        lowerPrompt.includes('scenery') || lowerPrompt.includes('自然')) {
      enhanced += ', breathtaking landscape, natural lighting, scenic view, wide angle';
    }

    if (lowerPrompt.includes('人物') || lowerPrompt.includes('portrait') || 
        lowerPrompt.includes('人') || lowerPrompt.includes('person')) {
      enhanced += ', professional portrait, studio lighting, depth of field';
    }

    if (lowerPrompt.includes('夕焼け') || lowerPrompt.includes('sunset') || 
        lowerPrompt.includes('朝日') || lowerPrompt.includes('sunrise')) {
      enhanced += ', golden hour lighting, warm colors, dramatic sky';
    }

    if (lowerPrompt.includes('アート') || lowerPrompt.includes('art') || 
        lowerPrompt.includes('絵') || lowerPrompt.includes('drawing')) {
      enhanced += ', digital art, concept art, artistic composition';
    }

    if (lowerPrompt.includes('動物') || lowerPrompt.includes('animal') || 
        lowerPrompt.includes('猫') || lowerPrompt.includes('犬')) {
      enhanced += ', wildlife photography, natural habitat, detailed fur texture';
    }

    if (lowerPrompt.includes('建物') || lowerPrompt.includes('building') || 
        lowerPrompt.includes('architecture') || lowerPrompt.includes('建築')) {
      enhanced += ', architectural photography, geometric composition, urban landscape';
    }

    enhanced += ', photorealistic, cinematic lighting, professional photography';

    return enhanced.trim();
  }

  private parseYAMLTemplate(content: string): YAMLTemplate | null {
    try {
      // 固定設定の抽出
      const fixedSettings = {
        比率: this.extractValue(content, '比率:'),
        質感: this.extractValue(content, '質感:'),
        ライティング: this.extractValue(content, 'ライティング:')
      };

      // キャラクター設定の抽出
      const characters = [
        {
          名前: 'ボス猫',
          役割: 'リーダー',
          外見: '三毛柄の擬人化猫',
          ポーズ: '<AI_BOSS_POSE>',
          小道具: '黒スーツ, 丸サングラス'
        },
        {
          名前: 'インターン猫',
          役割: '新人',
          外見: 'ブカブカスーツの子猫フィギュア',
          ポーズ: '<AI_INTERN_POSE>',
          小道具: 'メモ帳'
        },
        {
          名前: 'ロボ助手',
          役割: 'サポート',
          外見: 'ミント色ボディの小型ロボフィギュア',
          ポーズ: '<AI_ROBO_POSE>',
          小道具: 'LEDほっぺ, クリップボード「Task List」'
        }
      ];

      // 画面効果の抽出
      const effects = ['ティルトシフト写真風', '浅い被写界深度', 'マジカルリアリズム'];
      
      // 禁止事項の抽出
      const forbidden = ['blur', 'watermark', '余計な人間キャラ'];

      return {
        固定設定: fixedSettings,
        可変ブロック: {
          背景: '<AI_BACKGROUND>',
          シーン概要: '<AI_SCENE_DESCRIPTION>',
          レイアウト: '<AI_LAYOUT_COMPOSITION>',
          キャラクター: characters,
          小物: '<AI_DYNAMIC_PROPS>'
        },
        画面効果: effects,
        禁止: forbidden
      };
    } catch (error) {
      console.warn('Failed to parse YAML template:', error);
      return null;
    }
  }

  private extractValue(content: string, key: string): string {
    const regex = new RegExp(`${key}\s*["']?([^"'\n]+)["']?`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  private generateFromYAMLTemplate(theme: string): string {
    if (!this.yamlTemplate) return theme;

    const filledTemplate = this.fillAIBlocks(theme);
    return this.flattenYAMLToPrompt(filledTemplate);
  }

  private fillAIBlocks(theme: string): YAMLTemplate {
    if (!this.yamlTemplate) throw new Error('YAML template not loaded');

    const filled = JSON.parse(JSON.stringify(this.yamlTemplate));
    const themeContext = this.analyzeTheme(theme);

    // AI可変ブロックを埋める
    filled.可変ブロック.背景 = themeContext.background;
    filled.可変ブロック.シーン概要 = themeContext.sceneDescription;
    filled.可変ブロック.レイアウト = themeContext.layout;
    filled.可変ブロック.小物 = themeContext.props;

    // キャラクターのポーズを埋める
    filled.可変ブロック.キャラクター.forEach((char: any, index: number) => {
      char.ポーズ = themeContext.poses[index] || '自然な立ちポーズ';
    });

    return filled;
  }

  private analyzeTheme(theme: string): {
    background: string;
    sceneDescription: string;
    layout: string;
    props: string;
    poses: string[];
  } {
    const lowerTheme = theme.toLowerCase();
    
    // AI関連のテーマ
    if (lowerTheme.includes('ai') || lowerTheme.includes('人工知能') || lowerTheme.includes('最新') || lowerTheme.includes('情報')) {
      const aiScenes = [
        {
          background: 'サイバーパンク風の未来オフィス、ホログラム画面が浮遊',
          sceneDescription: `${theme}について未来的なデータ分析を行っている最先端の風景`,
          layout: 'ボス猫が巨大モニター前、インターン猫がタブレット群に囲まれ、ロボ助手が空中に3Dグラフを投影',
          props: 'ホログラム画面, 光るAIチップ, 未来的キーボード, 透明タブレット, 浮遊する数式',
          poses: [
            '空中のデータを操作しながら分析指示を出す',
            '複数のタブレットを同時操作してデータ入力',
            '3Dホログラムを生成しながら統計を表示'
          ]
        },
        {
          background: 'レトロフューチャー風のコンピューター室、古いCRTモニターとネオン',
          sceneDescription: `${theme}の歴史を振り返りながら温故知新のアプローチ`,
          layout: 'ボス猫がレトロPC前、インターン猫が古い書籍を読み、ロボ助手がアナログ機器を操作',
          props: 'CRTモニター, フロッピーディスク, 古いAI書籍, アナログ計算機, ネオンライト',
          poses: [
            'レトロキーボードを叩きながら懐かしむ',
            '古いAI本を読みながら目を輝かせる',
            'アナログ機器とデジタル機器を接続中'
          ]
        }
      ];
      return aiScenes[Math.floor(Math.random() * aiScenes.length)];
    }
    
    // 会議関連
    if (lowerTheme.includes('会議') || lowerTheme.includes('meeting')) {
      const meetingScenes = [
        {
          background: '近未来のガラス張り会議室、都市の夜景が見える',
          sceneDescription: `${theme}で重要な決定を下そうとする緊迫した雰囲気`,
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
          sceneDescription: `${theme}を日本的なおもてなしの心で進める穏やかな場面`,
          layout: 'ボス猫が上座、インターン猫が下座で正座、ロボ助手が茶道具を準備',
          props: '和紙の資料, 筆ペン, 抹茶とお菓子, 風呂敷包み, 桜の生け花',
          poses: [
            '扇子を持ちながら優雅に提案',
            '正座で緊張しながら真剣に聞く',
            '茶道の動作でお茶を淹れている'
          ]
        }
      ];
      return meetingScenes[Math.floor(Math.random() * meetingScenes.length)];
    }
    
    // プレゼン関連
    if (lowerTheme.includes('プレゼン') || lowerTheme.includes('presentation')) {
      const presentationScenes = [
        {
          background: 'TEDトーク風の大講堂、スポットライト照明',
          sceneDescription: `${theme}で大勢の前で革新的なアイデアを発表する感動的な瞬間`,
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
          sceneDescription: `${theme}をカジュアルに仲間と共有するリラックスした雰囲気`,
          layout: 'ボス猫がカフェテーブル、インターン猫がソファ、ロボ助手がバリスタカウンター',
          props: 'ラテアート, 手描きスケッチ, ノートPC, 観葉植物, 暖炉',
          poses: [
            'ラテを飲みながらリラックスして説明',
            'ソファで膝にPCを置いて集中',
            'コーヒーを淹れながら会話に参加'
          ]
        }
      ];
      return presentationScenes[Math.floor(Math.random() * presentationScenes.length)];
    }
    
    // 研修関連
    if (lowerTheme.includes('研修') || lowerTheme.includes('training')) {
      const trainingScenes = [
        {
          background: '自然光溢れるモダンな研修施設、緑が見える',
          sceneDescription: `${theme}で新しいスキルを学ぶ前向きな成長の場面`,
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
          sceneDescription: `${theme}で特別なスキルを秘密裏に習得する特訓風景`,
          layout: 'ボス猫が指揮台、インターン猫が訓練装置前、ロボ助手が監視パネル',
          props: '訓練用シミュレーター, 秘密マニュアル, ハイテク機器, 非常灯',
          poses: [
            '厳しく指導しながらも温かく見守る',
            '集中して困難な課題に挑戦',
            'データを監視しながら安全確保'
          ]
        }
      ];
      return trainingScenes[Math.floor(Math.random() * trainingScenes.length)];
    }
    
    // デフォルトのオフィスシーン（複数バリエーション）
    const defaultScenes = [
      {
        background: 'モダンなオープンオフィス、大きな窓から自然光',
        sceneDescription: `${theme}について日常的な業務を行う平和な風景`,
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
        sceneDescription: `${theme}についてブレインストーミングする創造的な場面`,
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
        sceneDescription: `${theme}について静かに研究調査する学術的な雰囲気`,
        layout: 'ボス猫が読書デスク、インターン猫が本棚前、ロボ助手が資料整理',
        props: '専門書, 調査ノート, 虫眼鏡, アンティーク地球儀, 読書灯',
        poses: [
          '眼鏡をかけて資料を熟読',
          '本棚で必要な資料を探す',
          '資料を分類整理している'
        ]
      }
    ];
    
    return defaultScenes[Math.floor(Math.random() * defaultScenes.length)];
  }

  private flattenYAMLToPrompt(template: YAMLTemplate): string {
    const parts: string[] = [];
    
    // 重要度順に連結
    const order = ['背景', 'シーン概要', 'レイアウト', 'キャラクター', '小物', '質感', 'ライティング', '画面効果'];
    
    // 背景
    parts.push(template.可変ブロック.背景);
    
    // シーン概要
    parts.push(template.可変ブロック.シーン概要);
    
    // レイアウト
    parts.push(template.可変ブロック.レイアウト);
    
    // キャラクター
    const characterDescs = template.可変ブロック.キャラクター.map(char => 
      `${char.外見}が${char.ポーズ}、${char.小道具}を身に着けている`
    );
    parts.push(characterDescs.join('、'));
    
    // 小物
    parts.push(template.可変ブロック.小物);
    
    // 固定設定
    parts.push(template.固定設定.質感);
    parts.push(template.固定設定.ライティング);
    
    // 画面効果
    parts.push(template.画面効果.join('、'));
    
    // ネガティブプロンプト
    const negatives = template.禁止.join(', ');
    if (negatives) {
      parts.push(`--no ${negatives}`);
    }
    
    return parts.filter(part => part.trim()).join(' ');
  }

  async analyzePrompt(prompt: string): Promise<{
    categories: string[];
    suggestedEnhancements: string[];
    estimatedQuality: 'low' | 'medium' | 'high';
  }> {
    const categories: string[] = [];
    const suggestedEnhancements: string[] = [];
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('風景') || lowerPrompt.includes('landscape')) {
      categories.push('landscape');
      suggestedEnhancements.push('Add lighting conditions (golden hour, dramatic sky)');
    }

    if (lowerPrompt.includes('人物') || lowerPrompt.includes('portrait')) {
      categories.push('portrait');
      suggestedEnhancements.push('Add lighting setup (studio, natural light)');
    }

    if (lowerPrompt.includes('アート') || lowerPrompt.includes('art')) {
      categories.push('artistic');
      suggestedEnhancements.push('Specify art style (digital art, concept art)');
    }

    const qualityIndicators = [
      'high quality', 'masterpiece', 'detailed', 'professional',
      '8k', '4k', 'ultra high resolution'
    ];

    const hasQuality = qualityIndicators.some(indicator => 
      lowerPrompt.includes(indicator)
    );

    const estimatedQuality: 'low' | 'medium' | 'high' = 
      hasQuality ? 'high' : (prompt.length > 10 ? 'medium' : 'low');

    if (!hasQuality) {
      suggestedEnhancements.push('Add quality modifiers (high quality, masterpiece)');
    }

    return {
      categories,
      suggestedEnhancements,
      estimatedQuality
    };
  }
}