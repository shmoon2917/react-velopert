import React, { memo } from "react";

const CreateUser = memo(({ username, email, onChange, onCreate }) => {
  console.log("createUser hooks 실행", username, email);
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
