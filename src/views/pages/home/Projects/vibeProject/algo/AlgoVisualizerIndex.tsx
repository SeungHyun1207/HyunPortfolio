/**
 * AlgoVisualizerIndex
 * 정렬 알고리즘 시각화 대시보드
 *
 * 지원 알고리즘:
 * - Bubble Sort
 * - Selection Sort
 * - Insertion Sort
 * - Merge Sort
 * - Quick Sort
 */

import { useState, useEffect, useRef, useCallback } from "react";
import type { AlgoId, BarState, Bar, AlgoOption, Step } from "@models/vibeProject/algo/AlgoVisualizerModel";

// ─── 알고리즘 메타 ─────────────────────────────────────────────────────────────

const ALGORITHMS: AlgoOption[] = [
  {
    id: "bubble",
    label: "Bubble Sort",
    color: "#00c8ff",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "인접한 두 원소를 비교해 더 큰 값을 뒤로 밀어 정렬합니다.",
  },
  {
    id: "selection",
    label: "Selection Sort",
    color: "#00ff88",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "미정렬 구간에서 최솟값을 찾아 맨 앞으로 이동시킵니다.",
  },
  {
    id: "insertion",
    label: "Insertion Sort",
    color: "#ff8c00",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    description: "각 원소를 이미 정렬된 구간의 알맞은 위치에 삽입합니다.",
  },
  {
    id: "merge",
    label: "Merge Sort",
    color: "#c084fc",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "배열을 반으로 나눠 재귀적으로 정렬 후 병합합니다.",
  },
  {
    id: "quick",
    label: "Quick Sort",
    color: "#f43f5e",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    description: "피벗을 기준으로 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할합니다.",
  },
];

// ─── 애니메이션 스텝 생성기 ────────────────────────────────────────────────────

function cloneBars(bars: Bar[]): Bar[] {
  return bars.map((b) => ({ ...b }));
}

function generateBubbleSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  const arr: Bar[] = initial.map((v) => ({ value: v, state: "default" }));
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      arr[j].state = "comparing";
      arr[j + 1].state = "comparing";
      steps.push({ arr: cloneBars(arr) });

      if (arr[j].value > arr[j + 1].value) {
        arr[j].state = "swapping";
        arr[j + 1].state = "swapping";
        steps.push({ arr: cloneBars(arr) });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      arr[j].state = "default";
      arr[j + 1].state = "default";
    }
    arr[n - i - 1].state = "sorted";
    steps.push({ arr: cloneBars(arr) });
  }
  arr[0].state = "sorted";
  steps.push({ arr: cloneBars(arr) });
  return steps;
}

function generateSelectionSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  const arr: Bar[] = initial.map((v) => ({ value: v, state: "default" }));
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    arr[minIdx].state = "pivot";
    steps.push({ arr: cloneBars(arr) });

    for (let j = i + 1; j < n; j++) {
      arr[j].state = "comparing";
      steps.push({ arr: cloneBars(arr) });

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].state = minIdx === i ? "default" : "default";
        minIdx = j;
        arr[minIdx].state = "pivot";
      } else {
        arr[j].state = "default";
      }
      steps.push({ arr: cloneBars(arr) });
    }

    if (minIdx !== i) {
      arr[i].state = "swapping";
      arr[minIdx].state = "swapping";
      steps.push({ arr: cloneBars(arr) });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    arr[i].state = "sorted";
    for (let k = i + 1; k < n; k++) arr[k].state = "default";
    steps.push({ arr: cloneBars(arr) });
  }
  arr[n - 1].state = "sorted";
  steps.push({ arr: cloneBars(arr) });
  return steps;
}

function generateInsertionSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  const arr: Bar[] = initial.map((v) => ({ value: v, state: "default" }));
  const n = arr.length;

  arr[0].state = "sorted";
  steps.push({ arr: cloneBars(arr) });

  for (let i = 1; i < n; i++) {
    arr[i].state = "pivot";
    steps.push({ arr: cloneBars(arr) });
    let j = i;

    while (j > 0 && arr[j - 1].value > arr[j].value) {
      arr[j].state = "swapping";
      arr[j - 1].state = "swapping";
      steps.push({ arr: cloneBars(arr) });
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      arr[j].state = "sorted";
      arr[j - 1].state = "pivot";
      steps.push({ arr: cloneBars(arr) });
      j--;
    }

    arr[j].state = "sorted";
    steps.push({ arr: cloneBars(arr) });
  }
  return steps;
}

function generateMergeSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  const arr: Bar[] = initial.map((v) => ({ value: v, state: "default" }));

  function mergeSort(a: Bar[], l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);

    const left = a.slice(l, m + 1).map((b) => ({ ...b }));
    const right = a.slice(m + 1, r + 1).map((b) => ({ ...b }));
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      a[l + i].state = "comparing";
      a[m + 1 + j].state = "comparing";
      steps.push({ arr: cloneBars(a) });

      if (left[i].value <= right[j].value) {
        a[k] = { ...left[i], state: "swapping" };
        i++;
      } else {
        a[k] = { ...right[j], state: "swapping" };
        j++;
      }
      steps.push({ arr: cloneBars(a) });
      a[k].state = "sorted";
      k++;
    }

    while (i < left.length) {
      a[k] = { ...left[i], state: "sorted" };
      i++; k++;
      steps.push({ arr: cloneBars(a) });
    }
    while (j < right.length) {
      a[k] = { ...right[j], state: "sorted" };
      j++; k++;
      steps.push({ arr: cloneBars(a) });
    }
  }

  mergeSort(arr, 0, arr.length - 1);
  arr.forEach((b) => (b.state = "sorted"));
  steps.push({ arr: cloneBars(arr) });
  return steps;
}

function generateQuickSteps(initial: number[]): Step[] {
  const steps: Step[] = [];
  const arr: Bar[] = initial.map((v) => ({ value: v, state: "default" }));

  function partition(a: Bar[], low: number, high: number): number {
    a[high].state = "pivot";
    steps.push({ arr: cloneBars(a) });
    let i = low - 1;

    for (let j = low; j < high; j++) {
      a[j].state = "comparing";
      steps.push({ arr: cloneBars(a) });

      if (a[j].value <= a[high].value) {
        i++;
        a[i].state = "swapping";
        a[j].state = "swapping";
        steps.push({ arr: cloneBars(a) });
        [a[i], a[j]] = [a[j], a[i]];
        a[i].state = "default";
      }
      a[j].state = "default";
    }

    a[i + 1].state = "swapping";
    steps.push({ arr: cloneBars(a) });
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    a[i + 1].state = "sorted";
    a[high].state = "default";
    steps.push({ arr: cloneBars(a) });
    return i + 1;
  }

  function quickSort(a: Bar[], low: number, high: number) {
    if (low < high) {
      const pi = partition(a, low, high);
      quickSort(a, low, pi - 1);
      quickSort(a, pi + 1, high);
    } else if (low === high) {
      a[low].state = "sorted";
      steps.push({ arr: cloneBars(a) });
    }
  }

  quickSort(arr, 0, arr.length - 1);
  arr.forEach((b) => (b.state = "sorted"));
  steps.push({ arr: cloneBars(arr) });
  return steps;
}

function generateSteps(algoId: AlgoId, initial: number[]): Step[] {
  switch (algoId) {
    case "bubble":    return generateBubbleSteps(initial);
    case "selection": return generateSelectionSteps(initial);
    case "insertion": return generateInsertionSteps(initial);
    case "merge":     return generateMergeSteps(initial);
    case "quick":     return generateQuickSteps(initial);
  }
}

// ─── 유틸 ──────────────────────────────────────────────────────────────────────

function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

const BAR_COLORS: Record<BarState, string> = {
  default:   "#1e2e42",
  comparing: "#00c8ff",
  swapping:  "#f43f5e",
  sorted:    "#00ff88",
  pivot:     "#ff8c00",
};

// ─── Component ────────────────────────────────────────────────────────────────

