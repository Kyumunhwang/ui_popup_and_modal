import { ArrowRight } from 'lucide-react';
import { OVERLAY_VS_PATTERNS, PatternId } from '../../data/overlayVsPatterns';

interface OverviewGridProps {
  selectedId: PatternId;
  onSelectPattern: (id: PatternId) => void;
}

function ThumbnailIllustration({ id }: { id: PatternId }) {
  switch (id) {
    case 'popup-vs-modal':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          {/* Left: Non-blocking popup */}
          <div className="relative h-24 w-16 rounded-xl border border-[#E5E8EB] bg-white p-1.5 shadow-sm">
            <div className="space-y-1">
              <div className="h-1.5 w-10 rounded bg-[#E5E8EB]" />
              <div className="h-1.5 w-12 rounded bg-[#F2F4F6]" />
              <div className="h-1.5 w-8 rounded bg-[#F2F4F6]" />
              <div className="h-1.5 w-11 rounded bg-[#F2F4F6]" />
            </div>
            <div className="absolute -bottom-1.5 -right-2 w-12 rounded-lg border border-[#E5E8EB] bg-white p-1.5 shadow-md">
              <div className="h-1 w-7 rounded bg-[#191F28]" />
              <div className="mt-1 h-2 w-full rounded bg-[#3182F6]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          {/* Right: Blocking modal */}
          <div className="relative flex h-24 w-16 items-center justify-center rounded-xl bg-[#4E5968] p-1.5 shadow-sm">
            <div className="w-14 rounded-lg bg-white p-1.5 shadow-md">
              <div className="h-1.5 w-8 rounded bg-[#191F28]" />
              <div className="mt-1 h-1 w-10 rounded bg-[#D1D6DB]" />
              <div className="mt-1.5 h-2.5 w-full rounded bg-[#3182F6]" />
            </div>
          </div>
        </div>
      );

    case 'toast-vs-snackbar':
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-4">
          <div className="rounded-full bg-[#333D4B] px-3 py-1.5 text-[10px] font-medium text-white shadow">
            복사했어요
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="flex items-center gap-2 rounded-full bg-[#191F28] px-3 py-1.5 text-[10px] font-medium text-white shadow-md">
            <span>삭제했어요</span>
            <span className="font-bold text-[#5C9DFF]">되돌리기</span>
          </div>
        </div>
      );

    case 'tooltip-vs-popover':
      return (
        <div className="flex h-full items-center justify-center gap-4 px-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="rounded-md bg-[#191F28] px-2 py-0.5 text-[8px] text-white">
              짧은 설명
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E8EB] text-[10px] font-bold text-[#4E5968]">
              i
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5E8EB] text-[10px] font-bold text-[#4E5968]">
              •••
            </div>
            <div className="w-16 rounded-lg border border-[#E5E8EB] bg-white p-1.5 shadow-md">
              <div className="h-1.5 w-8 rounded bg-[#191F28]" />
              <div className="mt-1 h-2.5 w-full rounded bg-[#3182F6]" />
            </div>
          </div>
        </div>
      );

    case 'bottomsheet-vs-drawer':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          <div className="relative h-24 w-16 overflow-hidden rounded-xl bg-[#D1D6DB] shadow-sm">
            <div className="absolute inset-x-0 bottom-0 h-11 rounded-t-xl bg-white p-1.5 shadow">
              <div className="mx-auto mb-1.5 h-0.5 w-5 rounded-full bg-[#D1D6DB]" />
              <div className="h-1.5 w-9 rounded bg-[#E5E8EB]" />
              <div className="mt-1 h-1.5 w-11 rounded bg-[#F2F4F6]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="relative h-24 w-16 overflow-hidden rounded-xl bg-[#8B95A1] shadow-sm">
            <div className="h-full w-10 bg-white p-1.5 shadow">
              <div className="h-1.5 w-6 rounded bg-[#191F28]" />
              <div className="mt-2 h-1.5 w-7 rounded bg-[#E5E8EB]" />
              <div className="mt-1.5 h-1.5 w-5 rounded bg-[#E5E8EB]" />
            </div>
          </div>
        </div>
      );

    case 'banner-vs-push':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          <div className="h-24 w-16 rounded-xl border border-[#E5E8EB] bg-white p-1.5 shadow-sm">
            <div className="mb-1.5 rounded bg-[#E8F3FF] px-1 py-1">
              <div className="h-1 w-8 rounded bg-[#3182F6]" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-11 rounded bg-[#F2F4F6]" />
              <div className="h-1.5 w-9 rounded bg-[#F2F4F6]" />
              <div className="h-1.5 w-12 rounded bg-[#F2F4F6]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="flex h-24 w-16 flex-col items-center rounded-xl bg-[#191F28] p-1.5 text-white shadow-sm">
            <div className="w-full rounded-md bg-white/95 p-1">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-sm bg-[#3182F6]" />
                <span className="h-1 w-7 rounded bg-[#191F28]" />
              </div>
            </div>
            <span className="mt-3 text-[11px] font-bold tracking-tight">9:41</span>
          </div>
        </div>
      );

    case 'badge-vs-dot':
      return (
        <div className="flex h-full items-center justify-center gap-4 px-4">
          <div className="relative h-11 w-11 rounded-2xl bg-[#E8F3FF]">
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F04452] text-[9px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="relative h-11 w-11 rounded-2xl bg-[#E8F3FF]">
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#F04452] ring-2 ring-white" />
          </div>
        </div>
      );

    case 'onboarding-vs-coachmark':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          <div className="flex h-24 w-16 flex-col items-center justify-between rounded-xl border border-[#E5E8EB] bg-white p-2 shadow-sm">
            <div className="mt-2 h-8 w-8 rounded-xl bg-[#E8F3FF]" />
            <div className="flex gap-1">
              <span className="h-1 w-2.5 rounded-full bg-[#3182F6]" />
              <span className="h-1 w-1 rounded-full bg-[#D1D6DB]" />
              <span className="h-1 w-1 rounded-full bg-[#D1D6DB]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="relative flex h-24 w-16 flex-col justify-end rounded-xl bg-[#4E5968] p-1.5 shadow-sm">
            <div className="mb-1 self-end rounded bg-white px-1.5 py-0.5 text-[7px] font-bold text-[#191F28]">
              여기예요
            </div>
            <div className="self-end rounded-full bg-[#3182F6] p-1.5 ring-2 ring-white/80">
              <div className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      );

    case 'dim-vs-blur':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          <div className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-xl bg-[#4E5968] p-1.5 shadow-sm">
            <div className="w-14 rounded-lg bg-white p-1.5 shadow">
              <div className="h-1.5 w-7 rounded bg-[#191F28]" />
              <div className="mt-1.5 h-2 w-full rounded bg-[#3182F6]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="relative flex h-24 w-16 items-center justify-center overflow-hidden rounded-xl border border-[#E5E8EB] bg-gradient-to-br from-[#FFE8CC]/60 via-white to-[#E8F3FF]/80 p-1.5 shadow-sm">
            <div className="w-14 rounded-lg bg-white/95 p-1.5 shadow">
              <div className="h-1.5 w-7 rounded bg-[#191F28]" />
              <div className="mt-1.5 h-2 w-full rounded bg-[#3182F6]" />
            </div>
          </div>
        </div>
      );

    case 'alert-vs-toast':
      return (
        <div className="flex h-full items-center justify-center gap-3 px-4">
          <div className="w-20 rounded-xl border border-[#E5E8EB] bg-white p-2 text-center shadow-md">
            <div className="mx-auto h-1.5 w-10 rounded bg-[#191F28]" />
            <div className="mx-auto mt-1 h-1 w-12 rounded bg-[#D1D6DB]" />
            <div className="mt-2 rounded-md bg-[#3182F6] py-1 text-[8px] font-bold text-white">
              확인
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#B0B8C1]">VS</span>
          <div className="rounded-full bg-[#191F28] px-2.5 py-1 text-[8px] font-medium text-white shadow">
            저장했어요
          </div>
        </div>
      );
  }
}

export function OverviewGrid({ selectedId, onSelectPattern }: OverviewGridProps) {
  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto px-5 py-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-bold text-[#3182F6]">
              전체 한눈에 보기 (01–09)
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#191F28]">
              실무에서 헷갈리는 9가지 UI/UX 오버레이 비교
            </h2>
            <p className="mt-1 text-sm text-[#4E5968]">
              카드를 클릭하면 좌우 라이브 인터랙티브 데모와 React · Vanilla 코드 스니펫 화면으로 바로 이동합니다.
            </p>
          </div>
        </div>

        {/* 3x3 Reference Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {OVERLAY_VS_PATTERNS.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectPattern(item.id)}
                className={`group flex flex-col rounded-3xl bg-white p-4 text-left transition-all duration-150 ${
                  isSelected
                    ? 'ring-2 ring-[#3182F6] shadow-float'
                    : 'border border-[#E5E8EB] shadow-card hover:-translate-y-0.5 hover:border-[#3182F6]/50 hover:shadow-md'
                }`}
              >
                {/* Mini Preview Stage */}
                <div className="h-36 w-full overflow-hidden rounded-2xl bg-[#F9FAFB]">
                  <ThumbnailIllustration id={item.id} />
                </div>

                {/* Label Row */}
                <div className="mt-3.5 flex items-center justify-between px-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-[16px] font-bold text-[#191F28]">
                      <span className="text-[#3182F6]">{item.number}</span>
                      <span>{item.sideA.label}</span>
                      <span className="text-xs font-semibold text-[#8B95A1]">vs</span>
                      <span className={isSelected ? 'text-[#3182F6]' : 'text-[#191F28]'}>
                        {item.sideB.label}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs font-medium text-[#8B95A1]">
                      {item.englishTitle}
                    </p>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] transition group-hover:bg-[#3182F6] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
