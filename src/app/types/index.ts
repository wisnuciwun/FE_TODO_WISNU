export type TodoProps = {
  id: number;
  completed: boolean;
  title: string;
  description: string;
};

export type TodoCardsProps = {
  todo: TodoProps;
  onDeleteTodo: (id: number) => void;
  onCompleteTodo: (id: number) => void;
};
