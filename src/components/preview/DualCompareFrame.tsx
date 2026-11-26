import { ReactNode } from 'react';
import { AlertCircle, Check, LayoutGrid } from 'lucide-react';
import { OverlayVsPattern } from '../../data/overlayVsPatterns';

interface DualCompareFrameProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
  onOpenOverview: () => void;
  children: ReactNode;
}

interface DeviceShellProps {
  side: 'A' | 'B';
  title: string;
  englishTitle: string;
  badge: string;
  isCodeActive?: boolean;
  onInspectCode?: () => void;
  children: ReactNode;
}

export function DeviceShell({
  side,
  title,
  englishTitle,
  badge,
  isCodeActive,
  onInspectCode,
  children,
}: DeviceShellProps) {
  const isBlue = side === 'B';

  return (
    <div className="flex flex-1 flex-col">
      {/* Device Header */}
      <div className="mb-2.5 flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
              isBlue
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#E5E8EB] text-[#191F28]'
            }`}
          >
            {side}
          </span>
          <div>
            <span className="text-sm font-bold text-[#191F28]">{title}</span>
            <span className="ml-1.5 text-xs font-medium text-[#8B95A1]">
              {englishTitle}
            </span>
          </div>
        </div>
        {onInspectCode && (
          <button
            type="button"
            onClick={onInspectCode}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
              isCodeActive
                ? 'bg-[#3182F6] text-white'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E8F3FF] hover:text-[#3182F6]'
            }`}
          >
            코드 보기
          </button>
        )}
      </div>

      {/* Mini Device Viewport */}
      <div className="relative flex h-[340px] flex-col overflow-hidden rounded-[26px] border border-[#E5E8EB] bg-white shadow-device">
        {/* Status Bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#F2F4F6] bg-[#F9FAFB] px-4 py-2 text-[11px] font-semibold text-[#8B95A1]">
          <span>9:41</span>
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#4E5968] ring-1 ring-[#E5E8EB]">
            {badge}
          </span>
        </div>

        {/* Interactive Stage */}
        <div className="relative flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function DualVsGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_36px_1fr]">
      {children}
    </div>
  );
}

export function VsDivider() {
  return (
    <div className="flex items-center justify-center py-1 md:pt-8">
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E8EB] bg-white text-[11px] font-extrabold text-[#8B95A1] shadow-sm">
        VS
      </span>
    </div>
  );
}

export function DualCompareFrame({
  pattern,
  onOpenOverview,
  children,
}: DualCompareFrameProps) {
  return (
    <main className="custom-scrollbar flex-1 overflow-y-auto px-5 py-6 lg:px-7">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Pattern Header */}
        <header className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#E8F3FF] px-2.5 py-0.5 text-xs font-bold text-[#3182F6]">
                  {pattern.number}
                </span>
                <span className="text-xs font-semibold text-[#8B95A1]">
                  {pattern.englishTitle}
                </span>
              </div>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#191F28]">
                {pattern.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-[#4E5968]">
                {pattern.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenOverview}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-3 py-2 text-xs font-semibold text-[#4E5968] transition hover:bg-[#E5E8EB] hover:text-[#191F28]"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              전체 보기
            </button>
          </div>
        </header>

        {/* Dual Device Interactive Comparison */}
        <section aria-label="실시간 A vs B 인터랙티브 비교" className="relative">
          {children}
        </section>

        {/* Comparison Table */}
        <section className="overflow-hidden rounded-3xl border border-[#E5E8EB] bg-white shadow-card">
          <div className="border-b border-[#E5E8EB] px-5 py-4">
            <h3 className="text-[15px] font-bold text-[#191F28]">
              핵심 차이점 요약표
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F9FAFB] text-xs font-semibold text-[#8B95A1]">
                  <th className="px-5 py-3">비교 기준</th>
                  <th className="px-5 py-3 text-[#191F28]">
                    A. {pattern.sideA.label}
                  </th>
                  <th className="px-5 py-3 text-[#3182F6]">
                    B. {pattern.sideB.label}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F6]">
                {pattern.comparisonTable.map((row) => (
                  <tr key={row.criterion} className="hover:bg-[#F9FAFB]/60">
                    <td className="px-5 py-3 font-semibold text-[#4E5968]">
                      {row.criterion}
                    </td>
                    <td className="px-5 py-3 text-[#191F28]">{row.aValue}</td>
                    <td className="px-5 py-3 font-medium text-[#191F28]">
                      {row.bValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Practical UX Guidelines */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#E5E8EB] bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F2F4F6] text-xs font-bold text-[#191F28]">
                A
              </span>
              <h4 className="text-[15px] font-bold text-[#191F28]">
                {pattern.sideA.label}을 쓰는 순간
              </h4>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#4E5968]">
              {pattern.sideA.summary}
            </p>
            <ul className="mt-3.5 space-y-2">
              {pattern.sideA.whenToUse.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs leading-relaxed text-[#191F28]"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3182F6]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-[#3182F6]/25 bg-white p-5 shadow-card">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#3182F6] text-xs font-bold text-white">
                B
              </span>
              <h4 className="text-[15px] font-bold text-[#191F28]">
                {pattern.sideB.label}을 쓰는 순간
              </h4>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#4E5968]">
              {pattern.sideB.summary}
            </p>
            <ul className="mt-3.5 space-y-2">
              {pattern.sideB.whenToUse.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-xs leading-relaxed text-[#191F28]"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3182F6]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Caution Tip */}
        <section className="flex items-start gap-3 rounded-2xl border border-[#3182F6]/20 bg-[#E8F3FF]/70 px-4 py-3.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#3182F6]" />
          <div>
            <p className="text-xs font-bold text-[#1B64DA]">실무 설계 주의사항</p>
            <p className="mt-0.5 text-xs leading-relaxed text-[#191F28]">
              {pattern.cautionTip}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
