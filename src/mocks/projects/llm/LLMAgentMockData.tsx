import type { ChatRoom, AIMessage } from "@models/projects/llm/LLMAgentDashboardModel";

// -----------------------------------------------------------------------------
// AIMessage Mock — 대화 단위 초기값
// 새 메시지 생성 시 스프레드로 덮어쓰는 기본 템플릿으로 활용
// ex) const newMessage: AIMessage = { ...AIMessageMock, messageId: "msg-001", ... }
// -----------------------------------------------------------------------------
export const AIMessageMock: AIMessage = {
  messageId: "",
  questionDateTime: "",
  answerDateTime: "",
  answerFeedback: "none",
  requestMessage: {
    content: "",
    sender: "user",
    direction: "outgoing",
  },
  responseMessage: {
    type: "text",
    sender: "ai",
    direction: "incoming",
    content: null,
    keywords: [],
    aiReason: null,
    tips: null,
    errorMessage: null,
  },
};

// -----------------------------------------------------------------------------
// ChatRoom Mock — 채팅방 초기값
// 새 방 생성 시 스프레드로 덮어쓰는 기본 템플릿으로 활용
// ex) const newRoom: ChatRoom = { ...ChatRoomMock, chatRoomId: "room-001", ... }
// -----------------------------------------------------------------------------
export const ChatRoomMock: ChatRoom[] = [

    
];