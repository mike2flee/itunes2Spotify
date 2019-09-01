export const counterActions = {
  ADD: "ADD",
  SUB: "SUB"
};

export const counterActionFunctions = {
  add: () => ({
    type: counterActions.ADD
  }),
  sub: () => ({
    type: counterActions.SUB
  })
};
