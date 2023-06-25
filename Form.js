import React, { useState, useContext, useEffect } from "react";
import { addExpense, addNewExpense, getExpenses , updateExpense } from "../redux/ExpenseSlice";
import { useDispatch } from "react-redux";
import { context } from "./Context";

const Form = () => {
  const ctx = useContext(context);

  const [enteredExpense, setExpense] = useState("");
  const [enteredAmount, setAmount] = useState(0);
  const [enteredDetails, setDetails] = useState("");
  const [enteredDate, setDate] = useState(new Date("yyyy-mm-dd"));
  const dispatch = useDispatch();

  const expenseChangeHandler = (e) => {
    setExpense(e.target.value);
  };
  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };
  const detailsChangeHandler = (e) => {
    setDetails(e.target.value);
  };
  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const obj = {
      expense: enteredExpense,
      amount: enteredAmount,
      details: enteredDetails,
      date: enteredDate,
    };
    await dispatch(addNewExpense(obj));
    await dispatch(addExpense(obj));
    await dispatch(getExpenses());
    setAmount(0);
    setDate(new Date("yyyy-mm-dd"));
    setDetails("");
    setExpense("");
  };
  const updateButtonHandler = async()=>{
    const ID = ctx.id ;
    if(ID){
      const obj = {
        expense: enteredExpense,
        amount: enteredAmount,
        details: enteredDetails,
        date: enteredDate,
      };
      const final = {id : ID , obj : obj}
      // console.log(ID )
      // console.log(obj)
      await dispatch(updateExpense(final));
      await dispatch(getExpenses())
    }
  }

  useEffect(() => {
    if (ctx.editData) {
      // console.log("data to edit");
      // console.log(ctx.editData);
      setExpense(ctx.editData.expense);
      setAmount(ctx.editData.amount);
      setDate(ctx.editData.date);
      setDetails(ctx.editData.details);
    }
  }, [ctx.editData]);
  return (
    <>
      <div className="container">
        <button onClick={() => ctx.setFormTrue()}>Add Expense</button>
      </div>
      {ctx.showForm && (
        <div className="container">
          <form onSubmit={submitHandler} className="newExpenseForm">
            <input
              type="text"
              name="expense"
              placeholder="Expense Name"
              onChange={expenseChangeHandler}
              required
              style={{ gridArea: "name" }}
              value={enteredExpense}
            />
            <input
              type="number"
              name="amount"
              placeholder="Expense Amount"
              onChange={amountChangeHandler}
              required
              style={{ gridArea: "amount" }}
              value={enteredAmount}
            />
            <input
              type="text"
              name="details"
              placeholder="Add Description (Optional)"
              onChange={detailsChangeHandler}
              style={{ gridArea: "description", width: "43rem" }}
              value={enteredDetails}
            />
            <input
              type="date"
              value={enteredDate}
              name="date"
              onChange={dateChangeHandler}
              required
              style={{ gridArea: "date" }}
            />

            <div style={{ gridArea: "buttons" }}>
              <button
                type="button"
                onClick={() => {
                  ctx.setFormFalse();
                  ctx.setEdittingFalse();
                  setAmount(0);
                  setDate(new Date("yyyy-mm-dd"));
                  setDetails("");
                  setExpense("");
                }}
              >
                Cancel
              </button>
              <button type="button" disabled={!ctx.editting} onClick={updateButtonHandler}>
                Update
              </button>
              <button type="submit" disabled={ctx.editting}>
                +Add
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default Form;
