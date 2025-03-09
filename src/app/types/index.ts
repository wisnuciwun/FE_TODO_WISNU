export type TodoProps = {
  id: number;
  completed: boolean;
  title: string;
  description: string;
  deadline: string;
  author: string;
};

export type TodoCardsProps = {
  todo: TodoProps;
  onDeleteTodo: (id: number) => void;
  onCompleteTodo: (id: number) => void;
};
