import "./styles.css";
import { useReducer } from "react";
import { produce } from "immer";

const INCREMENT_BY_ONE = "increase_by_one";
const DECREMENT_BY_ONE = "decrease_by_one";
const HANDLE_CHANGE = "handle_change_of_input";
const ADD_FORM_SUBMISSION = "add_form_submission";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_BY_ONE:
      state.count = state.count + 1;
      return;
    //   return {
    //     ...state,
    //     count: state.count + 1,
    //   };
    case DECREMENT_BY_ONE:
      state.count = state.count - 1;
      return;
    //   return {
    //     ...state,
    //     count: state.count - 1,
    //   };
    case HANDLE_CHANGE:
      state.valueToAdd = action.payload;
      return;
    //   return {
    //     ...state,
    //     valueToAdd: action.payload,
    //   };
    case ADD_FORM_SUBMISSION:
      state.count = state.count + state.valueToAdd;
      state.valueToAdd = "";
      return;
    //   return {
    //     ...state,
    //     count: state.count + state.valueToAdd,
    //     valueToAdd: "",
    //   };
    default:
      return;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(produce(reducer), {
    count: 0,
    valueToAdd: "",
  });
  // const [count, setCount] = useState(0);
  // const [valueToAdd, setValueToAdd] = useState('');

  const handleIncrement = () => {
    // setCount((count) => count + 1);
    dispatch({
      type: INCREMENT_BY_ONE,
    });
  };

  const handleDecrement = () => {
    dispatch({
      type: DECREMENT_BY_ONE,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: ADD_FORM_SUBMISSION,
    });
    // setCount((count) => count + valueToAdd);
    // setValueToAdd((valueToAdd) => "");
  };

  const handleChange = (event) => {
    const valueInBox = parseInt(event.target.value) || 0;
    // setValueToAdd((valueToAdd) => valueInBox);

    dispatch({
      type: HANDLE_CHANGE,
      payload: valueInBox,
    });
  };

  return (
    <div className="App">
      <h1>Count : {state.count}</h1>
      <button onClick={handleIncrement} type="button">
        Increment
      </button>
      <br />
      <button onClick={handleDecrement} type="button">
        Decrement
      </button>

      <h2>Add Bulk</h2>

      <form onSubmit={handleSubmit}>
        <input value={state.valueToAdd} type="number" onChange={handleChange} />
        <button type="submit">Add Bulk</button>
      </form>
    </div>
  );
}
