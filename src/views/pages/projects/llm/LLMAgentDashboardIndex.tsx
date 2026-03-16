/**
 * LLMAgentDashboardIndex
 * chat-ui-kit-react 기반 LLM 어드민 채팅 대시보드
 */

import {
  MainContainer,
  Sidebar,
  ConversationList,
  Conversation,
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { useState, useCallback } from "react";
import type { ChatRoom, AIMessage } from "@/models/projects/llm/LLMAgentDashboardModel";
import { AIMessageMock, ChatRoomMock } from "@/mocks/projects/llm/LLMAgentMockData";

// ─── Mock 초기 데이터 ──────────────────────────────────────────────────────────

const INITIAL_ROOMS: ChatRoom[] = [
  {
    ...ChatRoomMock,
    chatRoomId: "room-001",
    sessionId: "sess-001",
    empNo: "EMP-001",
    createdAt: "2025-03-06T09:00:00Z",
    title: "React 성능 최적화",
    messages: [
      {
        ...AIMessageMock,
        messageId: "msg-001",
        questionDateTime: "2025-03-06T09:12:04Z",
        answerDateTime: "2025-03-06T09:12:07Z",
        answerFeedback: "good",
        requestMessage: {
          content: "React 앱에서 불필요한 리렌더링을 줄이려면 어떻게 해야 하나요?",
          sender: "user",
          direction: "outgoing",
        },
        responseMessage: {
          type: "text",
          sender: "ai",
          direction: "incoming",
          content:
            "React.memo, useCallback, useMemo를 조합해서 사용하세요. 특히 대형 리스트에서는 react-virtual 같은 가상화 라이브러리도 고려해볼 만합니다.",
          keywords: ["React.memo", "useCallback", "useMemo"],
          aiReason: "리렌더링 최적화 패턴 기반",
          tips: "React DevTools Profiler로 불필요한 렌더링을 시각적으로 확인하세요.",
          errorMessage: null,
        },
      },
      {
        ...AIMessageMock,
        messageId: "msg-002",
        questionDateTime: "2025-03-06T09:15:22Z",
        answerDateTime: "2025-03-06T09:15:25Z",
        answerFeedback: "none",
        requestMessage: {
          content: "useMemo와 useCallback의 차이가 뭔가요?",
          sender: "user",
          direction: "outgoing",
        },
        responseMessage: {
          type: "text",
          sender: "ai",
          direction: "incoming",
          content:
            "useMemo는 연산 결과값을 메모이제이션하고, useCallback은 함수 자체를 메모이제이션합니다. 자식 컴포넌트에 콜백을 넘길 때는 useCallback, 무거운 계산값을 캐싱할 때는 useMemo를 사용하세요.",
          keywords: ["useMemo", "useCallback", "메모이제이션"],
          aiReason: "React Hooks 동작 원리 기반",
          tips: null,
          errorMessage: null,
        },
      },
    ],
  },
  {
    ...ChatRoomMock,
    chatRoomId: "room-002",
    sessionId: "sess-002",
    empNo: "EMP-001",
    createdAt: "2025-03-06T10:30:00Z",
    title: "TypeScript 제네릭",
    messages: [
      {
        ...AIMessageMock,
        messageId: "msg-003",
        questionDateTime: "2025-03-06T10:30:11Z",
        answerDateTime: "2025-03-06T10:30:14Z",
        answerFeedback: "good",
        requestMessage: {
          content: "TypeScript 제네릭은 언제 사용하는 게 좋나요?",
          sender: "user",
          direction: "outgoing",
        },
        responseMessage: {
          type: "text",
          sender: "ai",
          direction: "incoming",
          content:
            "여러 타입에 동일한 로직을 적용할 때 사용합니다. API 응답 래퍼, 유틸리티 함수, 컴포넌트 Props 타입 등에 자주 활용됩니다.",
          keywords: ["TypeScript", "제네릭", "Generic"],
          aiReason: "TypeScript 공식 문서 기반",
          tips: "제네릭 제약(extends)을 활용하면 더 안전한 타입을 만들 수 있습니다.",
          errorMessage: null,
        },
      },
    ],
  },
];

// ─── 모델 타입 & 옵션 ──────────────────────────────────────────────────────────

type ModelId = "gpt-4o" | "claude-3.7" | "gemini-2.0" | "llama-3.3";

interface ModelOption {
  id: ModelId;
  label: string;
  color: string;
}

const MODELS: ModelOption[] = [
  { id: "gpt-4o",     label: "GPT-4o",     color: "#00ff88" },
  { id: "claude-3.7", label: "Claude 3.7", color: "#00c8ff" },
  { id: "gemini-2.0", label: "Gemini 2.0", color: "#ff8c00" },
  { id: "llama-3.3",  label: "Llama 3.3",  color: "#c084fc" },
];

// ─── Mock 응답 생성 ────────────────────────────────────────────────────────────

function generateResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("typescript") || q.includes("타입"))
    return "TypeScript에서는 명시적 타입 선언과 제네릭을 활용해 런타임 오류를 사전에 방지할 수 있습니다. any 타입 사용은 지양하고 unknown과 타입 가드를 조합하는 패턴을 권장합니다.";
  if (q.includes("react") || q.includes("컴포넌트"))
    return "React에서는 단일 책임 원칙에 따라 컴포넌트를 작게 유지하고, 상태는 최대한 가까운 곳에 두는 것이 핵심입니다. useEffect 남용을 피하고 파생 상태는 렌더링 중에 계산하세요.";
  if (q.includes("vite") || q.includes("빌드"))
    return "Vite는 ESM 기반의 네이티브 브라우저 모듈 시스템을 활용해 개발 서버 구동이 빠릅니다. 프로덕션 빌드는 Rollup을 사용하며, vite.config.ts에서 청크 분리 전략을 세밀하게 조정할 수 있습니다.";
  return "좋은 질문입니다. 해당 주제는 컨텍스트에 따라 여러 접근 방식이 있습니다. 구체적인 요구사항과 제약 조건을 함께 고려해서 최적의 방법을 선택하는 것이 중요합니다.";
}

