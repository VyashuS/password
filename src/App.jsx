import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [charAllow, setCharAllowed] = useState(false);
  const [numberAllow, setNumberAllow] = useState(false);

  const passwordGe = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllow) str += "!@#$%^&*(){}><?:*-+_][";
    if (numberAllow) str += "123456789";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      console.log(char);
      pass += str.charAt(char);
    }
    return setPassword(pass);
  }, [length, charAllow, numberAllow]);

  const referance = useRef(null);

  const handleClick = () => {
    referance.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordGe();
  }, [length, charAllow, numberAllow]);

  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="pass">
          <input
            className="input"
            type="text"
            value={password}
            ref={referance}
            readOnly
          />
          <button onClick={handleClick}>Copy</button>
        </div>
        <div className="deep">
          <div>
            <input
              className="range"
              type="range"
              min={8}
              max={40}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text">Length : {length}</label>
          </div>
          <div>
            <input
              defaultChecked={charAllow}
              type="checkbox"
              value={charAllow}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="text">Character</label>
          </div>
          <div>
            <input
              defaultChecked={numberAllow}
              type="checkbox"
              value={numberAllow}
              onChange={() => {
                setNumberAllow((pre) => !pre);
              }}
            />
            <label className="text">Number</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
