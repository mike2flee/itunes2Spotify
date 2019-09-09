import { counterActions } from "../actions/counterActions";

const initialState = {
  count: 0
};

export default function counterReducer(state = initialState, actions) {
  switch (actions.type) {
    case counterActions.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case counterActions.SUB:
      return Object.assign({}, state, {
        count: state.count - 1
      });
    default:
      return state;
  }
}