// ─── Component ────────────────────────────────────────────────────────────────

const LLMAgentDashboardIndex = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>(INITIAL_ROOMS);
  const [activeRoomId, setActiveRoomId] = useState<string>(INITIAL_ROOMS[0].chatRoomId);
  const [selectedModelId, setSelectedModelId] = useState<ModelId>("claude-3.7");
  const [isTyping, setIsTyping] = useState(false);

  const activeRoom  = rooms.find((r) => r.chatRoomId === activeRoomId) ?? rooms[0];
  const activeModel = MODELS.find((m) => m.id === selectedModelId) ?? MODELS[0];

  // ── 새 채팅방 생성 ────────────────────────────────────────────────────────────
  const handleNewRoom = useCallback(() => {
    const newRoom: ChatRoom = {
      ...ChatRoomMock,
      chatRoomId: `room-${Date.now()}`,
      sessionId:  `sess-${Date.now()}`,
      empNo:      "EMP-001",
      createdAt:  new Date().toISOString(),
      title:      "새 대화",
      messages:   [],
    };
    setRooms((prev) => [newRoom, ...prev]);
    setActiveRoomId(newRoom.chatRoomId);
  }, []);

  // ── 메시지 전송 ───────────────────────────────────────────────────────────────
  const handleSend = useCallback(
    (content: string) => {
      if (!content.trim() || isTyping) return;

      const now = new Date().toISOString();

      const newMessage: AIMessage = {
        ...AIMessageMock,
        messageId:         `msg-${Date.now()}`,
        questionDateTime:  now,
        answerDateTime:    "",
        answerFeedback:    "none",
        requestMessage: {
          content:   content.trim(),
          sender:    "user",
          direction: "outgoing",
        },
        responseMessage: {
          type:         "text",
          sender:       "ai",
          direction:    "incoming",
          content:      null,   // 응답 오기 전까지 null
          keywords:     [],
          aiReason:     null,
          tips:         null,
          errorMessage: null,
        },
      };

      // 1. 사용자 메시지 먼저 렌더링
      setRooms((prev) =>
        prev.map((r) =>
          r.chatRoomId === activeRoomId
            ? {
                ...r,
                // 첫 메시지라면 제목 자동 설정
                title: r.messages.length === 0
                  ? content.slice(0, 24) + (content.length > 24 ? "…" : "")
                  : r.title,
                messages: [...r.messages, newMessage],
              }
            : r
        )
      );

      setIsTyping(true);

      // 2. 응답 시뮬레이션 (1.2s ~ 2s 딜레이)
      setTimeout(() => {
        const answerNow      = new Date().toISOString();
        const responseContent = generateResponse(content);

        setRooms((prev) =>
          prev.map((r) =>
            r.chatRoomId === activeRoomId
              ? {
                  ...r,
                  messages: r.messages.map((m) =>
                    m.messageId === newMessage.messageId
                      ? {
                          ...m,
                          answerDateTime: answerNow,
                          responseMessage: {
                            ...m.responseMessage,
                            content:  responseContent,
                            keywords: responseContent
                              .split(" ")
                              .filter((w) => w.length > 4)
                              .slice(0, 3),
                          },
                        }
                      : m
                  ),
                }
              : r
          )
        );

        setIsTyping(false);
      }, 1200 + Math.random() * 800);
    },
    [activeRoomId, isTyping]
  );

  // ── 피드백 ────────────────────────────────────────────────────────────────────
  const handleFeedback = useCallback(
    (messageId: string, feedback: "good" | "bad") => {
      setRooms((prev) =>
        prev.map((r) =>
          r.chatRoomId === activeRoomId
            ? {
                ...r,
                messages: r.messages.map((m) =>
                  m.messageId === messageId
                    ? {
                        ...m,
                        // 같은 버튼 다시 누르면 none으로 토글
                        answerFeedback: m.answerFeedback === feedback ? "none" : feedback,
                      }
                    : m
                ),
              }
            : r
        )
      );
    },
    [activeRoomId]
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div style={{ height: "100vh", fontFamily: "'IBM Plex Mono', monospace" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

        /* ── 전체 ── */
        .cs-main-container { background: #07090d !important; }

        /* ── 사이드바 ── */
        .cs-sidebar {
          background: #0c1018 !important;
          border-right: 1px solid #182030 !important;
          min-width: 240px !important;
          max-width: 240px !important;
        }
        .cs-conversation-list { background: transparent !important; }
        .cs-conversation {
          background: transparent !important;
          border-bottom: 1px solid rgba(24,32,48,0.6) !important;
          padding: 10px 14px !important;
          cursor: pointer !important;
          transition: background 0.1s !important;
        }
        .cs-conversation:hover { background: rgba(255,255,255,0.03) !important; }
        .cs-conversation.cs-conversation--active {
          background: #111822 !important;
          border-left: 2px solid #00c8ff !important;
        }
        .cs-conversation__name {
          color: #bfcfdf !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }
        .cs-conversation__info,
        .cs-conversation__info-content {
          color: #465a72 !important;
          font-size: 11px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }
        .cs-conversation__last-activity {
          color: #465a72 !important;
          font-size: 10px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }

        /* ── 채팅 컨테이너 ── */
        .cs-chat-container { background: #07090d !important; }

        /* ── 헤더 ── */
        .cs-conversation-header {
          background: #0c1018 !important;
          border-bottom: 1px solid #182030 !important;
          padding: 10px 20px !important;
          min-height: 48px !important;
        }
        .cs-conversation-header__user-name {
          color: #bfcfdf !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }
        .cs-conversation-header__info {
          color: #465a72 !important;
          font-size: 11px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }

        /* ── 메시지 리스트 ── */
        .cs-message-list { background: #07090d !important; padding: 16px !important; }

        /* ── 메시지 — 사용자 ── */
        .cs-message--outgoing .cs-message__content {
          background: #111822 !important;
          border: 1px solid #1e2e42 !important;
          color: #bfcfdf !important;
          font-size: 13px !important;
          font-family: 'IBM Plex Mono', monospace !important;
          border-radius: 6px 6px 2px 6px !important;
          padding: 10px 14px !important;
          max-width: 72% !important;
        }

        /* ── 메시지 — AI ── */
        .cs-message--incoming .cs-message__content {
          background: #0c1018 !important;
          border: 1px solid #182030 !important;
          color: #bfcfdf !important;
          font-size: 13px !important;
          font-family: 'IBM Plex Mono', monospace !important;
          border-radius: 6px 6px 6px 2px !important;
          padding: 10px 14px !important;
          max-width: 80% !important;
        }

        /* ── 발신자 이름 & 시간 ── */
        .cs-message__sender-name {
          color: #465a72 !important;
          font-size: 10px !important;
          font-family: 'IBM Plex Mono', monospace !important;
          text-transform: uppercase !important;
          letter-spacing: 0.06em !important;
        }
        .cs-message__sent-time {
          color: #253545 !important;
          font-size: 10px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }

        /* ── 메시지 Footer ── */
        .cs-message__footer { padding: 0 !important; }

        /* ── 구분선 ── */
        .cs-message-separator {
          color: #253545 !important;
          font-size: 10px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }
        .cs-message-separator::before,
        .cs-message-separator::after { background-color: #182030 !important; }

        /* ── 타이핑 인디케이터 ── */
        .cs-typing-indicator {
          background: #0c1018 !important;
          padding: 6px 20px !important;
          border-top: 1px solid #182030 !important;
        }
        .cs-typing-indicator__dot { background: #00c8ff !important; }
        .cs-typing-indicator__text {
          color: #465a72 !important;
          font-size: 11px !important;
          font-family: 'IBM Plex Mono', monospace !important;
        }

        /* ── 입력창 ── */
        .cs-message-input {
          background: #0c1018 !important;
          border-top: 1px solid #182030 !important;
          padding: 10px 16px !important;
        }
        .cs-message-input__content-editor-wrapper {
          background: #111822 !important;
          border: 1px solid #1e2e42 !important;
          border-radius: 4px !important;
        }
        .cs-message-input__content-editor {
          color: #bfcfdf !important;
          font-size: 13px !important;
          font-family: 'IBM Plex Mono', monospace !important;
          caret-color: #00c8ff !important;
        }
        .cs-message-input__content-editor-container { padding: 8px 12px !important; }
        [data-placeholder]::before {
          color: #465a72 !important;
          font-family: 'IBM Plex Mono', monospace !important;
          font-size: 12px !important;
        }
        .cs-button--send {
          background: transparent !important;
          border: 1px solid #1e2e42 !important;
          border-radius: 4px !important;
          transition: all 0.15s !important;
        }
        .cs-button--send:hover {
          border-color: #00c8ff !important;
          background: rgba(0,200,255,0.08) !important;
        }
        .cs-button--send svg { fill: #00c8ff !important; }

        /* ── 아바타 숨김 ── */
        .cs-avatar { display: none !important; }

        /* ── 스크롤바 ── */
        .scrollbar-container::-webkit-scrollbar { width: 3px; }
        .scrollbar-container::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-container::-webkit-scrollbar-thumb { background: #253545; border-radius: 2px; }
      `}</style>

      <MainContainer>

        {/* ── 사이드바 ─────────────────────────────────────────────────────────── */}
        <Sidebar position="left">

          {/* 사이드바 헤더 */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 14px", borderBottom: "1px solid #182030",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 22, height: 22, background: "#00ff88", borderRadius: 3,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: "#07090d" }}>LLM</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#bfcfdf", letterSpacing: "0.04em" }}>
                AgentDashboard
              </span>
            </div>
            <button
              type="button"
              onClick={handleNewRoom}
              aria-label="새 대화 시작"
              style={{
                width: 22, height: 22, borderRadius: 3, cursor: "pointer",
                background: "transparent", border: "1px solid #182030",
                color: "#465a72", fontSize: 16, lineHeight: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget).style.borderColor = "#00c8ff";
                (e.currentTarget).style.color = "#00c8ff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.borderColor = "#182030";
                (e.currentTarget).style.color = "#465a72";
              }}
            >
              +
            </button>
          </div>

          {/* 대화방 목록 */}
          <ConversationList>
            {rooms.map((room) => (
              <Conversation
                key={room.chatRoomId}
                name={room.title ?? "새 대화"}
                info={`${room.messages.length} messages`}
                lastActivityTime={
                  room.messages.length > 0
                    ? new Date(room.messages[room.messages.length - 1].questionDateTime).toLocaleTimeString(
                        "ko-KR",
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : undefined
                }
                active={room.chatRoomId === activeRoomId}
                onClick={() => setActiveRoomId(room.chatRoomId)}
              />
            ))}
          </ConversationList>
        </Sidebar>

        {/* ── 채팅 컨테이너 ────────────────────────────────────────────────────── */}
        <ChatContainer>

          {/* 헤더 */}
          <ConversationHeader>
            <ConversationHeader.Content
              userName={activeRoom.title ?? "새 대화"}
              info={`${activeModel.label} · ${activeRoom.messages.length} messages`}
            />
            <ConversationHeader.Actions>
              {/* 모델 선택 버튼 */}
              <div style={{ display: "flex", gap: 4 }}>
                {MODELS.map((model) => {
                  const isActive = selectedModelId === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModelId(model.id)}
                      style={{
                        padding: "3px 8px", borderRadius: 3, cursor: "pointer",
                        fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600,
                        border: "1px solid",
                        background:   isActive ? `${model.color}18` : "transparent",
                        borderColor:  isActive ? `${model.color}66` : "#182030",
                        color:        isActive ? model.color : "#465a72",
                        transition: "all 0.15s",
                      }}
                    >
                      {model.label}
                    </button>
                  );
                })}
              </div>
            </ConversationHeader.Actions>
          </ConversationHeader>

          {/* 메시지 목록 */}
          <MessageList
            typingIndicator={
              isTyping
                ? <TypingIndicator content={`${activeModel.label} is typing`} />
                : undefined
            }
          >
            {/* 대화가 없을 때 */}
            {activeRoom.messages.length === 0 && (
              <MessageSeparator content="대화를 시작하세요" />
            )}

            {activeRoom.messages.map((msg, idx) => {
              // 날짜 구분선 표시 여부
              const prevMsg    = idx > 0 ? activeRoom.messages[idx - 1] : null;
              const currentDate = new Date(msg.questionDateTime).toLocaleDateString("ko-KR");
              const prevDate    = prevMsg
                ? new Date(prevMsg.questionDateTime).toLocaleDateString("ko-KR")
                : null;

              return (
                <div key={msg.messageId}>
                  {/* 날짜가 바뀌면 구분선 표시 */}
                  {currentDate !== prevDate && (
                    <MessageSeparator content={currentDate} />
                  )}

                  {/* 사용자 메시지 */}
                  <Message
                    model={{
                      message:   msg.requestMessage.content,
                      sender:    "나",
                      direction: "outgoing",
                      position:  "single",
                      sentTime:  new Date(msg.questionDateTime).toLocaleTimeString("ko-KR", {
                        hour: "2-digit", minute: "2-digit",
                      }),
                    }}
                  />

                  {/* AI 응답 메시지 — content가 null이면 아직 로딩 중 */}
                  {msg.responseMessage.content !== null && (
                    <Message
                      model={{
                        message:   msg.responseMessage.content,
                        sender:    activeModel.label,
                        direction: "incoming",
                        position:  "single",
                        sentTime:  msg.answerDateTime
                          ? new Date(msg.answerDateTime).toLocaleTimeString("ko-KR", {
                              hour: "2-digit", minute: "2-digit",
                            })
                          : "",
                      }}
                    >
                      <Message.Footer>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, paddingTop: 6 }}>

                          {/* 키워드 태그 */}
                          {msg.responseMessage.keywords.length > 0 && (
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {msg.responseMessage.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  style={{
                                    fontSize: 9, padding: "1px 6px", borderRadius: 2,
                                    background: `${activeModel.color}12`,
                                    border: `1px solid ${activeModel.color}33`,
                                    color: activeModel.color,
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    letterSpacing: "0.04em",
                                  }}
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* 피드백 + 레이턴시 */}
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.messageId, "good")}
                              aria-label="좋아요"
                              aria-pressed={msg.answerFeedback === "good"}
                              style={{
                                background: "transparent", border: "none",
                                cursor: "pointer", fontSize: 13, padding: 0,
                                opacity: msg.answerFeedback === "good" ? 1 : 0.3,
                                transition: "opacity 0.15s",
                              }}
                            >
                              👍
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.messageId, "bad")}
                              aria-label="싫어요"
                              aria-pressed={msg.answerFeedback === "bad"}
                              style={{
                                background: "transparent", border: "none",
                                cursor: "pointer", fontSize: 13, padding: 0,
                                opacity: msg.answerFeedback === "bad" ? 1 : 0.3,
                                transition: "opacity 0.15s",
                              }}
                            >
                              👎
                            </button>

                            {/* 응답 시간 */}
                            {msg.answerDateTime && msg.questionDateTime && (
                              <span style={{
                                fontSize: 9, color: "#253545",
                                fontFamily: "'IBM Plex Mono', monospace",
                              }}>
                                {new Date(msg.answerDateTime).getTime() -
                                  new Date(msg.questionDateTime).getTime()}ms
                              </span>
                            )}
                          </div>

                        </div>
                      </Message.Footer>
                    </Message>
                  )}
                </div>
              );
            })}
          </MessageList>

          {/* 입력창 */}
          <MessageInput
            placeholder={
              isTyping
                ? "응답 생성 중..."
                : `${activeModel.label}에게 질문하세요 (Enter 전송)`
            }
            onSend={handleSend}
            disabled={isTyping}
            attachButton={false}
          />

        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default LLMAgentDashboardIndex;