const AlgoVisualizerIndex = () => {
  const [arraySize, setArraySize]         = useState(40);
  const [speed, setSpeed]                 = useState(50);          // ms
  const [selectedAlgo, setSelectedAlgo]   = useState<AlgoId>("bubble");
  const [bars, setBars]                   = useState<Bar[]>(() =>
    randomArray(40).map((v) => ({ value: v, state: "default" }))
  );
  const [isRunning, setIsRunning]         = useState(false);
  const [isDone, setIsDone]               = useState(false);
  const [stepIndex, setStepIndex]         = useState(0);
  const [totalSteps, setTotalSteps]       = useState(0);
  const [comparisons, setComparisons]     = useState(0);
  const [swaps, setSwaps]                 = useState(0);

  const stepsRef    = useRef<Step[]>([]);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef  = useRef(false);

  const activeAlgo = ALGORITHMS.find((a) => a.id === selectedAlgo)!;

  // ── 배열 리셋 ──────────────────────────────────────────────────────────────
  const resetArray = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    runningRef.current = false;
    setIsRunning(false);
    setIsDone(false);
    setStepIndex(0);
    setTotalSteps(0);
    setComparisons(0);
    setSwaps(0);
    stepsRef.current = [];
    const arr = randomArray(arraySize);
    setBars(arr.map((v) => ({ value: v, state: "default" })));
  }, [arraySize]);

  // arraySize 변경시 자동 리셋
  useEffect(() => { resetArray(); }, [arraySize]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── 실행 ───────────────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    if (isRunning) return;

    // 이미 끝난 경우 리셋 후 재실행
    const currentBars = isDone
      ? (() => {
          const arr = randomArray(arraySize);
          return arr.map((v): Bar => ({ value: v, state: "default" }));
        })()
      : bars;

    if (isDone) setBars(currentBars);

    const initial = currentBars.map((b) => b.value);
    const steps   = generateSteps(selectedAlgo, initial);
    stepsRef.current = steps;
    setTotalSteps(steps.length);
    setStepIndex(0);
    setComparisons(0);
    setSwaps(0);
    setIsRunning(true);
    setIsDone(false);
    runningRef.current = true;

    let idx = 0;
    let cmp = 0;
    let swp = 0;

    const tick = () => {
      if (!runningRef.current || idx >= steps.length) {
        setIsRunning(false);
        if (idx >= steps.length) setIsDone(true);
        return;
      }
      const step = steps[idx];
      setBars(step.arr);
      setStepIndex(idx + 1);

      // 통계
      step.arr.forEach((b) => {
        if (b.state === "comparing") cmp++;
        if (b.state === "swapping")  swp++;
      });
      setComparisons(Math.floor(cmp / 2));
      setSwaps(Math.floor(swp / 2));

      idx++;
      timerRef.current = setTimeout(tick, speed);
    };

    tick();
  }, [isRunning, isDone, bars, selectedAlgo, arraySize, speed]);

  // ── 일시정지 ───────────────────────────────────────────────────────────────
  const handlePause = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    runningRef.current = false;
    setIsRunning(false);
  }, []);

  // ── 알고리즘 변경 ──────────────────────────────────────────────────────────
  const handleAlgoChange = useCallback((id: AlgoId) => {
    if (isRunning) {
      if (timerRef.current) clearTimeout(timerRef.current);
      runningRef.current = false;
      setIsRunning(false);
    }
    setSelectedAlgo(id);
    setIsDone(false);
    setStepIndex(0);
    setTotalSteps(0);
    setComparisons(0);
    setSwaps(0);
  }, [isRunning]);

  // ── cleanup ────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      runningRef.current = false;
    };
  }, []);

  const progress = totalSteps > 0 ? Math.round((stepIndex / totalSteps) * 100) : 0;

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07090d",
      fontFamily: "'IBM Plex Mono', monospace",
      color: "#bfcfdf",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

        .av-btn {
          background: transparent;
          border: 1px solid #1e2e42;
          border-radius: 4px;
          color: #465a72;
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 12px;
          transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .av-btn:hover:not(:disabled) {
          border-color: #00c8ff;
          color: #00c8ff;
        }
        .av-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .av-btn.active {
          border-color: var(--ac);
          color: var(--ac);
          background: color-mix(in srgb, var(--ac) 10%, transparent);
        }
        .av-btn.primary {
          border-color: #00c8ff66;
          color: #00c8ff;
          background: #00c8ff18;
        }
        .av-btn.primary:hover:not(:disabled) {
          background: #00c8ff28;
        }
        .av-btn.danger {
          border-color: #f43f5e66;
          color: #f43f5e;
          background: #f43f5e18;
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: #1e2e42;
          border-radius: 2px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #00c8ff;
          cursor: pointer;
        }
      `}</style>

      {/* ── 헤더 ─────────────────────────────────────────────────────────────── */}
      <div style={{
        borderBottom: "1px solid #182030",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#0c1018",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, background: "#00ff88", borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: "#07090d" }}>ALG</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#bfcfdf", letterSpacing: "0.04em" }}>
            Algorithm Visualizer
          </span>
        </div>

        <div style={{ width: 1, height: 16, background: "#182030" }} />

        {/* 알고리즘 선택 */}
        <div style={{ display: "flex", gap: 4 }}>
          {ALGORITHMS.map((algo) => (
            <button
              key={algo.id}
              type="button"
              className={`av-btn${selectedAlgo === algo.id ? " active" : ""}`}
              style={{ "--ac": algo.color } as React.CSSProperties}
              onClick={() => handleAlgoChange(algo.id)}
              disabled={isRunning}
            >
              {algo.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 메인 ──────────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 24px", gap: 16 }}>

        {/* 알고리즘 정보 카드 */}
        <div style={{
          display: "flex", gap: 16, alignItems: "flex-start",
          background: "#0c1018", border: "1px solid #182030",
          borderRadius: 6, padding: "12px 16px",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: activeAlgo.color }}>
                {activeAlgo.label}
              </span>
              <span style={{
                fontSize: 9, padding: "2px 6px", borderRadius: 2,
                border: `1px solid ${activeAlgo.color}44`,
                color: activeAlgo.color,
                background: `${activeAlgo.color}12`,
              }}>
                Time: {activeAlgo.timeComplexity}
              </span>
              <span style={{
                fontSize: 9, padding: "2px 6px", borderRadius: 2,
                border: "1px solid #1e2e42",
                color: "#465a72",
              }}>
                Space: {activeAlgo.spaceComplexity}
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#465a72", margin: 0, lineHeight: 1.5 }}>
              {activeAlgo.description}
            </p>
          </div>

          {/* 범례 */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
            {(["comparing", "swapping", "sorted", "pivot"] as BarState[]).map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: BAR_COLORS[s] }} />
                <span style={{ fontSize: 9, color: "#465a72", textTransform: "capitalize" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 막대 시각화 영역 */}
        <div style={{
          flex: 1,
          background: "#0c1018",
          border: "1px solid #182030",
          borderRadius: 6,
          padding: "16px",
          display: "flex",
          alignItems: "flex-end",
          gap: arraySize > 60 ? 1 : 2,
          minHeight: 280,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* 그리드 라인 */}
          {[25, 50, 75].map((pct) => (
            <div key={pct} style={{
              position: "absolute",
              left: 16, right: 16,
              bottom: `calc(16px + ${pct}%)`,
              borderTop: "1px dashed #182030",
              pointerEvents: "none",
            }}>
              <span style={{
                position: "absolute", right: 0, top: -9,
                fontSize: 8, color: "#253545",
              }}>{pct}</span>
            </div>
          ))}

          {bars.map((bar, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${bar.value}%`,
                background: bar.state === "default" ? "#1e2e42" : BAR_COLORS[bar.state],
                borderRadius: "2px 2px 0 0",
                transition: isRunning ? "height 0.05s linear, background 0.05s linear" : "none",
                minWidth: 1,
                boxShadow: bar.state !== "default"
                  ? `0 0 6px ${BAR_COLORS[bar.state]}66`
                  : "none",
              }}
            />
          ))}
        </div>

        {/* 컨트롤 패널 */}
        <div style={{
          background: "#0c1018",
          border: "1px solid #182030",
          borderRadius: 6,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}>

          {/* 재생 / 일시정지 / 리셋 */}
          <div style={{ display: "flex", gap: 6 }}>
            {!isRunning ? (
              <button
                type="button"
                className="av-btn primary"
                onClick={handleStart}
              >
                {isDone ? "▶ Restart" : "▶ Start"}
              </button>
            ) : (
              <button
                type="button"
                className="av-btn danger"
                onClick={handlePause}
              >
                ⏸ Pause
              </button>
            )}
            <button
              type="button"
              className="av-btn"
              onClick={resetArray}
            >
              ↺ Reset
            </button>
          </div>

          <div style={{ width: 1, height: 24, background: "#182030" }} />

          {/* 배열 크기 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "#465a72", whiteSpace: "nowrap" }}>
              Size: <span style={{ color: "#bfcfdf" }}>{arraySize}</span>
            </span>
            <input
              type="range"
              min={10}
              max={100}
              value={arraySize}
              disabled={isRunning}
              onChange={(e) => setArraySize(Number(e.target.value))}
              style={{ width: 80 }}
            />
          </div>

          {/* 속도 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, color: "#465a72", whiteSpace: "nowrap" }}>
              Speed: <span style={{ color: "#bfcfdf" }}>{speed <= 10 ? "Fast" : speed <= 40 ? "Mid" : "Slow"}</span>
            </span>
            <input
              type="range"
              min={1}
              max={200}
              value={201 - speed}
              onChange={(e) => setSpeed(201 - Number(e.target.value))}
              style={{ width: 80 }}
            />
          </div>

          <div style={{ width: 1, height: 24, background: "#182030" }} />

          {/* 진행률 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <span style={{ fontSize: 10, color: "#465a72", whiteSpace: "nowrap" }}>
              {stepIndex} / {totalSteps || "—"}
            </span>
            <div style={{
              flex: 1, height: 3, background: "#182030", borderRadius: 2, overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                width: `${progress}%`,
                background: isDone ? "#00ff88" : activeAlgo.color,
                borderRadius: 2,
                transition: "width 0.1s linear",
              }} />
            </div>
            <span style={{ fontSize: 10, color: "#465a72", whiteSpace: "nowrap" }}>
              {progress}%
            </span>
          </div>

          <div style={{ width: 1, height: 24, background: "#182030" }} />

          {/* 통계 */}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#00c8ff" }}>
                {comparisons.toLocaleString()}
              </div>
              <div style={{ fontSize: 9, color: "#465a72" }}>comparisons</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#f43f5e" }}>
                {swaps.toLocaleString()}
              </div>
              <div style={{ fontSize: 9, color: "#465a72" }}>swaps</div>
            </div>
            {isDone && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{
                  fontSize: 10, padding: "3px 8px", borderRadius: 3,
                  border: "1px solid #00ff8866",
                  color: "#00ff88",
                  background: "#00ff8818",
                }}>
                  ✓ sorted
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlgoVisualizerIndex;
