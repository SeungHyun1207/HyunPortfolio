/**
 * CodeSnippetIndex
 * Code Snippet Manager
 * LocalStorage 기반 코드 스니펫 관리 도구
 */

import { useState, useEffect, useCallback } from "react";
import type { LangId, Snippet } from "@models/vibe-project/snippet/CodeSnippetModel";
import { useVibeTheme } from "../_shared/useVibeTheme";

// ─── 언어 메타 ─────────────────────────────────────────────────────────────────

const LANGUAGES: { id: LangId; label: string; color: string }[] = [
  { id: "typescript",  label: "TypeScript",  color: "#3178c6" },
  { id: "javascript",  label: "JavaScript",  color: "#f7df1e" },
  { id: "react",       label: "React/TSX",   color: "#61dafb" },
  { id: "css",         label: "CSS",         color: "#1572b6" },
  { id: "python",      label: "Python",      color: "#3776ab" },
  { id: "html",        label: "HTML",        color: "#e34f26" },
  { id: "bash",        label: "Bash",        color: "#00ff88" },
  { id: "sql",         label: "SQL",         color: "#f43f5e" },
  { id: "other",       label: "Other",       color: "#465a72" },
];

function getLang(id: LangId) {
  return LANGUAGES.find((l) => l.id === id) ?? LANGUAGES[LANGUAGES.length - 1];
}

// ─── 초기 스니펫 ───────────────────────────────────────────────────────────────

const SEED_SNIPPETS: Snippet[] = [
  {
    id: "seed-1",
    title: "useLocalStorage Hook",
    language: "react",
    tags: ["hook", "storage", "react"],
    createdAt: "2025-01-10T09:00:00Z",
    code: `function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  });

  const set = (v: T) => {
    setValue(v);
    localStorage.setItem(key, JSON.stringify(v));
  };

  return [value, set] as const;
}`,
  },
  {
    id: "seed-2",
    title: "debounce 유틸",
    language: "typescript",
    tags: ["utils", "performance"],
    createdAt: "2025-01-15T10:30:00Z",
    code: `function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  },
  {
    id: "seed-3",
    title: "Flexbox 완전 중앙 정렬",
    language: "css",
    tags: ["layout", "flexbox", "centering"],
    createdAt: "2025-02-01T08:00:00Z",
    code: `.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 전체 화면 중앙 */
.full-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}`,
  },
  {
    id: "seed-4",
    title: "TypeScript Utility Types 모음",
    language: "typescript",
    tags: ["typescript", "types", "utility"],
    createdAt: "2025-02-10T11:00:00Z",
    code: `// Partial — 모든 필드를 optional로
type PartialUser = Partial<User>;

// Required — 모든 필드를 required로
type RequiredConfig = Required<Config>;

// Pick — 특정 필드만 선택
type UserPreview = Pick<User, "id" | "name">;

// Omit — 특정 필드 제거
type UserWithoutPassword = Omit<User, "password">;

// Record — 키-값 타입 맵
type RoleMap = Record<string, Permission[]>;

// ReturnType — 함수 반환 타입 추출
type FetchResult = ReturnType<typeof fetchUser>;`,
  },
  {
    id: "seed-5",
    title: "React 에러 바운더리",
    language: "react",
    tags: ["error", "boundary", "component"],
    createdAt: "2025-03-01T09:00:00Z",
    code: `import { Component, type ReactNode } from "react";

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError)
      return this.props.fallback ?? <div>Something went wrong.</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;`,
  },
  {
    id: "seed-6",
    title: "Git 브랜치 클린업",
    language: "bash",
    tags: ["git", "cleanup", "branch"],
    createdAt: "2025-03-05T14:00:00Z",
    code: `# merge된 로컬 브랜치 삭제
git branch --merged | grep -v "\\*\\|main\\|dev" | xargs git branch -d

# 원격에서 삭제된 브랜치 로컬 정리
git fetch --prune

# 원격 추적 브랜치 목록
git branch -r

