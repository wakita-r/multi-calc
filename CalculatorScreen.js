import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Box, Menu } from "native-base";
import Button from "./Button";
import Decimal from "decimal.js";
import Ionicons from "react-native-vector-icons/Ionicons";

class History {
  constructor(formula, result) {
    this.formula = formula;
    this.result = result;
  }
}

const Calculator = () => {
  const [historyList, setHistory] = useState([]); // 入力の履歴
  const [formulaText, setFormulaText] = useState(""); // 計算式のテキスト

  const [value, setValue] = useState("0"); // 現在の入力値
  const [operator, setOperator] = useState(null); // 四則演算子
  const [prevValue, setPrevValue] = useState(null); // 前回の入力値
  const [isResult, setIsResult] = useState(false); // 計算結果

  const addHistory = (history) => {
    setHistory([...historyList, history]);
  };

  // 数値押下時イベント
  const handleNumber = (number) => {
    // 計算結果が式として表示されている場合は計算式を削除する
    if (formulaText.charAt(formulaText.length - 1) === "=") {
      setFormulaText("");
    }
    if (value === "0" || isResult) {
      setValue(number.toString());
    } else {
      setValue(value + number.toString());
    }
    setIsResult(false);
  };

  // 四則演算子押下時イベント
  const handleOperator = (nextOperator) => {
    const calcValue1 = prevValue;
    const calcValue2 = parseFloat(value);

    let formula = `${calcValue2} ${nextOperator}`;

    let nextPrevValue = parseFloat(value);
    let tmpResultString = "0";

    if (calcValue2 !== null && operator !== null) {
      let tmpResult = calcFormula(calcValue1, calcValue2, operator);
      nextPrevValue = tmpResult;
      tmpResultString = tmpResult.toString();

      formula = `${tmpResultString} ${nextOperator}`;
    }

    setFormulaText(formula);
    setPrevValue(nextPrevValue);
    setOperator(nextOperator);
    setValue(tmpResultString);
    setIsResult(true);
  };

  // イコール押下時イベント
  const handleEqual = () => {
    const nextValue = parseFloat(value);
    if (operator !== null) {
      let result = calcFormula(prevValue, nextValue, operator);

      setValue(result.toString());
      setIsResult(true);
      setPrevValue(null);
      setOperator(null);
    }
  };

  // 計算ロジック
  const calcFormula = (val1, val2, operator) => {
    const decimalValue1 = new Decimal(val1);
    const decimalValue2 = new Decimal(val2);

    let calcResult;

    switch (operator) {
      case "+":
        calcResult = decimalValue1.plus(decimalValue2).toNumber();
        break;
      case "-":
        calcResult = decimalValue1.minus(decimalValue2).toNumber();
        break;
      case "÷":
        calcResult = decimalValue1.div(decimalValue2).toNumber();
        break;
      case "×":
        calcResult = decimalValue1.times(decimalValue2).toNumber();
        break;
      default:
        calcResult = 0;
        break;
    }

    const formula = `${decimalValue1.toNumber()} ${operator} ${decimalValue2.toNumber()} =`;
    setFormulaText(formula);
    const history = new History(`${formula} ${calcResult}`);
    addHistory(history);
    return calcResult;
  };

  // AC押下時イベント
  const handleClear = () => {
    setFormulaText("");
    setValue("0");
    setIsResult(false);
    setOperator(null);
    setPrevValue(null);
  };

  // パーセント押下時イベント
  const handlePercentage = () => {
    const currentValue = parseFloat(value);
    setValue((currentValue / 100).toString());
  };

  // 小数点押下時イベント
  const handleDecimal = () => {
    // 計算結果が式として表示されている場合は計算式を削除する
    if (formulaText.charAt(formulaText.length - 1) === "=") {
      setFormulaText("");
    }
    if (!value.includes(".")) {
      setValue(value + ".");
    }
  };

  // 「+/-」押下時イベント
  const handlePlusMinus = () => {
    // 計算結果が式として表示されている場合は計算式を削除する
    if (formulaText.charAt(formulaText.length - 1) === "=") {
      setFormulaText("");
    }
    setValue((parseFloat(value) * -1).toString());
  };

  const getValueString = () => {
    return Number(value).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 90 }}>
        <View style={{ flexBasis: "15%" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box alignItems="center">
              <Menu
                w="190"
                trigger={(triggerProps) => {
                  return (
                    <Pressable
                      accessibilityLabel="More options menu"
                      {...triggerProps}
                    >
                      <Ionicons name="time-outline" size={60} color={"white"} />
                      {/* <Text style={{ fontSize: 50, color: "white" }}>≡</Text> */}
                    </Pressable>
                  );
                }}
              >
                {historyList.map((history, index) => (
                  <Menu.Item key={index}>{history.formula}</Menu.Item>
                ))}
              </Menu>
            </Box>
          </View>
        </View>
        <View style={{ flexBasis: "85%" }}>
          <View style={{ ...styles.result }}>
            <Text style={styles.formulaText}>{formulaText}</Text>
          </View>
          <View style={styles.result}>
            <Text style={styles.resultText}>{getValueString()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button
          title="AC"
          color="#aaaaaa"
          textColor="#000000"
          onPress={handleClear}
        />
        <Button
          title="+/-"
          color="#aaaaaa"
          textColor="#000000"
          onPress={handlePlusMinus}
        />
        <Button
          title="%"
          color="#aaaaaa"
          textColor="#000000"
          onPress={handlePercentage}
        />
        <Button title="÷" color="#ff8800" onPress={() => handleOperator("÷")} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="7" color="#444444" onPress={() => handleNumber("7")} />
        <Button title="8" color="#444444" onPress={() => handleNumber("8")} />
        <Button title="9" color="#444444" onPress={() => handleNumber("9")} />
        <Button title="×" color="#ff8800" onPress={() => handleOperator("×")} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="4" color="#444444" onPress={() => handleNumber("4")} />
        <Button title="5" color="#444444" onPress={() => handleNumber("5")} />
        <Button title="6" color="#444444" onPress={() => handleNumber("6")} />
        <Button title="-" color="#ff8800" onPress={() => handleOperator("-")} />
      </View>
      <View style={styles.buttonRow}>
        <Button title="1" color="#444444" onPress={() => handleNumber("1")} />
        <Button title="2" color="#444444" onPress={() => handleNumber("2")} />
        <Button title="3" color="#444444" onPress={() => handleNumber("3")} />
        <Button title="+" color="#ff8800" onPress={() => handleOperator("+")} />
      </View>
      <View style={styles.buttonRow}>
        <Button
          title="0"
          color="#444444"
          isZeroButton={true}
          onPress={() => handleNumber("0")}
        />
        <Button title="." color="#444444" onPress={handleDecimal} />
        <Button title="=" color="#ff8800" onPress={handleEqual} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  result: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    width: "100%",
  },
  resultText: {
    fontSize: 40,
    color: "white",
  },
  formulaText: {
    fontSize: 20,
    color: "white",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Calculator;
