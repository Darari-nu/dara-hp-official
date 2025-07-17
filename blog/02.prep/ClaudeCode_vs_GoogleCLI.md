# Claude Code と Google Gemini CLI の比較

## 1. 概要
| 項目 | Claude Code | Google CLI |
|------|-------------|------------|
| 提供元 | Anthropic | Google |
| 位置付け | エージェンティックなコーディング補助 CLI / VS Code 拡張 | オープンソース AI エージェント（Gemini CLI） |
| モデル | Claude 4 系（Opus／Sonnet／Haiku） | Gemini 1.5 Pro／Advanced |
| ライセンス | CLI 部は MIT、推論は API 従量課金 | Apache-2.0 |

## 2. 主な機能比較
| 項目 | Claude Code | Google CLI |
|------|-------------|------------|
| インストール | `pip install claude-code` / VS Code Marketplace | `brew install gemini-cli` または GitHub リリース |
| コンテキスト長 | 200k〜1M トークン（モデル依存） | 1M トークン（Gemini 1.5） |
| 補助ツール | bash / code-exec / computer-use など 10+ ツール標準 | shell / code edit / web / git などプラグイン方式 |
| 対話モード | Chat, インライン編集, ファイル生成, エージェントループ | Chat, コード生成, 自動修正, アクションチェーン |
| IDE 連携 | VS Code, JetBrains (公式拡張) | IDE 連携はコミュニティ拡張 |
| 料金 | Opus 入力 $0.015/1k, 出力 $0.075/1k など | Gemini Pro 無料枠＋Advanced 月額 $20 |
| OSS 度合い | CLI は OSS、モデルはクローズド | 全体 OSS、API はクローズド |

## 3. 強み・弱み
### Claude Code
**強み**
- AI Flow による洗練されたツール使用フロー。
- Claude 4 Opus の高い推論品質。
- VS Code でのペアプロ体験が充実。

**弱み**
- API 料金が高め。
- 完全 OSS ではなく拡張に制約。

### Google CLI
**強み**
- Apache-2.0 OSS で拡張容易。
- 大きな無料枠で低コスト。
- Gemini 1.5 の 1M コンテキスト。

**弱み**
- IDE 連携はまだ発展途上。
- 特定タスクで Claude Opus に劣るケース。

## 4. 使い分けの目安
1. 品質・企業向けセキュリティ重視 → **Claude Code**
2. コストと OSS 拡張性重視 → **Google CLI**
3. 長大ドキュメント処理を無料で試す → **Google CLI**
4. IDE 統合型エージェント開発 → **Claude Code**

## 5. 参考リンク
- Claude Code Overview: <https://docs.anthropic.com/en/docs/claude-code/overview>
- Claude Code CLI Reference: <https://docs.anthropic.com/en/docs/claude-code/cli-reference>
- Gemini CLI GitHub: <https://github.com/google-gemini/gemini-cli>
- Google Blog: "Introducing Gemini CLI": <https://blog.google/technology/developers/introducing-gemini-cli-open-source-ai-agent/>

*作成: 2025-06-29*
