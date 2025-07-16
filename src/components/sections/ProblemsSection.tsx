// アイコンコンポーネント
const CheckIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export function ProblemsSection() {
  return (
    <section className="py-20 md:py-28 bg-slate-50/80">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">こんなお悩み、ありませんか？</h2>
          <p className="mt-4 text-lg text-slate-600">一つでも当てはまれば、私たちの知見が役立ちます。</p>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-x-8 gap-y-12 text-center">
          <div className="flex flex-col items-center animate-on-scroll" style={{transitionDelay: '0ms'}}>
            <div className="relative bg-teal-100 text-teal-600 rounded-full p-4 mb-4">
              <CheckIcon className="w-8 h-8" />
              <div className="absolute -inset-2 rounded-full bg-teal-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="font-bold text-lg mb-2">ルールがない</h3>
            <p className="text-slate-600 text-sm">社内にAIの利用ルールがなく、何から手をつけていいか分からない。</p>
          </div>
          <div className="flex flex-col items-center animate-on-scroll" style={{transitionDelay: '100ms'}}>
            <div className="bg-teal-100 text-teal-600 rounded-full p-4 mb-4">
              <CheckIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">使い道がわからない</h3>
            <p className="text-slate-600 text-sm">AIが話題だが、自社の業務でどんなことに使えるのか具体的なイメージが湧かない。</p>
          </div>
          <div className="flex flex-col items-center animate-on-scroll" style={{transitionDelay: '200ms'}}>
            <div className="bg-teal-100 text-teal-600 rounded-full p-4 mb-4">
              <CheckIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">種類が多すぎる</h3>
            <p className="text-slate-600 text-sm">AI製品が多すぎて、どれが自社に適しているのか判断できない。</p>
          </div>
        </div>
      </div>
    </section>
  );
}