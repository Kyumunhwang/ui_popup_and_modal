import { useState } from 'react';
import { X } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function PopupVsModalDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [popupOpen, setPopupOpen] = useState(true);
  const [bgClicks, setBgClicks] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [transferResult, setTransferResult] = useState<string | null>(null);

  return (
    <DualVsGrid>
      {/* Side A: Popup */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="relative flex h-full flex-col justify-between bg-[#F9FAFB] p-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191F28]">내 계좌 홈</span>
              <span className="rounded-full bg-[#E8F3FF] px-2 py-0.5 text-[10px] font-bold text-[#3182F6]">
                배경 클릭 {bgClicks}회
              </span>
            </div>
            <button
              type="button"
              onClick={() => setBgClicks((c) => c + 1)}
              className="w-full rounded-2xl border border-[#E5E8EB] bg-white p-3 text-left transition hover:border-[#3182F6]"
            >
              <p className="text-[11px] text-[#8B95A1]">토스뱅크 통장</p>
              <p className="mt-0.5 text-sm font-bold text-[#191F28]">
                2,450,000원
              </p>
              <p className="mt-1 text-[10px] font-medium text-[#3182F6]">
                팝업이 떠 있어도 여기를 누를 수 있어요!
              </p>
            </button>
            {!popupOpen && (
              <button
                type="button"
                onClick={() => setPopupOpen(true)}
                className="rounded-xl bg-[#3182F6] px-3 py-1.5 text-xs font-semibold text-white"
              >
                팝업 다시 열기
              </button>
            )}
          </div>

          {popupOpen && (
            <div className="relative z-10 ml-auto w-[82%] rounded-2xl border border-[#E5E8EB] bg-white p-3 shadow-float">
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-[#E8F3FF] px-2 py-0.5 text-[10px] font-bold text-[#3182F6]">
                  이벤트 안내
                </span>
                <button
                  type="button"
                  onClick={() => setPopupOpen(false)}
                  aria-label="팝업 닫기"
                  className="rounded-md p-0.5 text-[#8B95A1] hover:bg-[#F2F4F6]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-1.5 text-xs font-bold text-[#191F28]">
                이자 지금 바로 받기
              </p>
              <p className="mt-0.5 text-[11px] text-[#4E5968]">
                배경 조작을 막지 않고 떠 있어요.
              </p>
              <button
                type="button"
                onClick={() => setPopupOpen(false)}
                className="mt-2.5 w-full rounded-xl bg-[#3182F6] py-1.5 text-[11px] font-semibold text-white hover:bg-[#1B64DA]"
              >
                혜택 확인
              </button>
            </div>
          )}
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Modal */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative h-full bg-[#F9FAFB] p-4">
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-[#191F28]">송금 화면</span>
            <div className="rounded-2xl border border-[#E5E8EB] bg-white p-3">
              <p className="text-[11px] text-[#8B95A1]">받는 분</p>
              <p className="mt-0.5 text-sm font-bold text-[#191F28]">
                김토스 · 50,000원
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setTransferResult(null);
                setModalOpen(true);
              }}
              className="w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
            >
              송금 확인 모달 열기
            </button>
            {transferResult && (
              <p className="rounded-xl bg-[#E8F3FF] px-3 py-2 text-xs font-semibold text-[#1B64DA]">
                {transferResult}
              </p>
            )}
          </div>

          {modalOpen && (
            <div
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-2xl bg-white p-4 shadow-2xl"
              >
                <h4 className="text-sm font-bold text-[#191F28]">
                  50,000원을 보낼까요?
                </h4>
                <p className="mt-1 text-[11px] leading-relaxed text-[#4E5968]">
                  배경 클릭이 차단되며 반드시 선택해야 다음으로 진행됩니다.
                </p>
                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTransferResult('송금을 취소했어요.');
                      setModalOpen(false);
                    }}
                    className="rounded-xl bg-[#F2F4F6] py-2 text-xs font-semibold text-[#4E5968]"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTransferResult('송금을 완료했어요!');
                      setModalOpen(false);
                    }}
                    className="rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white"
                  >
                    보내기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
