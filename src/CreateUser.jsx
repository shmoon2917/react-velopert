import React, { memo, useContext, useRef, useCallback } from "react";
import useInputs from "./hooks/useInputs";
import { UserDispatch, CREATE_USER } from "./App";

const CreateUser = memo(() => {
  console.log("createUser hooks 실행");
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    dispatch({ type: CREATE_USER, user });
    nextId.current += 1;
    reset();
  }, [username, email]);

  return (
    <>
      <input
        name="username"
        placeholder="이름"
        value={username}
        onChange={onChange}
      />
      <input
        name="email"
        placeholder="이메일"
        value={email}
        onChange={onChange}
      />
      <button onClick={onCreate}>제출</button>
    </>
  );
});

export default CreateUser;
