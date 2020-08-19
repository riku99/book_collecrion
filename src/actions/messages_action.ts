export const deleteMessage = {
  deleteSuccess: () => ({ type: "DELETE_SUCCESS_MESSAGE" as const }),
};

export type messagesActionType = ReturnType<typeof deleteMessage.deleteSuccess>;
