import { useState } from 'react';
import { BellRing, Megaphone, X } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function BannerVsPushDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [pushOpen, setPushOpen] = useState(true);

  return (
    <DualVsGrid>
      {/* Side A: Banner */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="flex h-full flex-col gap-3 bg-[#F9FAFB] p-4">
          {bannerOpen ? (
            <div className="flex items-start justify-between gap-2 rounded-2xl bg-[#E8F3FF] px-3.5 py-2.5">
              <div className="flex items-start gap-2">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[#3182F6]" />
                <div>
                  <p className="text-xs font-bold text-[#1B64DA]">
                    새벽 점검 안내
                  </p>
                  <p className="text-[11px] text-[#191F28]">
                    00:30~01:00 이체가 제한돼요.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBannerOpen(false)}
                className="rounded-md p-0.5 text-[#4E5968] hover:bg-[#3182F6]/10"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setBannerOpen(true)}
              className="rounded-xl bg-[#E8F3FF] py-2 text-xs font-semibold text-[#3182F6]"
            >
              인앱 배너 다시 보기
            </button>
          )}

          <div className="flex-1 space-y-2 rounded-2xl border border-[#E5E8EB] bg-white p-3.5">
            <div className="h-2.5 w-24 rounded bg-[#E5E8EB]" />
            <div className="h-2 w-full rounded bg-[#F2F4F6]" />
            <div className="h-2 w-4/5 rounded bg-[#F2F4F6]" />
            <p className="pt-2 text-[11px] text-[#8B95A1]">
              앱 내부 레이아웃 흐름에 자연스럽게 배치돼요.
            </p>
          </div>
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Push Notification */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="flex h-full flex-col justify-between bg-[#191F28] p-4 text-white">
          <div>
            {pushOpen ? (
              <div
                onClick={() => setPushOpen(false)}
                className="cursor-pointer rounded-2xl bg-white/95 p-3 text-[#191F28] shadow-xl transition hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-[#3182F6] text-[9px] font-bold text-white">
                      T
                    </span>
                    <span className="text-[10px] font-bold text-[#4E5968]">
                      토스 · 지금
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8B95A1]">눌러서 열기</span>
                </div>
                <p className="mt-1 text-xs font-bold">입금 120,000원</p>
                <p className="text-[11px] text-[#4E5968]">
                  김토스님이 급여 계좌로 보냈어요.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/5 p-3 text-center text-[11px] text-white/70">
                잠금화면 대기 중
              </div>
            )}

            <div className="mt-5 text-center">
              <p className="text-3xl font-bold tracking-tight">9:41</p>
              <p className="mt-0.5 text-[11px] text-white/60">
                11월 26일 목요일
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPushOpen(true)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
          >
            <BellRing className="h-3.5 w-3.5" />
            푸시 알림 수신 시뮬레이션
          </button>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
