import { useState } from 'react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

function ColorfulBackground({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="space-y-2.5 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#191F28]">자산 포트폴리오</span>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-lg bg-[#3182F6] px-2.5 py-1 text-[11px] font-semibold text-white"
        >
          다시 열기
        </button>
      </div>
      <div className="h-12 rounded-2xl bg-gradient-to-r from-[#3182F6] to-[#60A5FA] p-3 text-xs font-bold text-white">
        국내 주식 +12.4%
      </div>
      <div className="h-12 rounded-2xl bg-gradient-to-r from-[#FF8A65] to-[#FFB74D] p-3 text-xs font-bold text-white">
        해외 채권 +5.2%
      </div>
      <div className="h-12 rounded-2xl bg-gradient-to-r from-[#26A69A] to-[#66BB6A] p-3 text-xs font-bold text-white">
        예적금 +3.5%
      </div>
    </div>
  );
}

export function DimVsBlurDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [dimOpen, setDimOpen] = useState(true);
  const [blurOpen, setBlurOpen] = useState(true);

  return (
    <DualVsGrid>
      {/* Side A: Dim */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="relative h-full bg-[#F9FAFB]">
          <ColorfulBackground onOpen={() => setDimOpen(true)} />
          {dimOpen && (
            <div
              onClick={() => setDimOpen(false)}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-2xl bg-white p-4 shadow-2xl"
              >
                <p className="text-sm font-bold text-[#191F28]">딤(Dim) 처리</p>
                <p className="mt-1 text-[11px] text-[#4E5968]">
                  배경 명도를 어둡게 눌러 전면 카드 가독성을 높여요.
                </p>
                <button
                  type="button"
                  onClick={() => setDimOpen(false)}
                  className="mt-3 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Blur */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative h-full bg-[#F9FAFB]">
          <ColorfulBackground onOpen={() => setBlurOpen(true)} />
          {blurOpen && (
            <div
              onClick={() => setBlurOpen(false)}
              className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 p-4 backdrop-blur-md"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-2xl border border-white/80 bg-white/95 p-4 shadow-2xl"
              >
                <p className="text-sm font-bold text-[#191F28]">
                  블러(Blur) 처리
                </p>
                <p className="mt-1 text-[11px] text-[#4E5968]">
                  배경 색감과 공간 맥락을 유지하면서 부드럽게 가려요.
                </p>
                <button
                  type="button"
                  onClick={() => setBlurOpen(false)}
                  className="mt-3 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
