// =============================================================================
// LLM Agent Dashboard 전체 타입 정의
// 파일 경로: src/types/aiMessage.ts
//
// 구조 설계:
//   ChatRoom        → 방 식별 정보 (chatRoomId, sessionId, empNo)
//     └─ AIMessage[]  → 질문 + 응답 쌍이 순서대로 쌓임
//
// 분리 이유:
//   chatRoomId / sessionId / empNo 는 방 단위 정보이므로 ChatRoom 에 한 번만 존재
//   대화 내용(질문+응답)은 AIMessage 로 분리해 messages 배열에 쌓임
//   → 데이터 중복 없이 구조적으로 명확하게 관리
// =============================================================================

// -----------------------------------------------------------------------------
// Primitive Types (원시 유니온 타입)
// -----------------------------------------------------------------------------

/**
 * 메시지 발신자 구분
 * - "user" : 사용자가 보낸 메시지
 * - "ai"   : AI가 보낸 메시지
 */
type Sender = "user" | "ai";

/**
 * 메시지 방향 구분 (채팅 UI 말풍선 위치에 활용)
 * - "outgoing" : 내가 보낸 메시지 → 오른쪽 말풍선
 * - "incoming" : 상대방(AI)이 보낸 메시지 → 왼쪽 말풍선
 */
type Direction = "incoming" | "outgoing";

/**
 * AI 응답 콘텐츠 렌더링 타입
 * UI 컴포넌트가 이 값을 기준으로 렌더러를 분기함
 *
 * - "text"     : 일반 텍스트 응답
 * - "markdown" : 마크다운 형식 응답 (헤더, 리스트, 코드블록 등)
 * - "chart"    : 차트/그래프 형식 → content는 JSON 문자열로 파싱해서 사용
 * - "error"    : 에러 응답 → content는 null, errorMessage에 에러 내용
 *
 * ⚠️ "chart" | string 처럼 쓰면 string으로 collapse되어 타입 의미가 사라짐
 *    반드시 구체적인 리터럴 유니온으로만 정의할 것
 */
type ResponseMessageType = "text" | "markdown" | "chart" | "error";

/**
 * 답변에 대한 사용자 피드백
 * - "good" : 좋아요 (thumbs up)
 * - "bad"  : 싫어요 (thumbs down)
 * - "none" : 피드백 없음 (초기 상태)
 *
 * ⚠️ goodFlag / badFlag 두 개를 별도로 관리하면
 *    good="Y" & bad="Y" 동시에 true인 불가능한 상태가 타입상 허용됨
 *    → 단일 필드로 통합해서 상호 배타성을 타입 레벨에서 보장
 */
type AnswerFeedback = "good" | "bad" | "none";

// -----------------------------------------------------------------------------
// Message Interfaces (메시지 내용 인터페이스)
// -----------------------------------------------------------------------------

/**
 * 사용자 → AI 요청 메시지
 *
 * sender는 항상 "user", direction은 항상 "outgoing" 으로 고정
 * Extract<T, U> 패턴으로 다른 값 대입을 컴파일 타임에 차단
 * → 런타임 방어 로직 없이 타입만으로 잘못된 값 대입 불가
 */
export interface RequestMessage {
  /** 사용자가 입력한 실제 질문 텍스트 */
  content: string;

  /**
   * 발신자 — 항상 "user" 고정
   * Extract<Sender, "user"> 는 "user" 리터럴 타입만 허용
   * Sender 전체("user" | "ai")를 쓰면 실수로 "ai"를 넣어도 컴파일 통과됨
   */
  sender: Extract<Sender, "user">;

  /**
   * 말풍선 방향 — 항상 "outgoing" (오른쪽) 고정
   * Extract<Direction, "outgoing"> 는 "outgoing" 리터럴 타입만 허용
   */
  direction: Extract<Direction, "outgoing">;
}

/**
 * AI → 사용자 응답 메시지
 *
 * content 와 errorMessage 는 type 에 따라 둘 중 하나만 값을 가짐
 * - type === "error" → content: null,   errorMessage: string
 * - type !== "error" → content: string, errorMessage: null
 */
export interface ResponseMessage {
  /**
   * 응답 렌더링 타입
   * 컴포넌트에서 이 값으로 렌더러 분기:
   * - "chart"    → <ChartRenderer data={JSON.parse(content)} />
   * - "markdown" → <MarkdownRenderer content={content} />
   * - "text"     → <p>{content}</p>
   * - "error"    → <ErrorMessage message={errorMessage} />
   */
  type: ResponseMessageType;

  /**
   * 발신자 — 항상 "ai" 고정
   * Extract<Sender, "ai"> 는 "ai" 리터럴 타입만 허용
   */
  sender: Extract<Sender, "ai">;

  /**
   * 말풍선 방향 — 항상 "incoming" (왼쪽) 고정
   * Extract<Direction, "incoming"> 는 "incoming" 리터럴 타입만 허용
   */
  direction: Extract<Direction, "incoming">;

  /**
   * 응답 본문 텍스트
   * - type === "error"  일 때 → null
   * - type === "chart"  일 때 → JSON 문자열 (파싱 후 차트 컴포넌트에 전달)
   * - type === 그 외    일 때 → 실제 응답 텍스트
   */
  content: string | null;

  /**
   * AI 응답 도출 시 추출된 키워드 목록
   * string 단일값 대신 배열로 관리해야 렌더링·필터·검색에 바로 활용 가능
   * ex) ["React", "성능최적화", "useMemo"]
   */
  keywords: string[];

