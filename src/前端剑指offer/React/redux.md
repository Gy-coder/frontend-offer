# Redux详解

## 全局state的读写

使用context，具体用法本文不做介绍

```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const appContext = createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "jack", age: "19" },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <span>user:{appState.user.name}</span>;
};
const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) => {
    appState.user.name = e.target.value;
    setAppState({ ...appState });
  };
  return <input type="text" value={appState.user.name} onChange={onChange} />;
};
export default App;

```

## reducer规范

```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const appContext = createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "jack", age: "19" },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <span>user:{appState.user.name}</span>;
};
const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) =>
    setAppState(
      reducer(appState, {
        type: "updateUser",
        payload: { name: e.target.value },
      })
    );
  return <input type="text" value={appState.user.name} onChange={onChange} />;
};
export default App;

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

```

## dispatch

```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const appContext = createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "jack", age: "19" },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier />
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <span>user:{appState.user.name}</span>;
};
const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext);
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return <input type="text" value={appState.user.name} onChange={onChange} />;
};
export default App;

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

const dispatch = (action) => {
  setAppState(reducer(appState, action));
};
```

**理想很丰满，但是无法拿到appState和setAppState**

**如何解决: 在userModifier外封装一个组件，通过props传值解决问题**

```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const appContext = createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "jack", age: "19" },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <Wrapper />
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <span>user:{appState.user.name}</span>;
};
const UserModifier = ({ dispatch, state }) => {
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return <input type="text" value={state.user.name} onChange={onChange} />;
};
export default App;

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

const Wrapper = () => {
  const { appState, setAppState } = useContext(appContext);
  const dispatch = (action) => {
    setAppState(reducer(appState, action));
  };
  return <UserModifier dispatch={dispatch} state={appState} />;
};
```

## connect

**connect会创建一个组件，这个让组件与链接全局状态链接起来**

**高阶组件: 接受组件作为参数，然后返回一个组件**


```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const appContext = createContext(null);
const App = () => {
  const [appState, setAppState] = useState({
    user: { name: "jack", age: "19" },
  });
  const contextValue = { appState, setAppState };
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier>内容</UserModifier>
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const { appState } = useContext(appContext);
  return <span>user:{appState.user.name}</span>;
};

export default App;

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

const connect = (Component) => {
  return (props) => {
    const { appState, setAppState } = useContext(appContext);
    const dispatch = (action) => {
      setAppState(reducer(appState, action));
    };
    return <Component {...props} dispatch={dispatch} state={appState} />;
  };
};

const UserModifier = connect(({ dispatch, state, children }) => {
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return (
    <>
      {children}:
      <input type="text" value={state.user.name} onChange={onChange} />
    </>
  );
});

```

## 优化connect

我们输在input上输入，通过log会发现所有的组件都刷新了，实际上只有用到user和dispatch的需要刷新，因此需要优化

**我们外置一个store，并且把数据都放到store上，显示没有问题，但是输入之后不刷新了**

```js
import React, { createContext, useContext, useState } from "react";
import "./App.css";

const store = {
  state: { user: { name: "jack", age: "19" } },
  setState(newState) {
    store.state = newState;
  },
};

const appContext = createContext(null);
const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier>内容</UserModifier>
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = () => {
  const store = useContext(appContext);
  return <span>user:{store.state.user.name}</span>;
};

export default App;

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

const connect = (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };
    return <Component {...props} dispatch={dispatch} state={store.state} />;
  };
};

const UserModifier = connect(({ dispatch, state, children }) => {
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return (
    <>
      {children}:
      <input type="text" value={state.user.name} onChange={onChange} />
    </>
  );
});
```

**使用订阅来进行刷新**

```js
import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";

const store = {
  state: { user: { name: "jack", age: "19" } },
  listeners: [],
  setState(newState) {
    store.state = newState;
    store.listeners.forEach((fn) => fn(store.state));
  },
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

const connect = (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };
    return <Component {...props} dispatch={dispatch} state={store.state} />;
  };
};

const appContext = createContext(null);
const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};

const 大儿子 = () => (
  <section>
    大儿子
    <User />
  </section>
);
const 二儿子 = () => (
  <section>
    二儿子
    <UserModifier>内容</UserModifier>
  </section>
);
const 小儿子 = () => <section>小儿子</section>;
const User = connect(({ state, dispatch }) => {
  return <span>user:{state.user.name}</span>;
});

const UserModifier = connect(({ dispatch, state, children }) => {
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return (
    <>
      {children}:
      <input type="text" value={state.user.name} onChange={onChange} />
    </>
  );
});

export default App;
```

至此 我们已经实现了大多数redux的功能 下一步 我们将会抽离redux

## 抽离

