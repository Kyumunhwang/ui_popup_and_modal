import { LayoutGrid, Layers } from 'lucide-react';
import { OVERLAY_VS_PATTERNS, PatternId } from '../../data/overlayVsPatterns';

interface SidebarProps {
  selectedId: PatternId;
  viewMode: 'compare' | 'overview';
  onSelectPattern: (id: PatternId) => void;
  onChangeViewMode: (mode: 'compare' | 'overview') => void;
}

export function Sidebar({
  selectedId,
  viewMode,
  onSelectPattern,
  onChangeViewMode,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-[#E5E8EB] bg-white lg:w-[272px] lg:shrink-0">
      {/* Brand Header */}
      <div className="border-b border-[#E5E8EB] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-sm">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
              오버레이 비교 랩
            </h1>
            <p className="text-[11px] font-medium text-[#8B95A1]">
              9가지 UI/UX A vs B 가이드
            </p>
          </div>
        </div>

        {/* Overview Toggle Button */}
        <button
          type="button"
          onClick={() =>
            onChangeViewMode(viewMode === 'overview' ? 'compare' : 'overview')
          }
          className={`mt-4 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition ${
            viewMode === 'overview'
              ? 'bg-[#3182F6] text-white shadow-sm'
              : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB] hover:text-[#191F28]'
          }`}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            전체 한눈에 보기
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
              viewMode === 'overview'
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#3182F6]'
            }`}
          >
            3×3
          </span>
        </button>
      </div>

      {/* Pattern List 01 ~ 09 */}
      <nav
        aria-label="오버레이 비교 패턴 목록"
        className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-3"
      >
        <p className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold tracking-wide text-[#8B95A1]">
          비교 패턴 (01–09)
        </p>
        {OVERLAY_VS_PATTERNS.map((pattern) => {
          const isActive = viewMode === 'compare' && selectedId === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition ${
                isActive
                  ? 'bg-[#E8F3FF] ring-1 ring-[#3182F6]/30'
                  : 'hover:bg-[#F9FAFB]'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                  isActive
                    ? 'bg-[#3182F6] text-white'
                    : 'bg-[#F2F4F6] text-[#3182F6] group-hover:bg-[#E8F3FF]'
                }`}
              >
                {pattern.number}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-[13.5px] font-bold ${
                    isActive ? 'text-[#1B64DA]' : 'text-[#191F28]'
                  }`}
                >
                  {pattern.title}
                </p>
                <p className="truncate text-[11px] font-medium text-[#8B95A1]">
                  {pattern.englishTitle}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Hint */}
      <div className="border-t border-[#E5E8EB] bg-[#F9FAFB] px-4 py-3 text-[11px] leading-relaxed text-[#8B95A1]">
        좌우 디바이스를 직접 클릭해 차이점을 체험하고 우측에서 코드를 복사하세요.
      </div>
    </aside>
  );
}
