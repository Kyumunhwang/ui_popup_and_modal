import { ComponentType, useMemo, useState } from 'react';
import { Code2, Eye, LayoutGrid, Menu, X } from 'lucide-react';
import {
  OVERLAY_VS_PATTERNS,
  OverlayVsPattern,
  PatternId,
} from './data/overlayVsPatterns';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewGrid } from './components/preview/OverviewGrid';
import { DualCompareFrame } from './components/preview/DualCompareFrame';
import { CodeViewer } from './components/code/CodeViewer';
import { PopupVsModalDemo } from './components/preview/demos/PopupVsModalDemo';
import { ToastVsSnackbarDemo } from './components/preview/demos/ToastVsSnackbarDemo';
import { TooltipVsPopoverDemo } from './components/preview/demos/TooltipVsPopoverDemo';
import { BottomSheetVsDrawerDemo } from './components/preview/demos/BottomSheetVsDrawerDemo';
import { BannerVsPushDemo } from './components/preview/demos/BannerVsPushDemo';
import { BadgeVsDotDemo } from './components/preview/demos/BadgeVsDotDemo';
import { OnboardingVsCoachMarkDemo } from './components/preview/demos/OnboardingVsCoachMarkDemo';
import { DimVsBlurDemo } from './components/preview/demos/DimVsBlurDemo';
import { AlertVsToastDemo } from './components/preview/demos/AlertVsToastDemo';

interface DemoComponentProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

const DEMO_COMPONENTS: Record<PatternId, ComponentType<DemoComponentProps>> = {
  'popup-vs-modal': PopupVsModalDemo,
  'toast-vs-snackbar': ToastVsSnackbarDemo,
  'tooltip-vs-popover': TooltipVsPopoverDemo,
  'bottomsheet-vs-drawer': BottomSheetVsDrawerDemo,
  'banner-vs-push': BannerVsPushDemo,
  'badge-vs-dot': BadgeVsDotDemo,
  'onboarding-vs-coachmark': OnboardingVsCoachMarkDemo,
  'dim-vs-blur': DimVsBlurDemo,
  'alert-vs-toast': AlertVsToastDemo,
};

export default function App() {
  const [selectedId, setSelectedId] = useState<PatternId>('popup-vs-modal');
  const [viewMode, setViewMode] = useState<'compare' | 'overview'>('compare');
  const [activeCodeSide, setActiveCodeSide] = useState<'A' | 'B'>('A');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<'preview' | 'code'>('preview');

  const activePattern = useMemo(
    () =>
      OVERLAY_VS_PATTERNS.find((item) => item.id === selectedId) ??
      OVERLAY_VS_PATTERNS[0],
    [selectedId]
  );

  const ActiveDemo = DEMO_COMPONENTS[activePattern.id];

  const handleSelectPattern = (id: PatternId) => {
    setSelectedId(id);
    setViewMode('compare');
    setActiveCodeSide('A');
    setMobileMenuOpen(false);
  };

  const handleChangeViewMode = (mode: 'compare' | 'overview') => {
    setViewMode(mode);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#F2F4F6] text-[#191F28] lg:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl bg-[#F2F4F6] p-2 text-[#191F28]"
            aria-label="메뉴 열기"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs font-bold text-[#3182F6]">
              {viewMode === 'overview'
                ? '전체 보기'
                : `${activePattern.number} · ${activePattern.title}`}
            </p>
            <p className="text-[11px] text-[#8B95A1]">오버레이 비교 랩</p>
          </div>
        </div>

        {viewMode === 'compare' ? (
          <div className="flex rounded-xl bg-[#F2F4F6] p-1">
            <button
              type="button"
              onClick={() => setMobilePanel('preview')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                mobilePanel === 'preview'
                  ? 'bg-white text-[#191F28] shadow-sm'
                  : 'text-[#4E5968]'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              비교
            </button>
            <button
              type="button"
              onClick={() => setMobilePanel('code')}
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                mobilePanel === 'code'
                  ? 'bg-[#3182F6] text-white shadow-sm'
                  : 'text-[#4E5968]'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              코드
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode('compare')}
            className="inline-flex items-center gap-1 rounded-xl bg-[#3182F6] px-3 py-1.5 text-xs font-semibold text-white"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            상세 비교
          </button>
        )}
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 flex bg-black/40 lg:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative h-full w-72 bg-white shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-lg p-1.5 text-[#8B95A1] hover:bg-[#F2F4F6]"
              aria-label="메뉴 닫기"
            >
              <X className="h-4 w-4" />
            </button>
            <Sidebar
              selectedId={selectedId}
              viewMode={viewMode}
              onSelectPattern={handleSelectPattern}
              onChangeViewMode={handleChangeViewMode}
            />
          </div>
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <div className="hidden lg:flex lg:h-full">
        <Sidebar
          selectedId={selectedId}
          viewMode={viewMode}
          onSelectPattern={handleSelectPattern}
          onChangeViewMode={handleChangeViewMode}
        />
      </div>

      {/* Main Content Area */}
      {viewMode === 'overview' ? (
        <OverviewGrid
          selectedId={selectedId}
          onSelectPattern={handleSelectPattern}
        />
      ) : (
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden xl:flex-row">
          {/* Center Live Preview + Comparison Table + UX Guide */}
          <div
            className={`min-w-0 flex-1 flex-col overflow-hidden ${
              mobilePanel === 'preview' ? 'flex' : 'hidden xl:flex'
            }`}
          >
            <DualCompareFrame
              pattern={activePattern}
              activeCodeSide={activeCodeSide}
              onSelectCodeSide={setActiveCodeSide}
              onOpenOverview={() => setViewMode('overview')}
            >
              <ActiveDemo
                pattern={activePattern}
                activeCodeSide={activeCodeSide}
                onSelectCodeSide={(side) => {
                  setActiveCodeSide(side);
                  setMobilePanel('code');
                }}
              />
            </DualCompareFrame>
          </div>

          {/* Right Code Panel */}
          <div
            className={`h-full flex-col overflow-hidden ${
              mobilePanel === 'code' ? 'flex flex-1 xl:flex-none' : 'hidden xl:flex'
            }`}
          >
            <CodeViewer
              pattern={activePattern}
              activeSide={activeCodeSide}
              onChangeSide={setActiveCodeSide}
            />
          </div>
        </div>
      )}
    </div>
  );
}
