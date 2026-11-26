import { useState } from 'react';
import { Plus } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

const ONBOARDING_STEPS = [
  { title: '1초 만에 계좌 조회', desc: '흩어진 계좌를 한눈에 모아보세요.' },
  { title: '수수료 없는 송금', desc: '연락처로도 무료 송금이 가능해요.' },
  { title: '소비 리포트 분석', desc: '이번 달 지출을 자동으로 정리해요.' },
];

export function OnboardingVsCoachMarkDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [step, setStep] = useState(0);
  const [coachOpen, setCoachOpen] = useState(true);

  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;

  return (
    <DualVsGrid>
      {/* Side A: Onboarding */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="flex h-full flex-col items-center justify-between bg-white p-5 text-center">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="text-[11px] font-semibold text-[#8B95A1] hover:text-[#4E5968]"
            >
              처음으로
            </button>
          </div>

          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F3FF] text-base font-extrabold text-[#3182F6]">
              0{step + 1}
            </div>
            <h4 className="mt-3 text-sm font-bold text-[#191F28]">
              {current.title}
            </h4>
            <p className="mt-1 text-xs text-[#4E5968]">{current.desc}</p>
          </div>

          <div className="w-full space-y-3">
            <div className="flex justify-center gap-1.5">
              {ONBOARDING_STEPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === step ? 'w-5 bg-[#3182F6]' : 'w-1.5 bg-[#D1D6DB]'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep((s) => (isLast ? 0 : s + 1))}
              className="w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
            >
              {isLast ? '다시 보기' : '다음'}
            </button>
          </div>
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Coach Mark */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative h-full bg-[#F9FAFB] p-4">
          <p className="text-xs font-bold text-[#191F28]">저축 목표</p>
          <div className="mt-2 rounded-2xl border border-[#E5E8EB] bg-white p-3">
            <p className="text-[11px] text-[#8B95A1]">여행 자금 모으기</p>
            <p className="mt-0.5 text-sm font-bold text-[#191F28]">650,000원</p>
          </div>

          {!coachOpen && (
            <button
              type="button"
              onClick={() => setCoachOpen(true)}
              className="mt-3 rounded-xl bg-[#E8F3FF] px-3 py-1.5 text-xs font-semibold text-[#3182F6]"
            >
              코치마크 다시 띄우기
            </button>
          )}

          {coachOpen && (
            <div
              onClick={() => setCoachOpen(false)}
              className="absolute inset-0 z-10 bg-black/55"
            />
          )}

          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2">
            {coachOpen && (
              <div className="rounded-xl bg-white px-3 py-1.5 text-[11px] font-bold text-[#191F28] shadow-lg">
                여기예요! 눌러서 새 목표 추가
              </div>
            )}
            <button
              type="button"
              onClick={() => setCoachOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3182F6] text-white shadow-xl ring-4 ring-[#3182F6]/30"
              aria-label="목표 추가"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
