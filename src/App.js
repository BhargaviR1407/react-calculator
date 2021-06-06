import "./App.css";
import { useState, useEffect, React } from "react";
import NumberFormat from "react-number-format";

function App() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  const [show, setShow] = useState(false);

  const inputNum = (e) => {

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };
  

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      case "Sign Change":
        cal = String(parseFloat(preState) * (-1));
        break;
      case "Square":
        cal = String(parseFloat(preState) * parseFloat(preState));
        break;
      case "Square Root":
        cal = String(Math.sqrt(parseFloat(preState)));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };


  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  const minusPlus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  // const sqrt = (preState) => {
    
  //   for (var i = 0; i*i <= preState; i ++)
  //   {
  //     if( i*i === preState) {
  //       return i;
  //     }
  //   }
  //   return preState;
  // }


  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='screen'>
          {input !== "" || input === "0" ? (
            <NumberFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumberFormat
              value={preState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
       
        <div className='btn' onClick={inputNum}>
          1
        </div>
        <div className='btn' onClick={inputNum}>
          2
        </div>
        <div className='btn' onClick={inputNum}>
          3
        </div>
        <div className='btn' onClick={operatorType}>
          +
        </div>
        <div className='btn' onClick={inputNum}>
          4
        </div>
        <div className='btn' onClick={inputNum}>
          5
        </div>
        <div className='btn' onClick={inputNum}>
          6
        </div>
        <div className='btn' onClick={operatorType}>
          -
        </div>
        <div className='btn' onClick={inputNum}>
          7
        </div>
        <div className='btn' onClick={inputNum}>
          8
        </div>
        <div className='btn' onClick={inputNum}>
          9
        </div>
        <div className='btn' onClick={operatorType}>
          *
        </div>
         <div className='btn' onClick={reset}>
          AC
        </div>
        <div className='btn' onClick={inputNum}>
          0
        </div>
        <div className='btn' onClick={equals}>
          =
        </div>
        <div className='btn' onClick={operatorType}>
          /
        </div>
        <div className='btn1' onClick={minusPlus}>
        -/+
        </div>
        <div className='btn1' onClick={() => setShow(!show)}>
         Scientific Mode
        </div>
        {
          show ?
        <div className='wrapping'>
        <div className='btn2' onClick={operatorType}>
          Sign Change
        </div>
        <div className='btn2' onClick={operatorType}>
          Square
        </div>
        <div className='btn2' onClick={operatorType}>
          Square Root
        </div>
        </div>
        :
        null
        }
        
    </div>
    </div>
  );
}

export default App;
