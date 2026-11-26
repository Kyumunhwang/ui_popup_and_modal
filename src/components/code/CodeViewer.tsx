import { useState } from 'react';
import { Check, Code2, Copy } from 'lucide-react';
import { OverlayVsPattern } from '../../data/overlayVsPatterns';

interface CodeViewerProps {
  pattern: OverlayVsPattern;
  activeSide: 'A' | 'B';
  onChangeSide: (side: 'A' | 'B') => void;
}

type CodeTab = 'react' | 'vanilla';

export function CodeViewer({
  pattern,
  activeSide,
  onChangeSide,
}: CodeViewerProps) {
  const [framework, setFramework] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  const selectedInfo = activeSide === 'A' ? pattern.sideA : pattern.sideB;
  const codeText =
    framework === 'react' ? selectedInfo.code.react : selectedInfo.code.vanilla;

  const lines = codeText.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement('textarea');
      textarea.value = codeText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <aside className="flex h-full w-full flex-col border-l border-[#E5E8EB] bg-white xl:w-[430px] xl:shrink-0">
      {/* Header */}
      <div className="border-b border-[#E5E8EB] px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-[#3182F6]" />
            <h2 className="text-[15px] font-bold text-[#191F28]">
              코드 스니펫
            </h2>
          </div>
          <span className="rounded-full bg-[#F2F4F6] px-2.5 py-0.5 text-[11px] font-semibold text-[#4E5968]">
            {pattern.number} · {selectedInfo.label}
          </span>
        </div>

        {/* A vs B Code Switcher */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#F2F4F6] p-1">
          <button
            type="button"
            onClick={() => onChangeSide('A')}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeSide === 'A'
                ? 'bg-white text-[#191F28] shadow-sm'
                : 'text-[#4E5968] hover:text-[#191F28]'
            }`}
          >
            A. {pattern.sideA.label} 코드
          </button>
          <button
            type="button"
            onClick={() => onChangeSide('B')}
            className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
              activeSide === 'B'
                ? 'bg-[#3182F6] text-white shadow-sm'
                : 'text-[#4E5968] hover:text-[#191F28]'
            }`}
          >
            B. {pattern.sideB.label} 코드
          </button>
        </div>

        {/* React / Vanilla Tab + Copy Button */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setFramework('react')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                framework === 'react'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#8B95A1] hover:bg-[#F9FAFB] hover:text-[#4E5968]'
              }`}
            >
              React + Tailwind
            </button>
            <button
              type="button"
              onClick={() => setFramework('vanilla')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                framework === 'vanilla'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#8B95A1] hover:bg-[#F9FAFB] hover:text-[#4E5968]'
              }`}
            >
              Vanilla (HTML/JS)
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              copied
                ? 'bg-[#03B26C] text-white'
                : 'bg-[#191F28] text-white hover:bg-[#333D4B]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                복사 완료!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                복사하기
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="code-scrollbar relative flex-1 overflow-auto bg-[#161B24] p-4 font-mono text-[12px] leading-[1.65] text-[#E2E8F0]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.04]">
                <td className="w-8 select-none pr-3 text-right text-[11px] text-[#64748B]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-[#E2E8F0]">{line || ' '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#E5E8EB] bg-[#F9FAFB] px-5 py-3 text-[11px] text-[#4E5968]">
        <span className="font-semibold text-[#191F28]">
          {selectedInfo.label} ({selectedInfo.englishLabel})
        </span>
        {' — '}
        {selectedInfo.badge}
      </div>
    </aside>
  );
}
