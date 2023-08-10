import React from 'react';
import TodoItem from './TodoItem';

class TodoApp extends React.Component {
  state = {
    todoInput: '',
    todos: []
  };

  componentDidMount() {
    this.loadFromLocalStorage();
    this.displayDateAndDay(); //현재 날짜 요일
  }

  //날짜, 요일을 반환하는 함수
  getTodayDateAndDay = () => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const months = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];
    const today = new Date();
    const month = months[today.getMonth()];
    const date = today.getDate();
    const dayOfWeek = daysOfWeek[today.getDay()];
    return { month, date, dayOfWeek };
  };

  //날짜와 요일을 표시하는 함수
  displayDateAndDay = () => {
    const { month, date, dayOfWeek } = this.getTodayDateAndDay();
    this.setState({ currentDate: `${month} ${date}일 (${dayOfWeek})` });
  };

  //할 일 항목의 완료 상태
  toggleTodoCompletion = index => {
    const todos = [...this.state.todos];
    todos[index].completed = !todos[index].completed;
    this.setState({ todos }, this.saveToLocalStorage);
  };

  //새로운 항목 추가
  addTodo = () => {
    const { todoInput, todos } = this.state;
    if (todoInput.trim() !== '') {
      const newTodo = { text: todoInput, completed: false };
      this.setState({ todos: [...todos, newTodo], todoInput: '' }, this.saveToLocalStorage);
    }
  };

  //항목 삭제
  deleteTodo = index => {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({ todos }, this.saveToLocalStorage);
  };

  //항목 텍스트 수정
  editTodo = (index, newText) => {
    const todos = [...this.state.todos];
    if (todos[index].text !== newText) {
      todos[index].text = newText;
      this.setState({ todos }, this.saveToLocalStorage);
    }
  };

  //로컬 스토리지에 저장
  saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  //로컬 스토리지에서 항목 불러옴
  loadFromLocalStorage = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    }
  };

  render() {
    const { todoInput, todos, currentDate } = this.state;

    return (
      <div>
        <p>site name</p>
        <h2>{currentDate}</h2>
        <h1>오늘</h1>

        <div id="todoContainer">
          <input
            type="text"
            value={todoInput}
            onChange={e => this.setState({ todoInput: e.target.value })}
            placeholder="할 일을 입력하세요"
          />
          <button onClick={this.addTodo}>추가</button>
        </div>
        <ul>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              toggleTodoCompletion={this.toggleTodoCompletion}
              editTodo={this.editTodo}
              deleteTodo={this.deleteTodo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
