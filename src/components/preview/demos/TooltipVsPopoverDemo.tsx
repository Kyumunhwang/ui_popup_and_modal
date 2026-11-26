import { useState } from 'react';
import { Info, MoreHorizontal } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function TooltipVsPopoverDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [tooltipOpen, setTooltipOpen] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [alias, setAlias] = useState('생활비 통장');

  return (
    <DualVsGrid>
      {/* Side A: Tooltip */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="flex h-full flex-col justify-center bg-[#F9FAFB] p-5">
          <div className="rounded-2xl border border-[#E5E8EB] bg-white p-4">
            <p className="text-[11px] text-[#8B95A1]">투자 상품</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-sm font-bold text-[#191F28]">
                예상 연 수익률 4.8%
              </span>
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setTooltipOpen(true)}
                  onMouseLeave={() => setTooltipOpen(false)}
                  onClick={() => setTooltipOpen((v) => !v)}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                  aria-label="수익률 안내"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
                {tooltipOpen && (
                  <div className="absolute bottom-full left-1/2 z-20 mb-2 w-44 -translate-x-1/2 rounded-xl bg-[#191F28] px-3 py-2 text-[11px] leading-relaxed text-white shadow-lg">
                    최근 1년 기준 세전 연환산 수익률이며 버튼은 넣지 않아요.
                  </div>
                )}
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[#8B95A1]">
              아이콘에 마우스를 올리거나 눌러 툴팁을 토글해 보세요.
            </p>
          </div>
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Popover */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="flex h-full flex-col justify-start bg-[#F9FAFB] p-5 pt-7">
          <div className="relative flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white p-4">
            <div>
              <p className="text-[11px] text-[#8B95A1]">계좌 별칭</p>
              <p className="mt-0.5 text-sm font-bold text-[#191F28]">{alias}</p>
            </div>
            <button
              type="button"
              onClick={() => setPopoverOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
              aria-label="더보기"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {popoverOpen && (
              <div className="absolute right-3 top-full z-20 mt-2 w-52 rounded-2xl border border-[#E5E8EB] bg-white p-3.5 shadow-float">
                <p className="text-xs font-bold text-[#191F28]">빠른 계좌 설정</p>
                <p className="mt-0.5 text-[11px] text-[#4E5968]">
                  내부에 인터랙티브 버튼을 포함할 수 있어요.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setAlias((prev) =>
                      prev === '생활비 통장' ? '비상금 통장' : '생활비 통장'
                    );
                    setPopoverOpen(false);
                  }}
                  className="mt-2.5 w-full rounded-xl bg-[#3182F6] py-1.5 text-[11px] font-semibold text-white hover:bg-[#1B64DA]"
                >
                  별칭 바꾸기
                </button>
              </div>
            )}
          </div>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