# 특정 브랜치 원격 삭제
git push origin --delete feature/old-branch`,
  },
];

const STORAGE_KEY = "hyun-snippets";

// ─── 유틸 ──────────────────────────────────────────────────────────────────────

function loadSnippets(): Snippet[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Snippet[];
  } catch { /* ignore */ }
  // 첫 방문 시 seed 데이터 저장
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SNIPPETS));
  return SEED_SNIPPETS;
}

function saveSnippets(snippets: Snippet[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
}

// ─── Component ────────────────────────────────────────────────────────────────

import type { ModalMode, FormState } from "@models/vibe-project/snippet/CodeSnippetModel";

const EMPTY_FORM: FormState = { title: "", language: "typescript", code: "", tags: "" };

const CodeSnippetIndex = () => {
  const C = useVibeTheme();
  const [snippets, setSnippets]       = useState<Snippet[]>(() => loadSnippets());
  const [search, setSearch]           = useState("");
  const [filterLang, setFilterLang]   = useState<LangId | "all">("all");
  const [modal, setModal]             = useState<{ mode: ModalMode; id?: string } | null>(null);
  const [form, setForm]               = useState<FormState>(EMPTY_FORM);
  const [copied, setCopied]           = useState<string | null>(null);
  const [deleteId, setDeleteId]       = useState<string | null>(null);

  useEffect(() => { saveSnippets(snippets); }, [snippets]);

  // ── 필터 ──────────────────────────────────────────────────────────────────
  const filtered = snippets.filter((s) => {
    const matchLang = filterLang === "all" || s.language === filterLang;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.code.toLowerCase().includes(q);
    return matchLang && matchSearch;
  });

  // ── 모달 열기 ──────────────────────────────────────────────────────────────
  const openAdd = useCallback(() => {
    setForm(EMPTY_FORM);
    setModal({ mode: "add" });
  }, []);

  const openEdit = useCallback((s: Snippet) => {
    setForm({ title: s.title, language: s.language, code: s.code, tags: s.tags.join(", ") });
    setModal({ mode: "edit", id: s.id });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  // ── 저장 ──────────────────────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    if (!form.title.trim() || !form.code.trim()) return;
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

    if (modal?.mode === "add") {
      const newSnippet: Snippet = {
        id: `snip-${Date.now()}`,
        title: form.title.trim(),
        language: form.language,
        code: form.code,
        tags,
        createdAt: new Date().toISOString(),
      };
      setSnippets((prev) => [newSnippet, ...prev]);
    } else if (modal?.mode === "edit" && modal.id) {
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === modal.id
            ? { ...s, title: form.title.trim(), language: form.language, code: form.code, tags }
            : s
        )
      );
    }
    closeModal();
  }, [form, modal, closeModal]);

  // ── 삭제 ──────────────────────────────────────────────────────────────────
  const handleDelete = useCallback((id: string) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  }, []);

  // ── 복사 ──────────────────────────────────────────────────────────────────
  const handleCopy = useCallback(async (id: string, code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  // ── 코드 미리보기 (3줄 제한) ────────────────────────────────────────────────
  const previewCode = (code: string, lines = 4) =>
    code.split("\n").slice(0, lines).join("\n");

  return (
    <div style={{
      minHeight: "calc(100vh - 80px)",
      background: C.bg,
      fontFamily: "'IBM Plex Mono', monospace",
      color: C.text,
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

        .snip-btn {
          background: transparent;
          border: 1px solid ${C.borderLight};
          border-radius: 4px;
          color: ${C.textSec};
          cursor: pointer;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          transition: all 0.15s;
        }
        .snip-btn:hover { border-color: ${C.cyan}; color: ${C.cyan}; }
        .snip-btn.primary {
          border-color: ${C.cyan}66; color: ${C.cyan}; background: ${C.cyan}18;
        }
        .snip-btn.primary:hover { background: ${C.cyan}28; }
        .snip-btn.danger { border-color: ${C.red}66; color: ${C.red}; background: ${C.red}18; }
        .snip-input {
          background: ${C.cardHover};
          border: 1px solid ${C.borderLight};
          border-radius: 4px;
          color: ${C.text};
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          padding: 7px 10px;
          outline: none;
          transition: border-color 0.15s;
          width: 100%;
          box-sizing: border-box;
        }
        .snip-input:focus { border-color: ${C.cyan}; }
        .snip-input::placeholder { color: ${C.textSec}; }
        .snip-select {
          background: ${C.cardHover};
          border: 1px solid ${C.borderLight};
          border-radius: 4px;
          color: ${C.text};
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          padding: 7px 10px;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s;
        }
        .snip-select:focus { border-color: ${C.cyan}; }
        .snip-card {
          background: ${C.card};
          border: 1px solid ${C.border};
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          transition: border-color 0.15s, box-shadow 0.15s;
          overflow: hidden;
        }
        .snip-card:hover {
          border-color: ${C.borderLight};
          box-shadow: 0 8px 24px rgba(0,0,0,${C.isDark ? 0.3 : 0.08});
        }
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,${C.isDark ? 0.7 : 0.4});
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 24px;
        }
        .modal {
          background: ${C.card};
          border: 1px solid ${C.borderLight};
          border-radius: 8px;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 24px;
          max-height: 90vh;
          overflow-y: auto;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.borderLight}; border-radius: 2px; }
      `}</style>

      {/* ── 헤더 ─────────────────────────────────────────────────────────────── */}
      <div style={{
        background: C.card,
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, background: C.red, borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, fontWeight: 800, color: "#fff" }}>{"</>"}</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
            Code Snippets
          </span>
          <span style={{
            fontSize: 10, padding: "2px 6px", borderRadius: 3,
            border: `1px solid ${C.borderLight}`, color: C.textSec,
          }}>
            {snippets.length} total
          </span>
        </div>

        {/* 검색 */}
        <input
          className="snip-input"
          placeholder="Search by title, tag, or code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 200, maxWidth: 320 }}
        />

        {/* 언어 필터 */}
        <select
          className="snip-select"
          value={filterLang}
          onChange={(e) => setFilterLang(e.target.value as LangId | "all")}
        >
          <option value="all">All Languages</option>
          {LANGUAGES.map((l) => (
            <option key={l.id} value={l.id}>{l.label}</option>
          ))}
        </select>

        {/* 추가 버튼 */}
        <button type="button" className="snip-btn primary" onClick={openAdd}>
          + New Snippet
        </button>
      </div>

      {/* ── 카드 그리드 ───────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 14,
        alignContent: "start",
      }}>
        {filtered.length === 0 ? (
          <div style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            padding: "60px 0",
            color: C.textSec,
            fontSize: 12,
          }}>
            {search || filterLang !== "all"
              ? "No snippets match your filter."
              : "No snippets yet. Click '+ New Snippet' to add one."}
          </div>
        ) : (
          filtered.map((s) => {
            const lang = getLang(s.language);
            return (
              <div key={s.id} className="snip-card">
                {/* 카드 헤더 */}
                <div style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{
                      fontSize: 9, padding: "2px 6px", borderRadius: 3, flexShrink: 0,
                      color: lang.color,
                      background: `${lang.color}18`,
                      border: `1px solid ${lang.color}44`,
                    }}>
                      {lang.label}
                    </span>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: C.text,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {s.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button
                      type="button"
                      className="snip-btn"
                      style={copied === s.id ? { borderColor: `${C.green}66`, color: C.green } : {}}
                      onClick={() => handleCopy(s.id, s.code)}
                    >
                      {copied === s.id ? "✓ Copied" : "Copy"}
                    </button>
                    <button type="button" className="snip-btn" onClick={() => openEdit(s)}>Edit</button>
                    <button type="button" className="snip-btn danger" onClick={() => setDeleteId(s.id)}>Del</button>
                  </div>
                </div>

                {/* 코드 미리보기 */}
                <pre style={{
                  margin: 0,
                  padding: "12px 14px",
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: C.isDark ? "#7ca4c4" : C.textSec,
                  background: "transparent",
                  overflow: "hidden",
                  flex: 1,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {previewCode(s.code)}
                  {s.code.split("\n").length > 4 && (
                    <span style={{ color: C.textSec }}>
                      {"\n"}… +{s.code.split("\n").length - 4} more lines
                    </span>
                  )}
                </pre>

                {/* 태그 */}
                {s.tags.length > 0 && (
                  <div style={{
                    padding: "8px 14px",
                    borderTop: `1px solid ${C.border}`,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                  }}>
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 9, padding: "2px 6px", borderRadius: 3,
                          background: C.border, color: C.textSec, cursor: "pointer",
                        }}
                        onClick={() => setSearch(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Add / Edit 모달 ───────────────────────────────────────────────────── */}
      {modal && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                {modal.mode === "add" ? "New Snippet" : "Edit Snippet"}
              </span>
              <button type="button" className="snip-btn" onClick={closeModal}>✕</button>
            </div>

            {/* Title */}
            <div>
              <label style={{ fontSize: 10, color: C.textSec, display: "block", marginBottom: 4 }}>TITLE</label>
              <input
                className="snip-input"
                placeholder="e.g. useDebounce Hook"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            {/* Language */}
            <div>
              <label style={{ fontSize: 10, color: C.textSec, display: "block", marginBottom: 4 }}>LANGUAGE</label>
              <select
                className="snip-select"
                value={form.language}
                onChange={(e) => setForm((f) => ({ ...f, language: e.target.value as LangId }))}
                style={{ width: "100%" }}
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id}>{l.label}</option>
                ))}
              </select>
            </div>

            {/* Code */}
            <div>
              <label style={{ fontSize: 10, color: C.textSec, display: "block", marginBottom: 4 }}>CODE</label>
              <textarea
                className="snip-input"
                placeholder="Paste your code here…"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                rows={12}
                style={{ resize: "vertical", lineHeight: 1.6, fontFamily: "'IBM Plex Mono', monospace" }}
              />
            </div>

            {/* Tags */}
            <div>
              <label style={{ fontSize: 10, color: C.textSec, display: "block", marginBottom: 4 }}>
                TAGS <span style={{ color: C.textDim }}>(comma separated)</span>
              </label>
              <input
                className="snip-input"
                placeholder="hook, utils, react"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
              />
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="snip-btn" onClick={closeModal}>Cancel</button>
              <button
                type="button"
                className="snip-btn primary"
                onClick={handleSave}
                disabled={!form.title.trim() || !form.code.trim()}
                style={!form.title.trim() || !form.code.trim() ? { opacity: 0.4, cursor: "not-allowed" } : {}}
              >
                {modal.mode === "add" ? "Add Snippet" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 삭제 확인 모달 ────────────────────────────────────────────────────── */}
      {deleteId && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}>
          <div className="modal" style={{ maxWidth: 360, gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.red }}>Delete Snippet?</span>
            <p style={{ fontSize: 11, color: C.textSec, margin: 0 }}>
              이 작업은 되돌릴 수 없습니다.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button type="button" className="snip-btn" onClick={() => setDeleteId(null)}>Cancel</button>
              <button type="button" className="snip-btn danger" onClick={() => handleDelete(deleteId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSnippetIndex;