```js
import React, { createContext, useContext, useEffect, useState } from "react";

export const store = {
  state: { user: { name: "jack", age: "19" } },
  listeners: [],
  setState(newState) {
    store.state = newState;
    store.listeners.forEach((fn) => fn(store.state));
  },
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

export const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};

export const connect = (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };
    return <Component {...props} dispatch={dispatch} state={store.state} />;
  };
};

export const appContext = createContext(null);
```

## selector


**selector可以使connect使用局部的store，具体用法如下** 

```js
const User = connect((state) => {
  return { user: state.user };
})(({ user }) => {
  return <span>user:{user.name}</span>;
});

const UserModifier = connect()(({ dispatch, state, children }) => {
  const onChange = (e) =>
    dispatch({ type: "updateUser", payload: { name: e.target.value } });
  return (
    <>
      {children}:
      <input type="text" value={state.user.name} onChange={onChange} />
    </>
  );
});
```

**源代码如下,changed函数用于检验新数据和老数据是否不同**

```js
const changed = (oldState, newState) => {
  let isChange = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      isChange = true;
    }
  }
  return isChange;
};
export const connect = (selector) => (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(store.state) : { state: store.state };
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newData = selector
          ? selector(store.state)
          : { state: store.state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscribe;
    }, [selector]);
    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };
    return <Component {...props} {...data} dispatch={dispatch} />;
  };
};
```

## mapDispatchToProps

**dispatcher的选择器 方便抽离读写数据的接口**

```js
const UserModifier = connect(null, (dispatch) => {
  return {
    updateUser: (attrs) => {
      dispatch({ type: "updateUser", payload: attrs });
    },
  };
})(({ updateUser, state, children }) => {
  const onChange = (e) => {
    updateUser({ name: e.target.value });
  };
  return (
    <>
      {children}:
      <input type="text" value={state.user.name} onChange={onChange} />
    </>
  );
});
```

```js
export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    const dispatch = (action) => {
      store.setState(reducer(store.state, action));
    };
    const data = selector ? selector(store.state) : { state: store.state };
    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(dispatch)
      : { dispatch: dispatch };
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newData = selector
          ? selector(store.state)
          : { state: store.state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscribe;
    }, [selector]);

    return <Component {...props} {...data} {...dispatchers} />;
  };
};
```

## 对connect的优化 抽离读写接口

connect.js的代码如下

```js
import { connect } from "../redux";

const userSelector = (state) => {
  return {
    user: state.user,
  };
};

const userDispatcher = (dispatch) => {
  return {
    updateUser: (attrs) => dispatch({ type: "updateUser", payload: attrs }),
  };
};

export const connectToUser = connect(userSelector, userDispatcher);
```

使用connectToUser

```js
const User = connectToUser(({ user }) => {
  return <span>user:{user.name}</span>;
});

const UserModifier = connectToUser(({ updateUser, user, children }) => {
  const onChange = (e) => {
    updateUser({ name: e.target.value });
  };
  return (
    <>
      {children}:
      <input type="text" value={user.name} onChange={onChange} />
    </>
  );
});
```

## createStore

**目前我们的代码有一个问题，就是store是写死的，下面我们就改进这个问题**


```js
import React, { createContext, useContext, useEffect, useState } from "react";

const store = {
  state: undefined,
  reducer: undefined,
  listeners: [],
  setState(newState) {
    store.state = newState;
    store.listeners.forEach((fn) => fn(store.state));
  },
  subscribe(fn) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  },
};

const changed = (oldState, newState) => {
  let isChange = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      isChange = true;
    }
  }
  return isChange;
};

export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    const dispatch = (action) => {
      store.setState(store.reducer(store.state, action));
    };
    const data = selector ? selector(store.state) : { state: store.state };
    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(dispatch)
      : { dispatch: dispatch };
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newData = selector
          ? selector(store.state)
          : { state: store.state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscribe;
    }, [selector]);
    return <Component {...props} {...data} {...dispatchers} />;
  };
};

export const createStore = (reducer, initState) => {
  store.state = initState;
  store.reducer = reducer;
  return store;
};

export const appContext = createContext(null);
```

使用createStore

```js
const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};
let store = createStore(reducer, {
  user: { name: "jack", age: "19" },
  group: { name: "前端组" },
});

const App = () => {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </appContext.Provider>
  );
};
```

## provider

封装provider

```js
const appContext = createContext(null);

export const Provider = ({ store, children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};

```

代码使用

```js
import React from "react";
import "./App.css";
import { Provider, createStore, connect } from "./redux";
import { connectToUser } from "./connect/connect";

const reducer = (state, { type, payload }) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: { ...state.user, ...payload },
    };
  } else {
    return state;
  }
};
let store = createStore(reducer, {
  user: { name: "jack", age: "19" },
  group: { name: "前端组" },
});

const App = () => {
  return (
    <Provider store={store}>
      <大儿子 />
      <二儿子 />
      <小儿子 />
    </Provider>
  );
};
```

