import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import Decimal from "decimal.js";

const Calculator = () => {
  const [value, setValue] = useState("0"); // 現在の入力値
  const [operator, setOperator] = useState(null); // 四則演算子
  const [prevValue, setPrevValue] = useState(null); // 前回の入力値
  const [isResult, setIsResult] = useState(false); // 計算結果

  // 数値押下時イベント
  const handleNumber = (number) => {
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

    let nextPrevValue = parseFloat(value);
    let tmpResultString = "0";

    if (calcValue2 !== null && operator !== null) {
      let tmpResult = calcFormula(calcValue1, calcValue2, operator);
      nextPrevValue = tmpResult;
      tmpResultString = tmpResult.toString();
    }

    setPrevValue(nextPrevValue);
    setOperator(nextOperator);
    setValue(tmpResultString);
    setIsResult(true);
  };

  // イコール押下時イベント
  const handleEqual = () => {
    const nextValue = parseFloat(value);
    let result = calcFormula(prevValue, nextValue, operator);

    setValue(result.toString());
    setIsResult(true);
    setPrevValue(null);
    setOperator(null);
  };

  // 計算ロジック
  const calcFormula = (val1, val2, operator) => {
    const decimalValue1 = new Decimal(val1);
    const decimalValue2 = new Decimal(val2);

    switch (operator) {
      case "+":
        return decimalValue1.plus(decimalValue2).toNumber();
      case "-":
        return decimalValue1.minus(decimalValue2).toNumber();
      case "÷":
        return decimalValue1.div(decimalValue2).toNumber();
      case "×":
        return decimalValue1.times(decimalValue2).toNumber();
      default:
        return 0;
    }
  };

  // AC押下時イベント
  const handleClear = () => {
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
    if (!value.includes(".")) {
      setValue(value + ".");
    }
  };

  // 「+/-」押下時イベント
  const handlePlusMinus = () => {
    setValue((parseFloat(value) * -1).toString());
  };

  // 計算式のテキストを取得
  const getFormulaText = () => {
    if (prevValue === null || operator === null) {
      return "";
    }
    return `${prevValue} ${operator}`;
  };

  const getValueString = () => {
    return Number(value).toLocaleString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.formulaText}>{getFormulaText()}</Text>
      </View>
      <View style={styles.result}>
        <Text style={styles.resultText}>{getValueString()}</Text>
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
