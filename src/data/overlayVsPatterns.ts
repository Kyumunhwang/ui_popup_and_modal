export type PatternId =
  | 'popup-vs-modal'
  | 'toast-vs-snackbar'
  | 'tooltip-vs-popover'
  | 'bottomsheet-vs-drawer'
  | 'banner-vs-push'
  | 'badge-vs-dot'
  | 'onboarding-vs-coachmark'
  | 'dim-vs-blur'
  | 'alert-vs-toast';

export interface CodeVariant {
  react: string;
  vanilla: string;
}

export interface PatternSideInfo {
  label: string;
  englishLabel: string;
  badge: string;
  summary: string;
  whenToUse: string[];
  code: CodeVariant;
}

export interface ComparisonRow {
  criterion: string;
  aValue: string;
  bValue: string;
}

export interface OverlayVsPattern {
  id: PatternId;
  number: string;
  title: string;
  englishTitle: string;
  tagline: string;
  sideA: PatternSideInfo;
  sideB: PatternSideInfo;
  comparisonTable: ComparisonRow[];
  cautionTip: string;
}

export const OVERLAY_VS_PATTERNS: OverlayVsPattern[] = [
  {
    id: 'popup-vs-modal',
    number: '01',
    title: '팝업 vs 모달',
    englishTitle: 'Popup vs Modal',
    tagline: '배경 화면의 조작을 허용하느냐(Non-blocking), 완전히 차단하느냐(Blocking)의 차이입니다.',
    sideA: {
      label: '팝업',
      englishLabel: 'Popup',
      badge: '비차단형 (Non-blocking)',
      summary: '기존 화면 위에 가볍게 떠서 부가 정보나 프로모션을 보여주며, 배경 스크롤·클릭을 막지 않습니다.',
      whenToUse: [
        '이벤트 공지, 오늘 그만 보기 등 선택적 안내',
        '본문 탐색 흐름을 끊지 않아야 하는 플로팅 카드',
        '사용자가 무시하더라도 작업 완료에 지장이 없을 때',
      ],
      code: {
        react: `import { useState } from 'react';
import { X } from 'lucide-react';

export function FloatingPopup() {
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#3182F6] px-4 py-2.5 text-sm font-semibold text-white"
      >
        혜택 팝업 다시 열기
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="프로모션 팝업"
      className="fixed bottom-5 right-5 z-40 w-80 rounded-2xl border border-[#E5E8EB] bg-white p-5 shadow-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded-full bg-[#E8F3FF] px-2.5 py-0.5 text-xs font-semibold text-[#3182F6]">
            새 기능 안내
          </span>
          <h3 className="mt-2 text-base font-bold text-[#191F28]">
            자동 이체 알림이 추가됐어요
          </h3>
          <p className="mt-1 text-sm text-[#4E5968]">
            배경 화면을 계속 탐색하면서 언제든 확인할 수 있어요.
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="팝업 닫기"
          className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={() => setOpen(false)}
          className="text-xs font-medium text-[#8B95A1] hover:text-[#4E5968]"
        >
          오늘 하루 보지 않기
        </button>
        <button
          onClick={() => setOpen(false)}
          className="rounded-xl bg-[#3182F6] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div id="floatingPopup" class="popup-card" role="region" aria-label="프로모션 팝업">
  <div class="popup-header">
    <span class="popup-badge">새 기능 안내</span>
    <button type="button" class="popup-close" onclick="closePopup()" aria-label="팝업 닫기">✕</button>
  </div>
  <h3 class="popup-title">자동 이체 알림이 추가됐어요</h3>
  <p class="popup-desc">배경 화면을 계속 탐색하면서 언제든 확인할 수 있어요.</p>
  <div class="popup-actions">
    <button type="button" class="btn-ghost" onclick="closePopup()">오늘 그만 보기</button>
    <button type="button" class="btn-primary" onclick="closePopup()">자세히 보기</button>
  </div>
</div>

<style>
  .popup-card {
    position: fixed; right: 20px; bottom: 20px; width: 320px;
    background: #fff; border: 1px solid #e5e8eb; border-radius: 18px;
    padding: 20px; box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
    font-family: Pretendard, sans-serif; z-index: 40;
  }
  .popup-header { display: flex; justify-content: space-between; align-items: center; }
  .popup-badge { background: #e8f3ff; color: #3182f6; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 999px; }
  .popup-close { background: none; border: none; color: #8b95a1; cursor: pointer; font-size: 16px; }
  .popup-title { margin: 10px 0 4px; font-size: 16px; color: #191f28; }
  .popup-desc { margin: 0; font-size: 14px; color: #4e5968; line-height: 1.5; }
  .popup-actions { margin-top: 16px; display: flex; justify-content: space-between; align-items: center; }
  .btn-ghost { background: none; border: none; color: #8b95a1; font-size: 12px; cursor: pointer; }
  .btn-primary { background: #3182f6; color: #fff; border: none; border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 600; cursor: pointer; }
</style>

<script>
  function closePopup() {
    document.getElementById('floatingPopup').style.display = 'none';
  }
</script>`,
      },
    },
    sideB: {
      label: '모달',
      englishLabel: 'Modal',
      badge: '차단형 (Blocking)',
      summary: '배경에 딤(Dim)을 깔아 뒤쪽 인터랙션을 차단하고, 사용자의 명시적 결정이나 입력을 요구합니다.',
      whenToUse: [
        '송금 최종 확인, 결제 승인 등 되돌리기 어려운 결정',
        '본문 맥락을 잠시 멈추고 집중 입력이 필요한 폼',
        '사용자가 반드시 응답해야 다음 단계로 진행 가능한 경우',
      ],
      code: {
        react: `import { useEffect, useState } from 'react';

export function ConfirmModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#3182F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1B64DA]"
      >
        송금 진행하기
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl"
          >
            <h3 id="modal-title" className="text-lg font-bold text-[#191F28]">
              김토스님께 50,000원을 보낼까요?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4E5968]">
              송금 완료 후에는 즉시 취소할 수 없으니 계좌와 금액을 다시 한 번 확인해 주세요.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#F2F4F6] py-3 text-sm font-semibold text-[#4E5968] hover:bg-[#E5E8EB]"
              >
                취소
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-[#3182F6] py-3 text-sm font-semibold text-white hover:bg-[#1B64DA]"
              >
                보내기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="trigger-btn" onclick="openModal()">송금 진행하기</button>

<div id="modalBackdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle" hidden>
  <div class="modal-box" onclick="event.stopPropagation()">
    <h3 id="modalTitle" class="modal-title">김토스님께 50,000원을 보낼까요?</h3>
    <p class="modal-desc">송금 완료 후에는 즉시 취소할 수 없으니 계좌와 금액을 확인해 주세요.</p>
    <div class="modal-actions">
      <button type="button" class="btn-cancel" onclick="closeModal()">취소</button>
      <button type="button" class="btn-confirm" onclick="closeModal()">보내기</button>
    </div>
  </div>
</div>

<style>
  .trigger-btn { background: #3182f6; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 50; }
  .modal-backdrop[hidden] { display: none; }
  .modal-box { width: 100%; max-width: 360px; background: #fff; border-radius: 24px; padding: 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); }
  .modal-title { margin: 0; font-size: 18px; color: #191f28; }
  .modal-desc { margin: 8px 0 0; font-size: 14px; color: #4e5968; line-height: 1.5; }
  .modal-actions { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .btn-cancel { background: #f2f4f6; color: #4e5968; border: none; border-radius: 14px; padding: 12px; font-weight: 600; cursor: pointer; }
  .btn-confirm { background: #3182f6; color: #fff; border: none; border-radius: 14px; padding: 12px; font-weight: 600; cursor: pointer; }
</style>

<script>
  const backdrop = document.getElementById('modalBackdrop');
  function openModal() { backdrop.hidden = false; }
  function closeModal() { backdrop.hidden = true; }
  backdrop.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '배경 조작 가능 여부', aValue: '가능 (스크롤/클릭 유지)', bValue: '차단 (배경 딤 및 포커스 트랩)' },
      { criterion: '주 사용 목적', aValue: '부가 정보·이벤트·가벼운 안내', bValue: '중요 의사결정·필수 입력·경고' },
      { criterion: '닫기 방식', aValue: '닫기(X) 또는 자연스러운 무시', bValue: 'CTA 선택, ESC, 백드롭 클릭' },
      { criterion: '접근성 역할', aValue: 'role="region" / 비모달', bValue: 'role="dialog" aria-modal="true"' },
    ],
    cautionTip: '단순 공지나 마케팅 배너에 모달을 남발하면 사용자가 핵심 과업을 진행하지 못해 이탈률이 급상승합니다. 반드시 응답이 필요한 순간에만 모달을 쓰세요.',
  },
  {
    id: 'toast-vs-snackbar',
    number: '02',
    title: '토스트 vs 스낵바',
    englishTitle: 'Toast vs Snackbar',
    tagline: '단순 결과만 알려주고 사라지면 토스트, "되돌리기" 같은 후속 액션 버튼이 있으면 스낵바입니다.',
    sideA: {
      label: '토스트',
      englishLabel: 'Toast',
      badge: '단순 피드백 · 액션 없음',
      summary: '작업 완료나 상태 변화를 짧게 알린 뒤 2~3초 후 자동으로 사라집니다. 별도 액션 버튼을 두지 않습니다.',
      whenToUse: [
        '클립보드 복사 완료, 저장 완료 등 가벼운 성공 피드백',
        '사용자의 즉각적인 되돌리기나 추가 조치가 불필요할 때',
        '화면 흐름을 전혀 방해하지 않고 상태만 알리고 싶을 때',
      ],
      code: {
        react: `import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function SimpleToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <div className="relative">
      <button
        onClick={() => setVisible(true)}
        className="rounded-xl bg-[#3182F6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1B64DA]"
      >
        계좌번호 복사하기
      </button>

      {visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#191F28]/95 px-4 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 className="h-4 w-4 text-[#3182F6]" />
          <span>계좌번호를 복사했어요</span>
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="copy-btn" onclick="showToast('계좌번호를 복사했어요')">계좌번호 복사하기</button>
<div id="toast" class="toast" role="status" aria-live="polite"></div>

<style>
  .copy-btn { background: #3182f6; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .toast {
    position: fixed; left: 50%; bottom: 24px; transform: translate(-50%, 12px);
    background: rgba(25, 31, 40, 0.94); color: #fff; padding: 10px 18px;
    border-radius: 999px; font-size: 14px; font-weight: 500;
    opacity: 0; pointer-events: none; transition: all 0.2s ease;
  }
  .toast.show { opacity: 1; transform: translate(-50%, 0); }
</style>

<script>
  let toastTimer;
  function showToast(message) {
    const el = document.getElementById('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2500);
  }
</script>`,
      },
    },
    sideB: {
      label: '스낵바',
      englishLabel: 'Snackbar',
      badge: '피드백 + 1개 액션 버튼',
      summary: '짧은 알림 메시지와 함께 "되돌리기", "다시 시도" 등 1개의 인라인 액션 버튼을 제공합니다.',
      whenToUse: [
        '메모/항목 삭제 직후 "되돌리기(Undo)" 기회를 줄 때',
        '네트워크 요청 실패 후 "다시 시도" 액션을 제공할 때',
        '방금 실행한 작업의 상세 화면으로 즉시 이동할 때',
      ],
      code: {
        react: `import { useEffect, useState } from 'react';

export function UndoSnackbar() {
  const [deleted, setDeleted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 4000);
    return () => clearTimeout(timer);
  }, [open]);

  const handleDelete = () => {
    setDeleted(true);
    setOpen(true);
  };

  const handleUndo = () => {
    setDeleted(false);
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="rounded-xl bg-[#F2F4F6] px-4 py-2.5 text-sm font-semibold text-[#191F28] hover:bg-[#E5E8EB]"
      >
        {deleted ? '항목이 삭제됨 (다시 테스트)' : '선택한 항목 삭제'}
      </button>

      {open && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-[#191F28] px-4 py-3 text-sm text-white shadow-xl"
        >
          <span>삭제했어요</span>
          <button
            onClick={handleUndo}
            className="font-semibold text-[#5C9DFF] hover:text-[#8AB9FF]"
          >
            되돌리기
          </button>
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="del-btn" onclick="deleteItem()">선택한 항목 삭제</button>
<div id="snackbar" class="snackbar" role="status" aria-live="polite" hidden>
  <span>삭제했어요</span>
  <button type="button" class="undo-btn" onclick="undoDelete()">되돌리기</button>
</div>

<style>
  .del-btn { background: #f2f4f6; color: #191f28; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .snackbar {
    position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%);
    display: flex; align-items: center; gap: 16px;
    background: #191f28; color: #fff; padding: 12px 18px; border-radius: 14px;
    font-size: 14px; box-shadow: 0 10px 24px rgba(0,0,0,0.2);
  }
  .snackbar[hidden] { display: none; }
  .undo-btn { background: none; border: none; color: #5c9dff; font-weight: 700; cursor: pointer; }
</style>

<script>
  let snackbarTimer;
  function deleteItem() {
    const bar = document.getElementById('snackbar');
    bar.hidden = false;
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(() => { bar.hidden = true; }, 4000);
  }
  function undoDelete() {
    document.getElementById('snackbar').hidden = true;
    alert('삭제를 되돌렸습니다.');
  }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '액션 버튼 포함', aValue: '없음 (텍스트·아이콘만)', bValue: '있음 (보통 1개의 핵심 액션)' },
      { criterion: '표시 시간', aValue: '짧음 (2~3초)', bValue: '조금 더 김 (4~5초, 클릭 시간 보장)' },
      { criterion: '동시 노출', aValue: '스택 또는 순차 교체', bValue: '화면 하단 단일 노출 권장' },
      { criterion: '대표 문구', aValue: '"복사했어요", "저장되었어요"', bValue: '"삭제했어요 · 되돌리기"' },
    ],
    cautionTip: '토스트 안에 링크나 버튼을 넣으면 사용자가 누르기 전에 사라져 버려 접근성 문제가 생깁니다. 클릭이 필요하면 스낵바로 설계하고 노출 시간을 4초 이상 확보하세요.',
  },
  {
    id: 'tooltip-vs-popover',
    number: '03',
    title: '툴팁 vs 팝오버',
    englishTitle: 'Tooltip vs Popover',
    tagline: '짧은 텍스트 힌트를 호버/포커스로 띄우면 툴팁, 클릭 시 버튼·폼 등 인터랙티브 요소를 담으면 팝오버입니다.',
    sideA: {
      label: '툴팁',
      englishLabel: 'Tooltip',
      badge: 'Hover / Focus · 읽기 전용',
      summary: '아이콘이나 용어 옆에 짧은 보조 설명(1~2줄)만 띄우며, 내부에 클릭 가능한 버튼을 두지 않습니다.',
      whenToUse: [
        '아이콘 버튼의 의미 설명 (예: "필터 초기화")',
        '전문 용어에 대한 짧은 한 줄 정의 제공',
        '마우스 호버 또는 키보드 포커스 시 가볍게 보여줄 때',
      ],
      code: {
        react: `import { useState } from 'react';
import { Info } from 'lucide-react';

export function InfoTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center gap-1.5">
      <span className="text-sm font-medium text-[#191F28]">예상 수익률</span>
      <button
        type="button"
        aria-describedby="yield-tooltip"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      {open && (
        <div
          id="yield-tooltip"
          role="tooltip"
          className="absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-xl bg-[#191F28] px-3 py-2 text-xs leading-relaxed text-white shadow-lg"
        >
          최근 1년 기준 세전 연환산 수익률이며 시장 상황에 따라 달라질 수 있어요.
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="tooltip-wrap">
  <span>예상 수익률</span>
  <button type="button" class="info-icon" aria-describedby="tipText">i</button>
  <div id="tipText" class="tooltip-bubble" role="tooltip">
    최근 1년 기준 세전 연환산 수익률이에요.
  </div>
</div>

<style>
  .tooltip-wrap { position: relative; display: inline-flex; align-items: center; gap: 6px; }
  .info-icon { width: 20px; height: 20px; border-radius: 50%; border: none; background: #f2f4f6; color: #4e5968; font-weight: 700; cursor: pointer; }
  .tooltip-bubble {
    position: absolute; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
    width: 210px; background: #191f28; color: #fff; font-size: 12px; line-height: 1.45;
    padding: 8px 12px; border-radius: 10px; opacity: 0; pointer-events: none; transition: opacity 0.15s;
  }
  .info-icon:hover + .tooltip-bubble,
  .info-icon:focus + .tooltip-bubble { opacity: 1; }
</style>`,
      },
    },
    sideB: {
      label: '팝오버',
      englishLabel: 'Popover',
      badge: 'Click 트리거 · 인터랙티브',
      summary: '앵커 요소를 클릭하면 열리며, 내부에 버튼·링크·체크박스 같은 대화형 컨트롤을 포함할 수 있습니다.',
      whenToUse: [
        '"더보기(...)" 메뉴, 정렬/필터 옵션 선택',
        '설명 + "자세히 보기" 버튼이 함께 들어가는 컨텍스트 카드',
        '모바일 터치 환경에서도 안정적으로 열고 닫아야 할 때',
      ],
      code: {
        react: `import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

export function ActionPopover() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute right-0 top-full z-30 mt-2 w-60 rounded-2xl border border-[#E5E8EB] bg-white p-4 shadow-xl"
        >
          <p className="text-sm font-bold text-[#191F28]">계좌 빠른 관리</p>
          <p className="mt-1 text-xs text-[#4E5968]">
            자주 쓰는 계좌 별칭을 바꾸거나 알림을 켤 수 있어요.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-3 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white hover:bg-[#1B64DA]"
          >
            별칭 수정하기
          </button>
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="popover-wrap" id="popoverWrap">
  <button type="button" class="more-btn" id="popoverTrigger" aria-expanded="false">•••</button>
  <div class="popover-panel" id="popoverPanel" hidden>
    <p class="popover-title">계좌 빠른 관리</p>
    <p class="popover-desc">자주 쓰는 계좌 별칭을 수정하거나 알림을 설정하세요.</p>
    <button type="button" class="popover-cta" onclick="togglePopover(false)">별칭 수정하기</button>
  </div>
</div>

<style>
  .popover-wrap { position: relative; display: inline-block; }
  .more-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: #f2f4f6; cursor: pointer; }
  .popover-panel {
    position: absolute; right: 0; top: calc(100% + 8px); width: 240px;
    background: #fff; border: 1px solid #e5e8eb; border-radius: 16px;
    padding: 16px; box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  }
  .popover-panel[hidden] { display: none; }
  .popover-title { margin: 0; font-size: 14px; font-weight: 700; color: #191f28; }
  .popover-desc { margin: 4px 0 12px; font-size: 12px; color: #4e5968; }
  .popover-cta { width: 100%; background: #3182f6; color: #fff; border: none; border-radius: 10px; padding: 8px; font-size: 12px; font-weight: 600; cursor: pointer; }
</style>

<script>
  const trigger = document.getElementById('popoverTrigger');
  const panel = document.getElementById('popoverPanel');
  function togglePopover(force) {
    const next = typeof force === 'boolean' ? force : panel.hidden;
    panel.hidden = !next;
    trigger.setAttribute('aria-expanded', String(next));
  }
  trigger.addEventListener('click', () => togglePopover());
  document.addEventListener('click', (e) => {
    if (!document.getElementById('popoverWrap').contains(e.target)) togglePopover(false);
  });
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '트리거 방식', aValue: 'Hover / Focus (모바일은 보조)', bValue: 'Click / Tap (명시적 토글)' },
      { criterion: '내부 인터랙션', aValue: '불가 (순수 텍스트만)', bValue: '가능 (버튼, 링크, 필터 폼 등)' },
      { criterion: '정보 분량', aValue: '1~2줄의 아주 짧은 설명', bValue: '제목, 본문, 액션이 결합된 카드' },
      { criterion: '모바일 적합성', aValue: '호버가 없어 터치 대응 필요', bValue: '모바일에서도 직관적으로 동작' },
    ],
    cautionTip: '모바일 환경에는 마우스 호버(Hover)가 없습니다. 모바일 사용자에게 꼭 전달해야 할 상세 설명이나 버튼이 있다면 툴팁 대신 팝오버나 바텀시트를 사용하세요.',
  },
  {
    id: 'bottomsheet-vs-drawer',
    number: '04',
    title: '바텀시트 vs 드로어',
    englishTitle: 'Bottom sheet vs Drawer',
    tagline: '모바일 엄지손가락 반경에서 빠르게 선택할 땐 바텀시트, 계층형 메뉴·필터 패널을 넓게 열 땐 드로어입니다.',
    sideA: {
      label: '바텀시트',
      englishLabel: 'Bottom Sheet',
      badge: '하단 슬라이드 · 모바일 최적화',
      summary: '화면 아래에서 위로 올라오는 시트로, 한 손 조작 시 엄지손가락으로 즉시 선택·닫기가 가능합니다.',
      whenToUse: [
        '모바일 결제 수단 선택, 은행/통신사 선택 목록',
        '간단한 동의 체크 및 확인 단계',
        '현재 화면의 맥락을 유지하면서 빠른 선택을 받을 때',
      ],
      code: {
        react: `import { useState } from 'react';

const BANKS = ['토스뱅크', '국민은행', '신한은행', '우리은행'];

export function BankBottomSheet() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('토스뱅크');

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-[#E5E8EB] bg-white px-4 py-2.5 text-sm font-semibold text-[#191F28]"
      >
        은행 선택: {selected}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-white px-5 pb-7 pt-3 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#D1D6DB]" />
            <h3 className="text-lg font-bold text-[#191F28]">어느 은행으로 보낼까요?</h3>
            <ul className="mt-4 space-y-1.5">
              {BANKS.map((bank) => (
                <li key={bank}>
                  <button
                    onClick={() => {
                      setSelected(bank);
                      setOpen(false);
                    }}
                    className={\`w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold transition \${
                      selected === bank
                        ? 'bg-[#E8F3FF] text-[#3182F6]'
                        : 'text-[#191F28] hover:bg-[#F2F4F6]'
                    }\`}
                  >
                    {bank}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="select-btn" onclick="openSheet()">은행 선택하기</button>
<div id="sheetBackdrop" class="sheet-backdrop" hidden onclick="closeSheet()">
  <div class="sheet-panel" onclick="event.stopPropagation()">
    <div class="sheet-handle"></div>
    <h3 class="sheet-title">어느 은행으로 보낼까요?</h3>
    <button type="button" class="sheet-item" onclick="pickBank('토스뱅크')">토스뱅크</button>
    <button type="button" class="sheet-item" onclick="pickBank('국민은행')">국민은행</button>
    <button type="button" class="sheet-item" onclick="pickBank('신한은행')">신한은행</button>
  </div>
</div>

<style>
  .select-btn { background: #fff; border: 1px solid #e5e8eb; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .sheet-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: flex-end; justify-content: center; z-index: 50; }
  .sheet-backdrop[hidden] { display: none; }
  .sheet-panel { width: 100%; max-width: 440px; background: #fff; border-radius: 24px 24px 0 0; padding: 12px 20px 28px; }
  .sheet-handle { width: 40px; height: 4px; background: #d1d6db; border-radius: 999px; margin: 0 auto 16px; }
  .sheet-title { margin: 0 0 12px; font-size: 18px; color: #191f28; }
  .sheet-item { display: block; width: 100%; text-align: left; background: none; border: none; border-radius: 14px; padding: 12px 14px; font-size: 15px; font-weight: 600; cursor: pointer; }
  .sheet-item:hover { background: #e8f3ff; color: #3182f6; }
</style>

<script>
  function openSheet() { document.getElementById('sheetBackdrop').hidden = false; }
  function closeSheet() { document.getElementById('sheetBackdrop').hidden = true; }
  function pickBank(name) { alert(name + ' 선택됨'); closeSheet(); }
</script>`,
      },
    },
    sideB: {
      label: '드로어',
      englishLabel: 'Drawer',
      badge: '측면 슬라이드 · 전체 높이',
      summary: '화면 좌측 또는 우측에서 세로 전체 높이로 슬라이드 인 되며, 다단계 메뉴·상세 필터·장바구니에 적합합니다.',
      whenToUse: [
        '사이드 네비게이션 메뉴(햄버거 메뉴)',
        '쇼핑몰/대시보드의 다중 필터 및 상세 설정 패널',
        '장바구니, 알림 히스토리 등 스크롤 양이 많은 보조 패널',
      ],
      code: {
        react: `import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MENUS = ['홈 대시보드', '내 자산 관리', '카드 혜택', '고객센터'];

export function SideDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-[#191F28] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <Menu className="h-4 w-4" />
        메뉴 열기
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-72 flex-col justify-between bg-white p-6 shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#191F28]">전체 메뉴</span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="드로어 닫기"
                  className="rounded-lg p-1 text-[#8B95A1] hover:bg-[#F2F4F6]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-6 space-y-1">
                {MENUS.map((item) => (
                  <button
                    key={item}
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-[#4E5968] hover:bg-[#F2F4F6] hover:text-[#191F28]"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#3182F6] py-2.5 text-sm font-semibold text-white"
            >
              닫기
            </button>
          </aside>
        </div>
      )}
    </>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="menu-btn" onclick="openDrawer()">메뉴 열기</button>
<div id="drawerBackdrop" class="drawer-backdrop" hidden onclick="closeDrawer()">
  <aside class="drawer-panel" onclick="event.stopPropagation()">
    <div class="drawer-top">
      <strong>전체 메뉴</strong>
      <button type="button" onclick="closeDrawer()">✕</button>
    </div>
    <nav class="drawer-nav">
      <a href="#home">홈 대시보드</a>
      <a href="#assets">내 자산 관리</a>
      <a href="#benefits">카드 혜택</a>
      <a href="#support">고객센터</a>
    </nav>
  </aside>
</div>

<style>
  .menu-btn { background: #191f28; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; justify-content: flex-end; z-index: 50; }
  .drawer-backdrop[hidden] { display: none; }
  .drawer-panel { width: 280px; height: 100%; background: #fff; padding: 24px; box-sizing: border-box; box-shadow: -8px 0 30px rgba(0,0,0,0.15); }
  .drawer-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
  .drawer-top button { background: none; border: none; font-size: 16px; cursor: pointer; }
  .drawer-nav a { display: block; padding: 10px 12px; border-radius: 10px; color: #4e5968; text-decoration: none; font-weight: 500; }
  .drawer-nav a:hover { background: #f2f4f6; color: #191f28; }
</style>

<script>
  function openDrawer() { document.getElementById('drawerBackdrop').hidden = false; }
  function closeDrawer() { document.getElementById('drawerBackdrop').hidden = true; }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '진입 방향', aValue: '하단 → 상단 (Bottom-to-Top)', bValue: '좌/우 측면 (Side-to-Side)' },
      { criterion: '한 손 조작성', aValue: '매우 우수 (엄지 영역)', bValue: '보통 (상단 메뉴 접근 필요)' },
      { criterion: '적합한 콘텐츠', aValue: '선택 목록, 공유 시트, 짧은 폼', bValue: '네비게이션, 다중 필터, 장바구니' },
      { criterion: '데스크톱 대응', aValue: '중앙 모달/팝오버로 전환 권장', bValue: '웹에서도 사이드 패널로 자연스러움' },
    ],
    cautionTip: '데스크톱 넓은 화면에 풀-폭 바텀시트를 띄우면 시선 이동이 어색합니다. 반응형 웹에서는 모바일은 바텀시트, 데스크톱은 모달이나 드로어로 분기하는 것이 정석입니다.',
  },
  {
    id: 'banner-vs-push',
    number: '05',
    title: '배너 vs 푸시 알림',
    englishTitle: 'Banner vs Push',
    tagline: '앱 내부 흐름 속에 고정되어 공지를 띄우면 배너, OS 잠금화면·상단바를 통해 앱 밖에서 깨우면 푸시 알림입니다.',
    sideA: {
      label: '배너',
      englishLabel: 'Banner',
      badge: '인앱(In-App) · 상시/조건부 노출',
      summary: '앱이나 웹 페이지 상단/영역 내에 자리 잡아 시스템 점검, 중요 공지, 프로모션을 지속적으로 알립니다.',
      whenToUse: [
        '서비스 점검 안내, 필수 약관 업데이트 공지',
        '현재 페이지와 관련된 할인/이벤트 안내',
        '사용자가 앱을 사용 중일 때 흐름을 끊지 않는 공지',
      ],
      code: {
        react: `import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

export function TopNoticeBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#E8F3FF] px-4 py-3 text-sm text-[#191F28]">
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3182F6] text-white">
          <Megaphone className="h-3.5 w-3.5" />
        </span>
        <p className="font-medium">
          <strong className="font-bold text-[#1B64DA]">은행 점검 안내</strong> · 오늘 새벽 00:30~01:00 이체가 제한돼요.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="배너 닫기"
        className="rounded-lg p-1 text-[#4E5968] hover:bg-[#3182F6]/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div id="noticeBanner" class="banner" role="region" aria-label="공지 배너">
  <div class="banner-content">
    <span class="banner-tag">공지</span>
    <span>오늘 새벽 00:30~01:00 은행 점검으로 이체가 잠시 제한돼요.</span>
  </div>
  <button type="button" class="banner-close" onclick="this.parentElement.remove()" aria-label="닫기">✕</button>
</div>

<style>
  .banner {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    background: #e8f3ff; color: #191f28; padding: 12px 16px; border-radius: 14px; font-size: 14px;
  }
  .banner-content { display: flex; align-items: center; gap: 8px; }
  .banner-tag { background: #3182f6; color: #fff; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; }
  .banner-close { background: none; border: none; color: #4e5968; cursor: pointer; }
</style>`,
      },
    },
    sideB: {
      label: '푸시 알림',
      englishLabel: 'Push Notification',
      badge: 'OS 레벨 · 앱 외부 호출',
      summary: '사용자가 앱을 보지 않을 때도 OS 알림 센터나 잠금화면에 나타나 즉각적인 재진입을 유도합니다.',
      whenToUse: [
        '실시간 입출금, 보안 로그인 등 시급한 상태 알림',
        '채팅 메시지, 배송 출발 등 외부 이벤트 전달',
        'Web Push API / 모바일 푸시로 앱 복귀가 필요할 때',
      ],
      code: {
        react: `import { useState } from 'react';
import { BellRing } from 'lucide-react';

export function WebPushSimulator() {
  const [status, setStatus] = useState('대기 중');

  const triggerNotification = async () => {
    if (!('Notification' in window)) {
      setStatus('이 브라우저는 Web Notification을 지원하지 않습니다.');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification('입금 120,000원', {
        body: '김토스님이 급여 계좌로 보냈어요.',
      });
      setStatus('OS 푸시 알림을 발송했어요.');
    } else {
      setStatus('알림 권한이 허용되지 않았어요.');
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={triggerNotification}
        className="inline-flex items-center gap-2 rounded-xl bg-[#191F28] px-4 py-2.5 text-sm font-semibold text-white"
      >
        <BellRing className="h-4 w-4 text-[#3182F6]" />
        OS 푸시 알림 테스트
      </button>
      <p className="text-xs text-[#4E5968]">상태: {status}</p>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="push-btn" onclick="sendPush()">OS 푸시 알림 보내기</button>

<style>
  .push-btn { background: #191f28; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
</style>

<script>
  async function sendPush() {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림 API를 지원하지 않습니다.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      new Notification('입금 120,000원', { body: '김토스님이 계좌로 송금했어요.' });
    }
  }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '노출 위치', aValue: '앱/웹 페이지 내부 레이아웃', bValue: 'OS 잠금화면, 상단 알림 센터' },
      { criterion: '사전 권한 필요', aValue: '불필요 (즉시 노출)', bValue: '필수 (알림 수신 동의 필요)' },
      { criterion: '적합한 타이밍', aValue: '사용자가 서비스 이용 중일 때', bValue: '사용자가 서비스 밖에 있을 때' },
      { criterion: '피로도 위험', aValue: '낮음 (레이아웃 내 정적 배치)', bValue: '높음 (과도 시 알림 차단·앱 삭제)' },
    ],
    cautionTip: '푸시 알림은 사용자의 집중을 강제로 깨우는 강력한 채널입니다. 마케팅 푸시를 과도하게 보내면 OS 알림 자체를 꺼버려 정작 중요한 보안/입금 알림까지 놓치게 됩니다.',
  },
  {
    id: 'badge-vs-dot',
    number: '06',
    title: '배지 vs 닷',
    englishTitle: 'Badge vs Dot',
    tagline: '정확한 미확인 개수("3", "99+")가 중요할 땐 숫자 배지, 단순히 새 소식의 존재 여부만 알릴 땐 닷을 씁니다.',
    sideA: {
      label: '배지',
      englishLabel: 'Badge',
      badge: '정량적 알림 · 숫자 표기',
      summary: '읽지 않은 메시지나 처리해야 할 할 일의 정확한 개수를 숫자로 표시해 우선순위를 전달합니다.',
      whenToUse: [
        '읽지 않은 채팅/쪽지 개수, 승인 대기 건수',
        '장바구니에 담긴 상품 수량 표시',
        '99개 초과 시 "99+" 형태로 레이아웃 붕괴 방지',
      ],
      code: {
        react: `import { useState } from 'react';
import { Bell } from 'lucide-react';

export function CounterBadge() {
  const [count, setCount] = useState(3);
  const display = count > 99 ? '99+' : count;

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setCount(0)}
        className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3FF] text-[#3182F6]"
      >
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F04452] px-1.5 text-[11px] font-bold text-white ring-2 ring-white">
            {display}
          </span>
        )}
      </button>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="rounded-xl bg-[#F2F4F6] px-3 py-1.5 text-xs font-semibold text-[#4E5968]"
      >
        알림 +1
      </button>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="badge-icon-box" onclick="resetBadge()">
  <span>🔔</span>
  <span id="badgeCount" class="count-badge">3</span>
</div>

<style>
  .badge-icon-box {
    position: relative; width: 48px; height: 48px; border-radius: 16px;
    background: #e8f3ff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .count-badge {
    position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px;
    border-radius: 999px; background: #f04452; color: #fff; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; border: 2px solid #fff;
  }
</style>

<script>
  function resetBadge() {
    document.getElementById('badgeCount').style.display = 'none';
  }
</script>`,
      },
    },
    sideB: {
      label: '닷',
      englishLabel: 'Dot',
      badge: '상태 표시 · 최소 시각 노이즈',
      summary: '숫자 없이 작은 원형 점(Dot)으로 "새로운 업데이트가 있음"만 은은하게 알려 시각적 피로를 줄입니다.',
      whenToUse: [
        '하단 탭바의 "혜택", "전체" 탭의 신규 업데이트 표기',
        '개수를 세는 것이 무의미한 피드/공지 새 글 알림',
        '좁은 공간에 숫자 배지를 넣기 부담스러울 때',
      ],
      code: {
        react: `import { useState } from 'react';
import { Gift } from 'lucide-react';

export function NotificationDot() {
  const [hasNew, setHasNew] = useState(true);

  return (
    <button
      onClick={() => setHasNew(false)}
      className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F3FF] text-[#3182F6]"
      aria-label={hasNew ? '새 혜택이 있습니다' : '혜택'}
    >
      <Gift className="h-5 w-5" />
      {hasNew && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#F04452] ring-2 ring-white" />
      )}
    </button>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="dot-icon-box" onclick="clearDot()" aria-label="새 혜택 있음">
  <span>🎁</span>
  <span id="statusDot" class="status-dot"></span>
</button>

<style>
  .dot-icon-box {
    position: relative; width: 48px; height: 48px; border-radius: 16px; border: none;
    background: #e8f3ff; display: inline-flex; align-items: center; justify-content: center; cursor: pointer;
  }
  .status-dot {
    position: absolute; top: -2px; right: -2px; width: 10px; height: 10px;
    border-radius: 50%; background: #f04452; border: 2px solid #fff;
  }
</style>

<script>
  function clearDot() {
    document.getElementById('statusDot').style.display = 'none';
  }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '전달 정보', aValue: '정확한 미확인 개수 (3, 12, 99+)', bValue: '새 상태 존재 여부 (유/무)' },
      { criterion: '시각적 긴급도', aValue: '높음 (숫자가 클수록 압박감)', bValue: '낮음 (가볍고 깔끔한 유도)' },
      { criterion: '적합한 영역', aValue: '채팅 목록, 할 일, 장바구니', bValue: '하단 탭바, 설정 메뉴, 새 피드' },
      { criterion: '소멸 조건', aValue: '읽음 처리 시 개수 감소', bValue: '해당 탭 진입 시 즉시 제거' },
    ],
    cautionTip: '모든 탭에 숫자 배지를 붙이면 "99+"가 쌓여 사용자가 오히려 알림을 포기하게 됩니다. 직접 처리해야 할 건수만 배지로, 단순 탐색 유도는 닷으로 구분하세요.',
  },
  {
    id: 'onboarding-vs-coachmark',
    number: '07',
    title: '온보딩 vs 코치마크',
    englishTitle: 'Onboarding vs Coach mark',
    tagline: '서비스의 전체 가치와 흐름을 단계별로 소개하면 온보딩, 실제 화면 위 특정 버튼 하나를 콕 집어 안내하면 코치마크입니다.',
    sideA: {
      label: '온보딩',
      englishLabel: 'Onboarding',
      badge: '멀티 스텝 · 서비스 전체 가치',
      summary: '앱 첫 실행 시 2~4장의 스와이프 카드나 전체 화면으로 핵심 가치와 사용 방법을 부드럽게 전달합니다.',
      whenToUse: [
        '신규 가입 직후 앱의 핵심 기능 3가지 요약 소개',
        '권한 요청 전 왜 권한이 필요한지 맥락을 설명할 때',
        '건너뛰기(Skip) 버튼을 항상 함께 제공해야 할 때',
      ],
      code: {
        react: `import { useState } from 'react';

const STEPS = [
  { title: '1초 만에 계좌 조회', desc: '흩어진 모든 은행 계좌를 한눈에 모아보세요.' },
  { title: '수수료 없는 간편 송금', desc: '연락처만 알아도 무료로 바로 보낼 수 있어요.' },
  { title: '소비 패턴 자동 분석', desc: '매달 나가는 구독료와 지출을 똑똑하게 챙겨드려요.' },
];

export function OnboardingCarousel() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="w-full max-w-xs rounded-3xl border border-[#E5E8EB] bg-white p-6 text-center shadow-lg">
      <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#E8F3FF] text-2xl font-bold text-[#3182F6]">
        0{step + 1}
      </div>
      <h3 className="text-lg font-bold text-[#191F28]">{current.title}</h3>
      <p className="mt-2 text-sm text-[#4E5968]">{current.desc}</p>

      <div className="mt-5 flex justify-center gap-1.5">
        {STEPS.map((_, idx) => (
          <span
            key={idx}
            className={\`h-1.5 rounded-full transition-all \${
              idx === step ? 'w-5 bg-[#3182F6]' : 'w-1.5 bg-[#D1D6DB]'
            }\`}
          />
        ))}
      </div>

      <button
        onClick={() => setStep((prev) => (isLast ? 0 : prev + 1))}
        className="mt-6 w-full rounded-2xl bg-[#3182F6] py-3 text-sm font-semibold text-white hover:bg-[#1B64DA]"
      >
        {isLast ? '시작하기' : '다음'}
      </button>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="onboard-card">
  <h3 id="obTitle">1초 만에 계좌 조회</h3>
  <p id="obDesc">흩어진 모든 은행 계좌를 한눈에 모아보세요.</p>
  <div class="ob-dots" id="obDots"></div>
  <button type="button" class="ob-btn" onclick="nextOnboarding()">다음</button>
</div>

<style>
  .onboard-card { max-width: 300px; background: #fff; border: 1px solid #e5e8eb; border-radius: 24px; padding: 24px; text-align: center; }
  .ob-dots { display: flex; justify-content: center; gap: 6px; margin: 16px 0; }
  .ob-dot { width: 6px; height: 6px; border-radius: 999px; background: #d1d6db; }
  .ob-dot.active { width: 18px; background: #3182f6; }
  .ob-btn { width: 100%; background: #3182f6; color: #fff; border: none; border-radius: 14px; padding: 12px; font-weight: 600; cursor: pointer; }
</style>

<script>
  const steps = [
    { t: '1초 만에 계좌 조회', d: '흩어진 모든 은행 계좌를 한눈에 모아보세요.' },
    { t: '수수료 없는 간편 송금', d: '연락처만 알아도 무료로 바로 보낼 수 있어요.' },
    { t: '소비 패턴 자동 분석', d: '매달 지출을 자동으로 정리해 드려요.' }
  ];
  let idx = 0;
  function renderOb() {
    document.getElementById('obTitle').textContent = steps[idx].t;
    document.getElementById('obDesc').textContent = steps[idx].d;
    document.getElementById('obDots').innerHTML = steps
      .map((_, i) => \`<span class="ob-dot \${i === idx ? 'active' : ''}"></span>\`)
      .join('');
  }
  function nextOnboarding() { idx = (idx + 1) % steps.length; renderOb(); }
  renderOb();
</script>`,
      },
    },
    sideB: {
      label: '코치마크',
      englishLabel: 'Coach Mark',
      badge: '스포트라이트 · 특정 UI 지목',
      summary: '실제 화면을 어둡게 가리고 특정 버튼 하나만 밝게(Spotlight) 비춰 "여기를 눌러보세요"라고 직접 안내합니다.',
      whenToUse: [
        '대규모 개편 후 핵심 버튼 위치가 바뀌었을 때',
        '숨겨져 있기 쉬운 신규 제스처·단축 기능 안내',
        '최대 1~2개 포인트만 짧게 짚어주고 즉시 사용하게 할 때',
      ],
      code: {
        react: `import { useState } from 'react';
import { Plus } from 'lucide-react';

export function SpotlightCoachMark() {
  const [showGuide, setShowGuide] = useState(true);

  return (
    <div className="relative h-64 w-full max-w-xs overflow-hidden rounded-3xl border border-[#E5E8EB] bg-white p-5">
      <p className="text-sm font-bold text-[#191F28]">내 자산 홈</p>
      <p className="mt-1 text-xs text-[#8B95A1]">우측 하단 버튼으로 목표를 추가해 보세요.</p>

      {showGuide && (
        <div
          onClick={() => setShowGuide(false)}
          className="absolute inset-0 z-10 bg-black/60"
        />
      )}

      <div className="absolute bottom-5 right-5 z-20 flex flex-col items-end gap-2">
        {showGuide && (
          <div className="rounded-xl bg-white px-3 py-2 text-xs font-semibold text-[#191F28] shadow-lg">
            여기예요! 눌러서 새 목표 만들기
          </div>
        )}
        <button
          onClick={() => setShowGuide((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3182F6] text-white shadow-xl ring-4 ring-[#3182F6]/30"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="screen-box">
  <p>내 자산 홈</p>
  <div id="coachOverlay" class="coach-dim" onclick="dismissCoach()"></div>
  <div class="target-wrap">
    <div id="coachTip" class="coach-tip">여기예요! 눌러서 시작하기</div>
    <button type="button" class="fab-target" onclick="dismissCoach()">+</button>
  </div>
</div>

<style>
  .screen-box { position: relative; width: 280px; height: 220px; background: #fff; border-radius: 20px; padding: 20px; overflow: hidden; }
  .coach-dim { position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 10; }
  .target-wrap { position: absolute; right: 18px; bottom: 18px; z-index: 20; display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
  .coach-tip { background: #fff; color: #191f28; padding: 8px 12px; border-radius: 10px; font-size: 12px; font-weight: 700; }
  .fab-target { width: 48px; height: 48px; border-radius: 50%; border: none; background: #3182f6; color: #fff; font-size: 22px; box-shadow: 0 0 0 6px rgba(49,130,246,0.3); cursor: pointer; }
</style>

<script>
  function dismissCoach() {
    document.getElementById('coachOverlay').style.display = 'none';
    document.getElementById('coachTip').style.display = 'none';
  }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '안내 범위', aValue: '서비스 전반의 가치·기능 흐름', bValue: '특정 버튼·영역 1개에 집중' },
      { criterion: '배경 맥락', aValue: '독립 카드/슬라이드 (추상적)', bValue: '실제 UI 화면 위 (맥락 유지)' },
      { criterion: '권장 분량', aValue: '2~4페이지 (Skip 필수)', bValue: '1~2개 스포트라이트 이내' },
      { criterion: '사용 시점', aValue: '최초 가입 및 첫 실행 시', bValue: '신규 기능 출시 및 UI 개편 시' },
    ],
    cautionTip: '코치마크를 5단계 이상 연속으로 띄우면 사용자는 내용을 읽지 않고 화면만 연타해서 닫습니다. 한 화면에서 가장 중요한 액션 단 하나만 짚어주세요.',
  },
  {
    id: 'dim-vs-blur',
    number: '08',
    title: '딤 vs 블러',
    englishTitle: 'Dim vs Blur',
    tagline: '배경을 어둡게 눌러 전면 모달에 시선을 집중시키면 딤(Dim), 유리 질감으로 공간 맥락을 남기면 블러(Blur)입니다.',
    sideA: {
      label: '딤',
      englishLabel: 'Dim',
      badge: '명도 대비 · 가독성 최우선',
      summary: '반투명 검은색 오버레이(`rgba(0,0,0,0.45)`)로 뒤쪽 요소의 대비를 낮춰 앞의 다이얼로그에 시선을 고정합니다.',
      whenToUse: [
        '대다수의 모달, 바텀시트, 경고 알럿의 표준 백드롭',
        '배경이 복잡해도 텍스트 가독성을 확실히 보장해야 할 때',
        '저사양 모바일 기기에서도 GPU 부하 없이 매끄러운 전환',
      ],
      code: {
        react: `import { useState } from 'react';

export function DimBackdropModal() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white p-4">
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-[#3182F6]/20" />
        <div className="h-4 w-full rounded bg-[#F2F4F6]" />
        <div className="h-4 w-5/6 rounded bg-[#F2F4F6]" />
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-xl bg-[#3182F6] px-3 py-2 text-xs font-semibold text-white"
      >
        딤 모달 열기
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[230px] rounded-2xl bg-white p-4 shadow-xl"
          >
            <p className="text-sm font-bold text-[#191F28]">딤(Dim) 오버레이</p>
            <p className="mt-1 text-xs text-[#4E5968]">배경 대비를 낮춰 시선을 집중시켜요.</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="dim-overlay">
  <div class="dialog-card">
    <h4>딤(Dim) 오버레이</h4>
    <p>배경 명도를 낮춰 전면 카드 가독성을 극대화합니다.</p>
    <button type="button">확인</button>
  </div>
</div>

<style>
  .dim-overlay {
    position: fixed; inset: 0;
    background: rgba(15, 23, 42, 0.5);
    display: flex; align-items: center; justify-content: center;
  }
  .dialog-card {
    width: 300px; background: #fff; border-radius: 20px; padding: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
</style>`,
      },
    },
    sideB: {
      label: '블러',
      englishLabel: 'Blur',
      badge: '글래스모피즘 · 맥락 유지',
      summary: '`backdrop-filter: blur()`를 적용해 뒤쪽 UI의 색감과 형태를 은은하게 남기며 깊이감(Depth)을 연출합니다.',
      whenToUse: [
        '보안/민감 정보 화면 가림 (앱 스위처, 금액 블러)',
        'iOS/macOS 스타일의 세련된 컨텍스트 메뉴 및 팝오버',
        '배경 위치 감각을 완전히 지우지 않고 층위를 분리할 때',
      ],
      code: {
        react: `import { useState } from 'react';

export function BlurBackdropModal() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative h-64 overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white p-4">
      <div className="space-y-2">
        <div className="h-4 w-2/3 rounded bg-[#3182F6]/30" />
        <div className="h-4 w-full rounded bg-[#FF8A65]/30" />
        <div className="h-4 w-5/6 rounded bg-[#4DB6AC]/30" />
      </div>
      <button
        onClick={() => setOpen(true)}
        className="mt-4 rounded-xl bg-[#3182F6] px-3 py-2 text-xs font-semibold text-white"
      >
        블러 모달 열기
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-white/45 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[230px] rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl"
          >
            <p className="text-sm font-bold text-[#191F28]">블러(Blur) 오버레이</p>
            <p className="mt-1 text-xs text-[#4E5968]">뒤쪽 색감을 흐려 깊이감을 표현해요.</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full rounded-xl bg-[#3182F6] py-2 text-xs font-semibold text-white"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}`,
        vanilla: `<!-- HTML -->
<div class="blur-overlay">
  <div class="dialog-card">
    <h4>블러(Blur) 오버레이</h4>
    <p>backdrop-filter로 뒤쪽 화면을 부드럽게 흐립니다.</p>
    <button type="button">확인</button>
  </div>
</div>

<style>
  .blur-overlay {
    position: fixed; inset: 0;
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
  }
  .dialog-card {
    width: 300px; background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(229, 232, 235, 0.9);
    border-radius: 20px; padding: 20px;
    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.12);
  }
</style>`,
      },
    },
    comparisonTable: [
      { criterion: '시각적 효과', aValue: '어두운 반투명 레이어 (명도 저하)', bValue: '가우시안 블러 (선명도 저하)' },
      { criterion: '성능 비용', aValue: '매우 가벼움', bValue: 'GPU 연산 필요 (고해상도 시 주의)' },
      { criterion: '적합한 상황', aValue: '강력한 집중, 다크/라이트 공용 모달', bValue: '보안 프라이버시, 글래스 UI, 메뉴' },
      { criterion: '가독성 확보', aValue: '배경과 무관하게 안정적', bValue: '고채도 배경 시 약간의 딤 병행 권장' },
    ],
    cautionTip: '밝은 흰색 계열 블러(backdrop-blur)만 단독으로 쓰면 뒤쪽에 선명한 텍스트나 버튼이 비쳐 보일 수 있습니다. 실무에서는 `bg-black/25 backdrop-blur-sm`처럼 얕은 딤과 함께 섞어 쓰는 것이 가장 깔끔합니다.',
  },
  {
    id: 'alert-vs-toast',
    number: '09',
    title: '알럿 vs 토스트',
    englishTitle: 'Alert vs Toast',
    tagline: '사용자가 반드시 인지하고 "확인" 버튼을 눌러야 하면 알럿, 확인 없이 스쳐 지나가도 되는 결과는 토스트입니다.',
    sideA: {
      label: '알럿',
      englishLabel: 'Alert',
      badge: '강제 확인 · 차단형 다이얼로그',
      summary: '오류, 파괴적 작업, 중요 고지 등 사용자가 내용을 읽고 명시적으로 "확인"을 눌러야 닫히는 다이얼로그입니다.',
      whenToUse: [
        '결제 실패, 네트워크 단절로 진행 불가한 오류 안내',
        '계정 탈퇴, 데이터 영구 삭제 등 위험 확인',
        '반드시 읽고 동의/확인을 받아야 하는 법적·보안 알림',
      ],
      code: {
        react: `import { useState } from 'react';

export function ConfirmAlert() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#F04452] px-4 py-2.5 text-sm font-semibold text-white"
      >
        결제 승인 요청
      </button>

      {open && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-title"
          aria-describedby="alert-desc"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
        >
          <div className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-2xl">
            <h3 id="alert-title" className="text-lg font-bold text-[#191F28]">
              한도를 초과했어요
            </h3>
            <p id="alert-desc" className="mt-2 text-sm text-[#4E5968]">
              1일 이체 한도(500만 원)를 넘어 송금할 수 없습니다. 한도를 확인해 주세요.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full rounded-2xl bg-[#3182F6] py-3 text-sm font-semibold text-white hover:bg-[#1B64DA]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="danger-btn" onclick="openAlert()">결제 승인 요청</button>

<div id="alertBackdrop" class="alert-backdrop" role="alertdialog" aria-modal="true" hidden>
  <div class="alert-box">
    <h3 class="alert-title">한도를 초과했어요</h3>
    <p class="alert-desc">1일 이체 한도를 넘어 송금할 수 없습니다. 한도를 확인해 주세요.</p>
    <button type="button" class="alert-confirm" onclick="closeAlert()">확인</button>
  </div>
</div>

<style>
  .danger-btn { background: #f04452; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .alert-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 50; }
  .alert-backdrop[hidden] { display: none; }
  .alert-box { width: 100%; max-width: 320px; background: #fff; border-radius: 24px; padding: 24px; text-align: center; }
  .alert-title { margin: 0; font-size: 18px; color: #191f28; }
  .alert-desc { margin: 8px 0 0; font-size: 14px; color: #4e5968; line-height: 1.5; }
  .alert-confirm { margin-top: 20px; width: 100%; background: #3182f6; color: #fff; border: none; border-radius: 14px; padding: 12px; font-weight: 600; cursor: pointer; }
</style>

<script>
  function openAlert() { document.getElementById('alertBackdrop').hidden = false; }
  function closeAlert() { document.getElementById('alertBackdrop').hidden = true; }
</script>`,
      },
    },
    sideB: {
      label: '토스트',
      englishLabel: 'Toast',
      badge: '비차단형 · 자동 소멸',
      summary: '사소한 성공이나 상태 변화를 화면 하단에 잠깐 띄웠다가 사용자의 클릭 없이 자동으로 사라집니다.',
      whenToUse: [
        '"저장했어요", "링크를 복사했어요" 같은 성공 피드백',
        '실패하더라도 사용자가 바로 다시 눌러 해결 가능한 가벼운 안내',
        '작업 흐름을 멈추지 말아야 하는 연속 입력 화면',
      ],
      code: {
        react: `import { useEffect, useState } from 'react';

export function ResultToast() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setOpen(false), 2200);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#3182F6] px-4 py-2.5 text-sm font-semibold text-white"
      >
        설정 저장하기
      </button>

      {open && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#191F28] px-5 py-2.5 text-sm font-medium text-white shadow-lg"
        >
          변경한 설정을 저장했어요
        </div>
      )}
    </>
  );
}`,
        vanilla: `<!-- HTML -->
<button type="button" class="save-btn" onclick="triggerToast()">설정 저장하기</button>
<div id="resultToast" class="result-toast" role="status" aria-live="polite">변경한 설정을 저장했어요</div>

<style>
  .save-btn { background: #3182f6; color: #fff; border: none; border-radius: 12px; padding: 10px 16px; font-weight: 600; cursor: pointer; }
  .result-toast {
    position: fixed; left: 50%; bottom: 24px; transform: translate(-50%, 10px);
    background: #191f28; color: #fff; padding: 10px 20px; border-radius: 999px;
    font-size: 14px; opacity: 0; pointer-events: none; transition: all 0.2s;
  }
  .result-toast.active { opacity: 1; transform: translate(-50%, 0); }
</style>

<script>
  let timer;
  function triggerToast() {
    const el = document.getElementById('resultToast');
    el.classList.add('active');
    clearTimeout(timer);
    timer = setTimeout(() => el.classList.remove('active'), 2200);
  }
</script>`,
      },
    },
    comparisonTable: [
      { criterion: '흐름 중단 여부', aValue: '강제 중단 (확인 클릭 필수)', bValue: '비차단 (작업 계속 가능)' },
      { criterion: '소멸 방식', aValue: '사용자 버튼 클릭으로 닫힘', bValue: '2~3초 후 자동 소멸' },
      { criterion: '접근성 역할', aValue: 'role="alertdialog"', bValue: 'role="status" aria-live="polite"' },
      { criterion: '적합한 이벤트', aValue: '치명적 오류, 결제/삭제 확인', bValue: '저장 완료, 복사 완료, 가벼운 안내' },
    ],
    cautionTip: '"저장되었습니다" 같은 단순 완료 메시지에 알럿(Alert)을 띄우면 사용자가 매번 확인 버튼을 눌러야 해서 조작 피로도가 커집니다. 완료 피드백은 토스트로 처리하세요.',
  },
];