  /**
   * AI가 해당 답변을 도출한 근거/reasoning
   * 사용자에게 "왜 이 답변을 했는지" 투명성 제공용
   * 항상 제공되지 않을 수 있으므로 null 허용
   */
  aiReason: string | null;

  /**
   * 답변 관련 추가 팁 또는 참고사항
   * ex) "이 API는 React 18 이상에서만 동작합니다"
   * 없으면 null
   */
  tips: string | null;

  /**
   * 에러 발생 시 사용자에게 노출할 에러 메시지
   * - type === "error" 일 때만 string 값
   * - 정상 응답일 때는 null
   */
  errorMessage: string | null;
}

// -----------------------------------------------------------------------------
// AIMessage — 질문 + 응답 한 쌍 (ChatRoom 안에 배열로 쌓임)
// -----------------------------------------------------------------------------

/**
 * 질문 1개 + 응답 1개의 대화 단위
 *
 * ChatRoom.messages 배열의 원소 타입
 * 방 식별 정보(chatRoomId, sessionId, empNo)는 여기에 없음
 * → 모두 ChatRoom 에서 한 번만 관리하기 때문
 *
 * 사용 예시:
 *   const message: AIMessage = {
 *     messageId:       "msg-001",
 *     questionDateTime: "2025-03-06T09:12:04Z",
 *     answerDateTime:   "2025-03-06T09:12:07Z",
 *     answerFeedback:   "good",
 *     requestMessage:  { content: "React 최적화 방법은?", sender: "user", direction: "outgoing" },
 *     responseMessage: { type: "markdown", content: "...", ... },
 *   };
 */
export interface AIMessage {
  /**
   * 이 대화 단위의 고유 ID
   * 피드백 업데이트, 특정 메시지 참조 시 식별자로 사용
   * ex) "msg-20250306-001"
   */
  messageId: string;

  /**
   * 질문을 보낸 시각
   * ISO 8601 형식 권장: "2025-03-06T09:12:04Z"
   */
  questionDateTime: string;

  /**
   * AI 응답을 받은 시각
   * ISO 8601 형식 권장: "2025-03-06T09:12:07Z"
   * questionDateTime 과의 차이로 응답 소요시간(latency) 계산 가능
   */
  answerDateTime: string;

  /**
   * 이 답변에 대한 사용자 피드백
   * - "good" : 좋아요
   * - "bad"  : 싫어요
   * - "none" : 미응답 (초기값)
   */
  answerFeedback: AnswerFeedback;

  /**
   * 사용자 → AI 요청 메시지
   * sender: "user", direction: "outgoing" 으로 고정
   */
  requestMessage: RequestMessage;

  /**
   * AI → 사용자 응답 메시지
   * sender: "ai", direction: "incoming" 으로 고정
   * type 필드로 UI 렌더러 분기
   */
  responseMessage: ResponseMessage;
}

// -----------------------------------------------------------------------------
// ChatRoom — 방 식별 정보 + 대화 배열
// -----------------------------------------------------------------------------

/**
 * 채팅방 전체 구조
 *
 * 방 식별 정보를 한 곳에서만 관리하고
 * 대화는 messages 배열에 AIMessage 로 순서대로 쌓임
 *
 * 사용 예시:
 *   // 방 하나에 대화가 쌓이는 구조
 *   const room: ChatRoom = {
 *     chatRoomId: "room-001",
 *     sessionId:  "sess-abc",
 *     empNo:      "EMP-001",
 *     createdAt:  "2025-03-06T09:00:00Z",
 *     title:      "React 최적화 질문",
 *     messages:   [],
 *   };
 *
 *   // 새 대화 추가
 *   room.messages.push(newMessage);
 *
 *   // 여러 방 목록 관리
 *   const rooms: ChatRoom[] = [room1, room2, room3];
 */
export interface ChatRoom {
  /**
   * 채팅방 고유 ID
   * 여러 채팅방을 구분하는 기본 키
   * ex) "room-20250306-001"
   */
  chatRoomId: string;

  /**
   * 세션 ID
   * 로그인 세션 또는 연결 세션 단위 구분
   * 같은 채팅방이더라도 세션이 끊기면 새 sessionId 부여
   * ex) "sess_abc123xyz"
   */
  sessionId: string;

  /**
   * 사원 번호 (Employee Number)
   * 이 채팅방을 사용하는 사용자 식별자
   * ex) "EMP-20250"
   */
  empNo: string;

  /**
   * 채팅방 생성 시각
   * ISO 8601 형식 권장: "2025-03-06T09:00:00Z"
   */
  createdAt: string;

  /**
   * 채팅방 제목 (선택값)
   * 보통 첫 번째 질문 텍스트 앞부분을 잘라 자동 생성하거나
   * 사용자가 직접 수정 가능
   * ex) "React 최적화 관련 질문"
   */
  title?: string;

  /**
   * 이 방의 전체 대화 목록
   * 대화가 이루어질 때마다 AIMessage 가 배열 끝에 추가됨
   * 배열 인덱스 순서 = 대화 순서
   *
   * 새 방 생성 시 빈 배열([])로 초기화
   */
  messages: AIMessage[];
}

// -----------------------------------------------------------------------------
// ModelId / ModelOption — AI 모델 선택
// -----------------------------------------------------------------------------

/**
 * 지원하는 AI 모델 ID
 */
export type ModelId = 'gpt-4o' | 'claude-3.7' | 'gemini-2.0' | 'llama-3.3'

/**
 * 모델 선택 버튼에 사용되는 옵션 타입
 */
export interface ModelOption {
  id: ModelId
  label: string
  color: string
}