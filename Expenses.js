import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, getExpenses } from "../redux/ExpenseSlice";
import React, { useContext } from "react";
import {context} from './Context'

// let id = 100;

const Expenses = () => {
  const ctx = useContext(context)
  const dispatch = useDispatch();
  // const exp = useSelector((state) => {
  //   return state.allExpense;
  // });
  const expObj = useSelector((state) => {
    return state.allExpensesObj;
  });
  let expArr;
  if (expObj) {
    expArr = Object.keys(expObj);
  }
  console.log(expArr);
  const editButtonHandler = (id , obj) => {
    let buttonObj = obj;
    // console.log(id , buttonObj);
    ctx.setEdittingTrue();
    ctx.setFormTrue();
    ctx.setEditData(obj)
    ctx.editIdHandler(id)
  };
  const deleteButtonHandler = async (id, obj) => {
    let buttonObj = obj;
    // console.log(buttonObj, id);
    alert("are you sure you want to delete this expense");
    // console.log("after alert");
    await dispatch(deleteExpense(id));
    await dispatch(getExpenses());

  };
  return (
    <React.Fragment>
      <ul className="expCards">
        {expArr &&
          expArr.map((id) => {
            // console.log("rendering all expenses" , expObj[id])
            return (
              <div className="card" key={id}>
                <div className="container">
                  <h2>₹ {expObj[id].amount}</h2>
                </div>
                <main>
                  <div>
                    <h3>Expense :- {expObj[id].expense}</h3>
                    <h3>Date : {expObj[id].date}</h3>
                    <p className="description">
                      Description :- {expObj[id].details}
                    </p>
                  </div>
                </main>
                <footer className="container">
                  <button
                    className="editButton"
                    onClick={() => {
                      deleteButtonHandler(id, expObj[id]);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="editButton"
                    onClick={() => {
                      editButtonHandler(id , expObj[id]);
                    }}
                  >
                    Edit
                  </button>
                </footer>
              </div>
            );
          })}
      </ul>
    </React.Fragment>
  );
};

export default Expenses;
