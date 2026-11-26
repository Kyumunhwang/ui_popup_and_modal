import { useEffect, useState } from 'react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function AlertVsToastDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [alertOpen, setAlertOpen] = useState(true);
  const [toastOpen, setToastOpen] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2200);
    return () => clearTimeout(t);
  }, [toastOpen]);

  return (
    <DualVsGrid>
      {/* Side A: Alert */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="relative h-full bg-[#F9FAFB] p-4">
          <div className="rounded-2xl border border-[#E5E8EB] bg-white p-3.5">
            <p className="text-xs font-bold text-[#191F28]">이체 신청</p>
            <p className="mt-1 text-[11px] text-[#4E5968]">
              요청 금액: 7,000,000원
            </p>
            <button
              type="button"
              onClick={() => setAlertOpen(true)}
              className="mt-3 w-full rounded-xl bg-[#F04452] py-2 text-xs font-semibold text-white"
            >
              한도 초과 알럿 보기
            </button>
          </div>

          {alertOpen && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-4">
              <div className="w-full rounded-2xl bg-white p-4 text-center shadow-2xl">
                <h4 className="text-sm font-bold text-[#191F28]">
                  한도를 초과했어요
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#4E5968]">
                  1일 이체 한도를 넘어 진행할 수 없습니다. 확인을 눌러야 닫혀요.
                </p>
                <button
                  type="button"
                  onClick={() => setAlertOpen(false)}
                  className="mt-3.5 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Toast */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative flex h-full flex-col justify-between bg-[#F9FAFB] p-4">
          <div className="space-y-2.5 rounded-2xl border border-[#E5E8EB] bg-white p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191F28]">
                자동 저장 설정
              </span>
              <button
                type="button"
                onClick={() => {
                  setAutoSave((v) => !v);
                  setToastOpen(true);
                }}
                className={`h-6 w-11 rounded-full p-0.5 transition ${
                  autoSave ? 'bg-[#3182F6]' : 'bg-[#D1D6DB]'
                }`}
                aria-label="자동 저장 토글"
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white shadow transition ${
                    autoSave ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-[11px] text-[#4E5968]">
              토글을 눌러도 흐름을 멈추지 않고 결과만 가볍게 알려줘요.
            </p>
          </div>

          <div className="flex justify-center pb-1">
            {toastOpen ? (
              <div className="rounded-full bg-[#191F28] px-4 py-2 text-xs font-medium text-white shadow-lg">
                설정을 저장했어요
              </div>
            ) : (
              <span className="text-[11px] text-[#8B95A1]">
                스위치를 누르면 토스트가 나타나요
              </span>
            )}
          </div>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
