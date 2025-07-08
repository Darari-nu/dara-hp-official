import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Map, Search } from "lucide-react";

export function EmpathyCarousel() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display mb-4">
            あなたの状況に合わせた
            <span className="google-gradient">サポート</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            それぞれの立場で直面する課題に、具体的な解決策を提供します
          </p>
        </div>

        <Tabs defaultValue="legal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-2 rounded-2xl">
            <TabsTrigger value="legal" className="rounded-xl py-4 text-base">
              法規制担当者
            </TabsTrigger>
            <TabsTrigger value="manager" className="rounded-xl py-4 text-base">
              AI推進担当者
            </TabsTrigger>
            <TabsTrigger value="explorer" className="rounded-xl py-4 text-base">
              AI活用検討者
            </TabsTrigger>
          </TabsList>

          <TabsContent value="legal" className="space-y-0">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Badge className="bg-blue-600 text-white px-4 py-2 rounded-full">
                    法規制担当者向け
                  </Badge>
                  <h3 className="text-3xl font-bold font-display text-gray-900">
                    改訂ラッシュで徹夜気味のあなたへ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">法規制更新に追われる毎日で、現場への浸透が追いつかない...</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700"><strong>解決策:</strong> 毎朝5分で読めるPDF + 現場向けチェックリストで効率化</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                    <Download className="w-4 h-4 mr-2" />
                    法規制まとめをダウンロード
                  </Button>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manager" className="space-y-0">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Badge className="bg-green-600 text-white px-4 py-2 rounded-full">
                    AI推進担当者向け
                  </Badge>
                  <h3 className="text-3xl font-bold font-display text-gray-900">
                    &ldquo;AIやれ&rdquo;指令で迷子のあなたへ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">ゴールも予算も曖昧な中、何から始めればいいかわからない...</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700"><strong>解決策:</strong> 導入ロードマップ + 同業他社の成功事例集</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                    <Map className="w-4 h-4 mr-2" />
                    ロードマップを見る
                  </Button>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">導入ロードマップ</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">1</div>
                          <span className="text-sm text-gray-700">現状分析</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm">2</div>
                          <span className="text-sm text-gray-700">ユースケース選定</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm">3</div>
                          <span className="text-sm text-gray-400">プロトタイプ構築</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="explorer" className="space-y-0">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <Badge className="bg-purple-600 text-white px-4 py-2 rounded-full">
                    AI活用検討者向け
                  </Badge>
                  <h3 className="text-3xl font-bold font-display text-gray-900">
                    まず何から？と悩むあなたへ
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">具体的なユースケースが浮かばず、手探り状態...</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700"><strong>解決策:</strong> 部署別ユースケース集 + Slack Bot検証サービス</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">
                    <Search className="w-4 h-4 mr-2" />
                    ユースケースを探す
                  </Button>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">部署別ユースケース</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-purple-100 rounded-lg p-3 text-center">
                          <span className="text-sm font-medium text-purple-800">営業部</span>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-3 text-center">
                          <span className="text-sm font-medium text-purple-800">人事部</span>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-3 text-center">
                          <span className="text-sm font-medium text-purple-800">マーケ</span>
                        </div>
                        <div className="bg-purple-100 rounded-lg p-3 text-center">
                          <span className="text-sm font-medium text-purple-800">カスタマーサポート</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}