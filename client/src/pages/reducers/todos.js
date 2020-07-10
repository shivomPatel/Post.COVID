const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          url: action.url,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );

    case "REMOVE_TODO":
      let arr = [];
      for (var i = 0; i < state.length; i++) {
        if (state[i].id === action.id) {
          continue;
        } else {
          arr.push(state[i]);
        }
      }
      return arr;
    default:
      return state;
  }
};

export default todos;
