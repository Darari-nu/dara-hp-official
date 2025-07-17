import fs from 'fs-extra';

export interface PromptTemplate {
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

export interface SceneVariation {
  background: string;
  sceneDescription: string;
  layout: string;
  props: string;
  poses: string[];
}

export interface PromptEnhancerConfig {
  templateFile: string;
  themeVariations: Map<string, SceneVariation[]>;
}

export class UniversalPromptEnhancer {
  private templateFile: string;
  private template: PromptTemplate | null = null;
  private themeVariations: Map<string, SceneVariation[]>;

  constructor(config: PromptEnhancerConfig) {
    this.templateFile = config.templateFile;
    this.themeVariations = config.themeVariations;
  }

  async loadTemplate(): Promise<void> {
    try {
      if (await fs.pathExists(this.templateFile)) {
        const content = await fs.readFile(this.templateFile, 'utf-8');
        this.template = this.parseTemplate(content);
      } else {
        throw new Error(`Template file not found: ${this.templateFile}`);
      }
    } catch (error) {
      throw new Error(`Failed to load template: ${error}`);
    }
  }

  private parseTemplate(content: string): PromptTemplate | null {
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
      console.warn('Failed to parse template:', error);
      return null;
    }
  }

  private extractValue(content: string, key: string): string {
    const regex = new RegExp(`${key}\\s*[\"']?([^\"'\\n]+)[\"']?`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
  }

  enhancePrompt(theme: string): string {
    if (!this.template) {
      throw new Error('Template not loaded. Call loadTemplate() first.');
    }

    const filledTemplate = this.fillTemplate(theme);
    return this.flattenToPrompt(filledTemplate);
  }

  private fillTemplate(theme: string): PromptTemplate {
    if (!this.template) throw new Error('Template not loaded');

    const filled = JSON.parse(JSON.stringify(this.template));
    const sceneData = this.getSceneVariation(theme);

    // 可変ブロックを埋める
    filled.可変ブロック.背景 = sceneData.background;
    filled.可変ブロック.シーン概要 = sceneData.sceneDescription;
    filled.可変ブロック.レイアウト = sceneData.layout;
    filled.可変ブロック.小物 = sceneData.props;

    // キャラクターのポーズを埋める
    filled.可変ブロック.キャラクター.forEach((char: any, index: number) => {
      char.ポーズ = sceneData.poses[index] || '自然な立ちポーズ';
    });

    return filled;
  }

  private getSceneVariation(theme: string): SceneVariation {
    const lowerTheme = theme.toLowerCase();
    
    // 動的テーマ分析を優先
    const dynamicVariation = this.generateDynamicVariation(theme);
    if (dynamicVariation) {
      return dynamicVariation;
    }
    
    // フォールバック：テーマに基づいてバリエーションを選択
    for (const [key, variations] of this.themeVariations) {
      if (lowerTheme.includes(key)) {
        return variations[Math.floor(Math.random() * variations.length)];
      }
    }

    // デフォルトバリエーション
    const defaultVariations = this.themeVariations.get('default') || [];
    if (defaultVariations.length > 0) {
      return defaultVariations[Math.floor(Math.random() * defaultVariations.length)];
    }

    // フォールバック
    return {
      background: 'モダンなオフィス空間',
      sceneDescription: `${theme}に関する一般的な業務風景`,
      layout: 'バランスの良い配置',
      props: '一般的なオフィス用品',
      poses: ['標準的なポーズ', '作業中のポーズ', 'サポートのポーズ']
    };
  }

  private generateDynamicVariation(theme: string): SceneVariation | null {
    const lowerTheme = theme.toLowerCase();
    
    // テーマ分析による動的シーン生成
    const backgroundMap: { [key: string]: string } = {
      '法規制': 'モダンな法律事務所、重厚な書棚と法律書',
      '規制': '政府庁舎風の会議室、格式高い雰囲気',
      'コンプライアンス': '企業の役員会議室、真剣な議論の場',
      '金融': '銀行の重役室、信頼性を重視した内装',
      '製造': '工場の管理事務所、効率性と安全性を重視',
      '医療': '病院の管理棟、清潔で専門的な環境',
      '教育': '大学の講義室、学術的で知的な雰囲気',
      '研究': '研究所のラボ、最新機器と専門書類',
      'セキュリティ': 'SOCセンター、多数のモニターと警戒システム',
      'データ': 'データセンター、サーバーラックと管理端末',
      '国際': '国際会議場、多国籍企業の雰囲気',
      '比較': '調査機関のオフィス、比較表とグラフが並ぶ',
      '分析': 'シンクタンクの分析室、統計資料と分析ツール',
      '戦略': '戦略企画室、ホワイトボードと企画資料',
      '導入': 'プロジェクトルーム、導入計画と進捗管理',
      '運用': '運用管理センター、監視画面と運用マニュアル'
    };
    
    const sceneMap: { [key: string]: string } = {
      '法規制': 'について慎重に法的検討を行っている専門的な風景',
      '規制': 'について規制要件を詳細に確認している厳格な場面',
      'コンプライアンス': 'について企業責任を真剣に議論している重要な会議',
      '金融': 'について金融リスクを慎重に評価している信頼性重視の場面',
      '製造': 'について製造現場の安全性を確保する実務的な検討',
      '医療': 'について患者安全を最優先に検討する責任重大な議論',
      '教育': 'について教育効果を学術的に分析している知的な場面',
      '研究': 'について科学的根拠に基づいて研究している専門的な風景',
      'セキュリティ': 'についてサイバーセキュリティを厳重に管理している警戒の場面',
      'データ': 'についてデータ保護を技術的に検討している専門的な作業',
      '国際': 'について国際標準との整合性を検討している国際的な協議',
      '比較': 'について複数の選択肢を客観的に比較分析している調査の場面',
      '分析': 'について詳細なデータ分析を行っている研究的な風景',
      '戦略': 'について長期戦略を練り上げている企画の場面',
      '導入': 'について段階的な導入計画を検討している実務的な会議',
      '運用': 'について継続的な運用体制を管理している現場の風景'
    };
    
    const propsMap: { [key: string]: string } = {
      '法規制': '法律書, 判例集, 契約書, 印鑑, 法的文書',
      '規制': '規制文書, ガイドライン, チェックリスト, 承認印, 監査資料',
      'コンプライアンス': '内部統制資料, リスク評価表, 監査報告書, 承認フロー図',
      '金融': '財務諸表, 信用評価表, リスク管理資料, 金融商品説明書',
      '製造': '安全マニュアル, 品質管理表, 生産計画, ISO認証書',
      '医療': '診療ガイドライン, 安全基準書, 医療機器仕様書, カルテ',
      '教育': '教材, 評価基準表, 学習計画, 教育効果測定資料',
      '研究': '研究論文, 実験データ, 分析ソフト, 専門機器',
      'セキュリティ': 'セキュリティポリシー, 脅威分析表, 監視画面, 警告システム',
      'データ': 'データベース画面, プライバシーポリシー, 暗号化ツール, バックアップ機器',
      '国際': '国際標準書, 各国規制資料, 翻訳文書, 国際会議資料',
      '比較': '比較表, 評価マトリックス, 調査レポート, 統計グラフ',
      '分析': '分析レポート, 統計ソフト, データグラフ, 計算機',
      '戦略': '戦略企画書, ロードマップ, 目標設定表, 企画資料',
      '導入': '導入計画書, スケジュール表, チェックリスト, 進捗管理表',
      '運用': '運用マニュアル, 監視ダッシュボード, 保守計画, 運用ログ'
    };
    
    // キーワードマッチング
    for (const keyword of Object.keys(backgroundMap)) {
      if (lowerTheme.includes(keyword)) {
        return {
          background: backgroundMap[keyword],
          sceneDescription: sceneMap[keyword],
          layout: 'ボス猫が中央の重要席、インターン猫が資料整理、ロボ助手が専門機器操作',
          props: propsMap[keyword],
          poses: [
            '重要な決定を下すために深く考え込んでいる',
            '資料を丁寧に整理しながら学習している',
            '専門的な機器を正確に操作している'
          ]
        };
      }
    }
    
    return null;
  }

  private flattenToPrompt(template: PromptTemplate): string {
    const parts: string[] = [];
    
    // 重要度順に連結
    parts.push(template.可変ブロック.背景);
    parts.push(template.可変ブロック.シーン概要);
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

  addThemeVariation(theme: string, variation: SceneVariation): void {
    if (!this.themeVariations.has(theme)) {
      this.themeVariations.set(theme, []);
    }
    this.themeVariations.get(theme)!.push(variation);
  }

  getThemeVariations(theme: string): SceneVariation[] {
    return this.themeVariations.get(theme) || [];
  }
}