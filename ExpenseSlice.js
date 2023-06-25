import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signup = createAsyncThunk("signupAction", async (obj) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAktK8gV4fKTIBA2Agv7w3yNnTcHgr3ass",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

export const login = createAsyncThunk("loginAction", async (obj) => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAktK8gV4fKTIBA2Agv7w3yNnTcHgr3ass",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

export const addNewExpense = createAsyncThunk("addNewExpense", async (obj) => {
  const userName = localStorage.getItem("user");
  const response = await fetch(
    `https://expennse-default-rtdb.firebaseio.com/user/${userName}.json`,
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

export const getExpenses = createAsyncThunk("getExpenses", async () => {
  const userName = localStorage.getItem("user");
  const response = await fetch(
    `https://expennse-default-rtdb.firebaseio.com/user/${userName}.json`
  );
  const data = await response.json();
  return data;
});

export const deleteExpense = createAsyncThunk("deleteExp", async (id) => {
  const userName = localStorage.getItem("user");
  const response = await fetch(
    `https://expennse-default-rtdb.firebaseio.com/user/${userName}/${id}.json`,
    {
      method: "DELETE",
    }
  );
  const data = response.json();
  return data;
});

export const updateExpense = createAsyncThunk( "updateAction" , async(obj)=>{
  const userName = localStorage.getItem("user");
  console.log(obj)
  const id = obj.id ;
  const expObj = obj.obj ;
  const response = await fetch(`https://expennse-default-rtdb.firebaseio.com/user/${userName}/${id}.json` , {
    method : 'PUT' , 
    body : JSON.stringify(expObj),
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  const data = await response.json()
  return data ;
})

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    id: null,
    allExpensesObj: {},
    allExpense: [],
    loginStatus: { status: false, token: null, error: null, user: null },
  },
  reducers: {
    addExpense: (state, action) => {
      return { ...state, allExpense: [...state.allExpense, action.payload] };
    },
    logout: (state, action) => {
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        loginStatus: { status: false, token: null, error: null, user: null },
      };
    },
    initialLoading: (state, action) => {
      const loginToken = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      return {
        ...state,
        loginStatus: {
          status: true,
          token: loginToken,
          error: null,
          user: user,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload.idToken) {
        localStorage.setItem("login", true);
        localStorage.setItem("token", action.payload.idToken);
        let user = action.payload.email.replace(/\./g, "");
        localStorage.setItem("user", user);

        return {
          ...state,
          loginStatus: {
            status: true,
            token: action.payload.idToken,
            error: null,
            user: user,
          },
        };
      } else {
        // console.log(action.payload);
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log(action.payload);
      if (action.payload.idToken) {
        let email = action.payload.email;
        let user = email.replace(/\./g, ""); //IMP THING TO REMEMBER - add \
        localStorage.setItem("login", true);
        localStorage.setItem("token", action.payload.idToken);
        localStorage.setItem("user", user);
        return {
          ...state,
          loginStatus: {
            status: true,
            token: action.payload.idToken,
            error: null,
            user: user,
          },
        };
      }
      if (action.payload.error) {
        // console.log(action.payload.error.message);
        return {
          ...state,
          loginStatus: {
            status: false,
            token: null,
            error: action.payload.error,
            user: null,
          },
        };
      }
    });
    builder.addCase(addNewExpense.fulfilled, (state, action) => {
      // console.log(action.payload);
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      // console.log(action.payload);
      return {
        ...state,
        allExpensesObj: action.payload,
      };
    });
  },
});
export const { addExpense, logout, initialLoading } = expenseSlice.actions;
export default expenseSlice.reducer;
