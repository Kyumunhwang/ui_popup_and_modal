import { useState } from 'react';
import { Bell, Gift } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function BadgeVsDotDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [count, setCount] = useState(3);
  const [hasDot, setHasDot] = useState(true);

  return (
    <DualVsGrid>
      {/* Side A: Badge */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#F9FAFB] p-5">
          <button
            type="button"
            onClick={() => setCount(0)}
            className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E8F3FF] text-[#3182F6] shadow-sm transition hover:scale-105"
          >
            <Bell className="h-7 w-7" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#F04452] px-1.5 text-xs font-bold text-white ring-2 ring-white">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </button>

          <p className="text-xs font-semibold text-[#191F28]">
            {count > 0
              ? `미확인 알림 ${count}개 (아이콘 클릭 시 읽음)`
              : '모든 알림을 확인했어요'}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCount((c) => c + 1)}
              className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-[#191F28] ring-1 ring-[#E5E8EB] hover:bg-[#F2F4F6]"
            >
              +1 추가
            </button>
            <button
              type="button"
              onClick={() => setCount(120)}
              className="rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-[#3182F6] ring-1 ring-[#E5E8EB] hover:bg-[#E8F3FF]"
            >
              99+ 테스트
            </button>
          </div>
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Dot */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#F9FAFB] p-5">
          <button
            type="button"
            onClick={() => setHasDot(false)}
            className="relative flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E8F3FF] text-[#3182F6] shadow-sm transition hover:scale-105"
          >
            <Gift className="h-7 w-7" />
            {hasDot && (
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#F04452] ring-2 ring-white" />
            )}
          </button>

          <p className="text-xs font-semibold text-[#191F28]">
            {hasDot
              ? '새로운 혜택이 도착했어요 (클릭해 확인)'
              : '새 소식을 확인해 닷이 사라졌어요'}
          </p>

          <button
            type="button"
            onClick={() => setHasDot(true)}
            className="rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-[#4E5968] ring-1 ring-[#E5E8EB] hover:bg-[#F2F4F6]"
          >
            새 소식 상태 켜기
          </button>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