## 重构redux 使得redux与官网文档保持一致

```js
import React, { createContext, useContext, useEffect, useState } from "react";

let state = undefined;
let reducer = undefined;
let listeners = [];
const setState = (newState) => {
  state = newState;
  listeners.forEach((fn) => fn(state));
};

const store = {
  getState() {
    return state;
  },
  dispatch: (action) => {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  },
};

const changed = (oldState, newState) => {
  let isChange = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      isChange = true;
    }
  }
  return isChange;
};

export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : { state: state };
    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(store.dispatch)
      : { dispatch: store.dispatch };
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newData = selector ? selector(state) : { state: state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscribe;
    }, [selector]);
    return <Component {...props} {...data} {...dispatchers} />;
  };
};

export const createStore = (_reducer, initState) => {
  state = initState;
  reducer = _reducer;
  return store;
};

const appContext = createContext(null);

export const Provider = ({ store, children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
```

## 改造dispatch 使其支持异步代码


```js
const store = {
  getState() {
    return state;
  },
  dispatch: (action) => {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  },
};

let preDispatch = store.dispatch;

store.dispatch = (action) => {
  if (typeof action === "function") {
    action(store.dispatch);
  } else {
    preDispatch(action);
  }
};
```

**如何使用**


```js
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { name: "3秒后的frank" } });
    }, 3000);
  });
};

const fetchUser = (dispatch) => {
  ajax("/user").then((response) => {
    dispatch({ type: "updateUser", payload: response.data });
  });
};

const UserModifier = connect(
  null,
  null
)(({ state, dispatch }) => {

  const onClick = (e) => {
    dispatch(fetchUser);
  };
  return (
    <>
      <div>User: {state.user.name}</div>
      <button onClick={onClick}>异步获取 user</button>
    </>
  );
});
```

## dispatch 支持 promise

```js
const store = {
  getState() {
    return state;
  },
  dispatch: (action) => {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  },
};

let preDispatch = store.dispatch;

store.dispatch = (action) => {
  if (typeof action === "function") {
    action(store.dispatch);
  } else {
    preDispatch(action);
  }
};

const preDispatch2 = store.dispatch;

store.dispatch = (action) => {
  if (action.payload instanceof Promise) {
    action.payload.then((data) => store.dispatch({ ...action, payload: data }));
  } else {
    preDispatch2(action);
  }
};
```

**使用**

```js
const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { name: "3秒后的frank" } });
    }, 3000);
  });
};

const fetchUser = (dispatch) => {
  ajax("/user").then((response) => {
    dispatch({ type: "updateUser", payload: response.data });
  });
};

const UserModifier = connect(
  null,
  null
)(({ state, dispatch }) => {

  const onClick = (e) => {

    dispatch({
      type: "updateUser",
      payload: ajax("/user").then((response) => response.data),
    });
  };
  return (
    <>

      <div>User: {state.user.name}</div>
      <button onClick={onClick}>异步获取 user</button>
    </>
  );
});
```

# 最终源代码

```js

import React, { createContext, useContext, useEffect, useState } from "react";

let state = undefined;
let reducer = undefined;
let listeners = [];
const setState = (newState) => {
  state = newState;
  listeners.forEach((fn) => fn(state));
};

const store = {
  getState() {
    return state;
  },
  dispatch: (action) => {
    setState(reducer(state, action));
  },
  subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  },
};

let preDispatch = store.dispatch;

store.dispatch = (action) => {
  if (typeof action === "function") {
    action(store.dispatch);
  } else {
    preDispatch(action);
  }
};

const preDispatch2 = store.dispatch;

store.dispatch = (action) => {
  if (action.payload instanceof Promise) {
    action.payload.then((data) => store.dispatch({ ...action, payload: data }));
  } else {
    preDispatch2(action);
  }
};

const changed = (oldState, newState) => {
  let isChange = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      isChange = true;
    }
  }
  return isChange;
};

export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    const store = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : { state: state };
    const dispatchers = mapDispatchToProps
      ? mapDispatchToProps(store.dispatch)
      : { dispatch: store.dispatch };
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        const newData = selector ? selector(state) : { state: state };
        if (changed(data, newData)) {
          update({});
        }
      });
      return unsubscribe;
    }, [selector]);
    return <Component {...props} {...data} {...dispatchers} />;
  };
};

export const createStore = (_reducer, initState) => {
  state = initState;
  reducer = _reducer;
  return store;
};

const appContext = createContext(null);

export const Provider = ({ store, children }) => {
  return <appContext.Provider value={store}>{children}</appContext.Provider>;
};
```