import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

const BANKS = ['토스뱅크', '국민은행', '신한은행'];
const MENUS = ['홈 대시보드', '자산 분석', '카드 혜택', '고객센터'];

export function BottomSheetVsDrawerDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [selectedBank, setSelectedBank] = useState('토스뱅크');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('홈 대시보드');

  return (
    <DualVsGrid>
      {/* Side A: Bottom Sheet */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="relative h-full bg-[#F9FAFB] p-4">
          <p className="text-xs font-bold text-[#191F28]">계좌 연결</p>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="mt-2.5 flex w-full items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#191F28]"
          >
            <span>선택 은행: {selectedBank}</span>
            <ChevronDown className="h-4 w-4 text-[#8B95A1]" />
          </button>

          {sheetOpen && (
            <div
              onClick={() => setSheetOpen(false)}
              className="absolute inset-0 z-20 flex items-end bg-black/40"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-t-3xl bg-white px-4 pb-4 pt-2.5 shadow-2xl"
              >
                <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-[#D1D6DB]" />
                <p className="text-xs font-bold text-[#191F28]">
                  어느 은행을 선택할까요?
                </p>
                <div className="mt-2 space-y-1">
                  {BANKS.map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => {
                        setSelectedBank(bank);
                        setSheetOpen(false);
                      }}
                      className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition ${
                        selectedBank === bank
                          ? 'bg-[#E8F3FF] text-[#3182F6]'
                          : 'text-[#191F28] hover:bg-[#F2F4F6]'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Drawer */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative h-full bg-[#F9FAFB] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#191F28]">
              현재 메뉴: {activeMenu}
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#191F28] ring-1 ring-[#E5E8EB]"
              aria-label="메뉴 열기"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          {drawerOpen && (
            <div
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 z-20 flex justify-end bg-black/40"
            >
              <aside
                onClick={(e) => e.stopPropagation()}
                className="flex h-full w-48 flex-col justify-between bg-white p-4 shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#191F28]">
                      전체 메뉴
                    </span>
                    <button
                      type="button"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6]"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {MENUS.map((menu) => (
                      <button
                        key={menu}
                        type="button"
                        onClick={() => {
                          setActiveMenu(menu);
                          setDrawerOpen(false);
                        }}
                        className={`block w-full rounded-xl px-2.5 py-2 text-left text-xs font-semibold ${
                          activeMenu === menu
                            ? 'bg-[#E8F3FF] text-[#3182F6]'
                            : 'text-[#4E5968] hover:bg-[#F2F4F6]'
                        }`}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] text-[#8B95A1]">
                  측면 전체 높이 슬라이드
                </span>
              </aside>
            </div>
          )}
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
