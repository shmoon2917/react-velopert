벨로퍼트 리액트 강의 문서
https://react.vlpt.us/basic/06-conditional-rendering.html

# 1장 리액트 입문

### 1-5. props 를 통해 컴포넌트에게 값 전달하기

전달되는 `props` 의 기본값을 설정할 수 있다(defaultProps)

```
const Hello = ({ name, color }) => {
  ...
};

//
Hello.defaultProps = {
  name: "이름없음",
};
```

컴포넌트 태그 사이에 넣은 값을 조회하기 위해서는 `props.children` 을 조회하면 된다.

### 1.6 조건부 렌더링

컴포넌트의 props 값을 설정하게 될 때 이름만 작성하고 값 설정을 생략한다면 이를 `true`로 설정한 것으로 간주한다.

```
<Wrapper>
  <Hello name="react" isSpecial />
</Wrapper>
```

### 1.7 useState 를 통해 컴포넌트에서 바뀌는 값 관리하기

기초적인 팁: 이벤트 콜백을 정해줄 때 함수형태를 넣어주어야 하지, 함수를 다음과 같이 실행하면 안된다.

```
onClick={onIncrease()}

// 이렇게 하면 렌더링 하는 시점에 함수가 호출된다.
```

### 1.9 여러 개의 input 관리하기

객체 형태(name: value) 로 input 값들을 관리하기

```
  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };
```

### 1.11 배열 렌더링하기

key 값의 존재유무에 따른 배열 렌더링 방식(없을 때는 FILO 방식으로 수정됨, 있을 때는 고유 값을 가지고 수정 필요한 부분만 수정)

### 1.12 useRef 로 컴포넌트 안의 변수 만들기

useRef는 또 다른 용도로 컴포넌트 안에서 조회 및 수정할 수 있는 변수를 관리하는 기능이 있다.(값이 바뀐다고 해서 리렌더링되지 않는다)

setTimeout, setInterval 등을 통해서 만들어진 id / 외부 라이브러리를 사용하여 만들어진 인스턴스 / scroll 위치 등의 값을 관리할 수 있다.

### 1.16 useEffect 를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기

주로 마운트 시에 하는 작업들로는 다음과 같은 것들이 있음.

- `props` 로 받은 값을 컴포넌트의 로컬 상태로 설정
- 외부 API 요청 (REST API 등)
- 라이브러리 사용 (D3, Video.js 등)
- setInterval 을 통한 반복작업 또는 setTimeout 을 통한 작업 예약

언마운트 시에 하는 작업들로는

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

`useEffect` 안에서 사용하는 상태나 props 가 있다면, `useEffect` 의 `deps`에 넣어줘야 한다.(규칙)

(참고) 리액트 컴포넌트는 기본적으로 부모 컴포넌트가 리렌더링되면, 자식 컴포넌트도 리렌더링 된다. 물론 실제 DOM 에 변화가 반영되는 것은 바뀐 내용이 있는 컴포넌트만 해당되지만, Virtual DOM 에는 모든 걸 다 렌더링하고 있는 것이다. 나중에, 컴포넌트를 최적화하는 과정에서 기존의 내용을 그대로 사용하면서 Virtual DOM 에 렌더링하는 리소스를 아낄 수도 있다.

### 1.17 useMemo 를 사용하여 연산한 값 재사용하기

### 1.18 useCallback 을 사용하여 함수 재사용하기

### 1.19 React.memo 를 사용한 컴포넌트 리렌더링 방지

user 중 하나라도 수정하면 모든 User 컴포넌트와 CreateUser 컴포넌트도 리렌더링이 된다. 이유는 users 배열이 바뀔 때마다 onCreate, onToggle, onRemove 도 새로 만들어지기 때문.

이를 최적화하기 위해서는 어떻게 해야할까? 바로 deps 에서 `users`를 지우고, 함수에서 `users`를 참조하지 않게끔 하는 것이다 -> 바로 useState 의 함수형 업데이트!

### 1.20 useReducer 를 사용하여 상태 업데이트 로직 분리하기

기존에는 `useState`를 이용하여 컴포넌트 안에서 상태 관리를 하는 방법을 사용했었다면, 이제는 `useReducer`를 사용하여 컴포넌트의 상태 업데이트 로직을 컴포넌트로부터 분리시킬 수 있다.

useReducer 또는 useState 어떤 것을 사용하는지는 판단에 따라 하면 된다. 성능 상의 이점같은 게 있는 건 아니다.

### 1.21 Custom Hooks 만들기

컴포넌트를 만들다보면 반복되는 로직이 자주 발생하는데, 이러한 상황에는 커스텀 Hooks 를 만들어 반복되는 로직을 쉽게 재사용할 수 있다.

### 1.22 Context API 를 사용한 전역 값 관리
