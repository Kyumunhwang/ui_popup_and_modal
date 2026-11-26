import { useEffect, useState } from 'react';
import { CheckCircle2, Copy, Trash2 } from 'lucide-react';
import { OverlayVsPattern } from '../../../data/overlayVsPatterns';
import { DeviceShell, DualVsGrid, VsDivider } from '../DualCompareFrame';

interface DemoProps {
  pattern: OverlayVsPattern;
  activeCodeSide: 'A' | 'B';
  onSelectCodeSide: (side: 'A' | 'B') => void;
}

export function ToastVsSnackbarDemo({
  pattern,
  activeCodeSide,
  onSelectCodeSide,
}: DemoProps) {
  const [toastOpen, setToastOpen] = useState(true);
  const [items, setItems] = useState(['구독 결제 알림', '카드 명세서 메일']);
  const [lastDeleted, setLastDeleted] = useState<string | null>(null);
  const [snackOpen, setSnackOpen] = useState(true);

  useEffect(() => {
    if (!toastOpen) return;
    const t = setTimeout(() => setToastOpen(false), 2400);
    return () => clearTimeout(t);
  }, [toastOpen]);

  useEffect(() => {
    if (!snackOpen) return;
    const t = setTimeout(() => setSnackOpen(false), 4500);
    return () => clearTimeout(t);
  }, [snackOpen]);

  const handleDelete = (target: string) => {
    setItems((prev) => prev.filter((item) => item !== target));
    setLastDeleted(target);
    setSnackOpen(true);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      setItems((prev) =>
        prev.includes(lastDeleted) ? prev : [lastDeleted, ...prev]
      );
    } else {
      setItems(['구독 결제 알림', '카드 명세서 메일']);
    }
    setLastDeleted(null);
    setSnackOpen(false);
  };

  return (
    <DualVsGrid>
      {/* Side A: Toast */}
      <DeviceShell
        side="A"
        title={pattern.sideA.label}
        englishTitle={pattern.sideA.englishLabel}
        badge={pattern.sideA.badge}
        isCodeActive={activeCodeSide === 'A'}
        onInspectCode={() => onSelectCodeSide('A')}
      >
        <div className="relative flex h-full flex-col justify-between bg-[#F9FAFB] p-4">
          <div className="rounded-2xl border border-[#E5E8EB] bg-white p-3.5">
            <p className="text-[11px] font-medium text-[#8B95A1]">토스뱅크 계좌</p>
            <p className="mt-1 text-sm font-bold text-[#191F28]">
              1000-1234-5678
            </p>
            <button
              type="button"
              onClick={() => setToastOpen(true)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
            >
              <Copy className="h-3.5 w-3.5" />
              계좌번호 복사하기
            </button>
          </div>

          <div className="flex justify-center pb-2">
            {toastOpen ? (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#191F28] px-3.5 py-2 text-xs font-medium text-white shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#3182F6]" />
                <span>계좌번호를 복사했어요</span>
              </div>
            ) : (
              <span className="text-[11px] text-[#8B95A1]">
                2.4초 뒤 자동으로 사라졌어요
              </span>
            )}
          </div>
        </div>
      </DeviceShell>

      <VsDivider />

      {/* Side B: Snackbar */}
      <DeviceShell
        side="B"
        title={pattern.sideB.label}
        englishTitle={pattern.sideB.englishLabel}
        badge={pattern.sideB.badge}
        isCodeActive={activeCodeSide === 'B'}
        onInspectCode={() => onSelectCodeSide('B')}
      >
        <div className="relative flex h-full flex-col justify-between bg-[#F9FAFB] p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#191F28]">알림함</span>
              {items.length === 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setItems(['구독 결제 알림', '카드 명세서 메일'])
                  }
                  className="text-[11px] font-semibold text-[#3182F6]"
                >
                  목록 초기화
                </button>
              )}
            </div>
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-[#E5E8EB] bg-white px-3.5 py-2.5"
              >
                <span className="text-xs font-semibold text-[#191F28]">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#F2F4F6] px-2 py-1 text-[11px] font-semibold text-[#4E5968] hover:bg-[#FEECEC] hover:text-[#F04452]"
                >
                  <Trash2 className="h-3 w-3" />
                  삭제
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-1">
            {snackOpen ? (
              <div className="flex w-full items-center justify-between rounded-2xl bg-[#191F28] px-3.5 py-2.5 text-xs text-white shadow-lg">
                <span className="font-medium">삭제했어요</span>
                <button
                  type="button"
                  onClick={handleUndo}
                  className="font-bold text-[#5C9DFF] hover:text-[#8AB9FF]"
                >
                  되돌리기
                </button>
              </div>
            ) : (
              <span className="text-[11px] text-[#8B95A1]">
                삭제 버튼을 눌러 스낵바를 확인하세요
              </span>
            )}
          </div>
        </div>
      </DeviceShell>
    </DualVsGrid>
  );
}
