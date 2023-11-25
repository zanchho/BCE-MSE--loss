# BCE-MSE--loss

## Aufgabe:
##### (1) Implementieren Sie den Mean-squared-Error-Loss (MSE).

##### (2) Implementieren Sie den Binary-Cross-Entropy-Loss (BCE).

##### (3) Erzeugen Sie Trainingsdaten

## Setup

### Im Terminal:
##### Installation der Abhängigkeiten:
```
npm install
```
##### Starten des Projektes:
```
npm start
```

## Implementation:

##### (1) Implementieren Sie den Mean-squared-Error-Loss (MSE).
```JavaScript
const mse = (Yt, Yp) => {
  if (!Yt.length || !Yp.length || Yt.length !== Yp.length) {
    console.log("Values are invalid")
    return
  }
  let result = 0.0
  for (let i = 0; i < Yt.length; i++) {
    result += (Yt[i] - Yp[i]) * (Yt[i] - Yp[i])
  }
  return result / Yt.length
}
```

##### (2) Implementieren Sie den Binary-Cross-Entropy-Loss (BCE).
```JavaScript
const bce = (y, p) => {
  if (!y.length || !p.length || y.length !== p.length) {
    console.log("Values are invalid")
    return
  }
  const n = y.length
  const epsilon = 1e-16
  let result = 0.0
  for (let i = 0; i < n; i++) {
    const x1 = -y[i],
      x2 = Math.log(Math.max(epsilon, p[i])),
      x3 = 1 - y[i],
      x4 = Math.log(Math.max(epsilon, 1 - p[i]))

    result += x1 * x2 - x3 * x4
  }
  return result / n
}
```

##### (3) Erzeugen Sie Trainingsdaten

```JavaScript
//generate for AI
generateTrainingData(mse, bce, expectedInputSize)

console.log("training AI")
//trainAI
const MSEdata = getTrainingDataMSE()
const BCEdata = getTrainingDataBCE()
netMSE.train(MSEdata)
netBCE.train(BCEdata)

console.log("training AI finished")

```

```JavaScript
const generateTrainingData = (MSE, BCE, size) => {
  if (!size) size = 1
  const arrMSE = []
  const arrBCE = []
  for (let i = 0; i <= 6000; i++) {
    const testmse = generateTestDataMSE(size)
    const testBCE = generateTestDataBCE(size)
    const resultMSE = MSE(testmse.yTrue, testmse.yPred)
    const resultBCE = BCE(testBCE.trueLabels, testBCE.predictedProbabilities)

    if (isNaN(resultMSE) || isNaN(resultBCE)) {
      console.log("isNaN!!!", resultMSE, resultBCE)
      continue
    }
    let objmse = {
      input: [...testmse.yTrue, ...testmse.yPred],
      output: [resultMSE],
    }
    let objbce = {
      input: [...testBCE.trueLabels, ...testBCE.predictedProbabilities],
      output: [resultBCE],
    }
    arrMSE.push(objmse)
    arrBCE.push(objbce)
  }

  fs.writeFileSync("./trainingDataMSE.json", JSON.stringify(arrMSE))
  fs.writeFileSync("./trainingDataBCE.json", JSON.stringify(arrBCE))
  return { mse: arrMSE, bce: arrBCE }
}
```

```JavaScript
const getTrainingDataMSE = () => {
  try {
    let data = fs.readFileSync("./trainingDataMSE.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading trainingDataMSE.json:", error.message)
  }
  return null
}
```

```JavaScript
const getTrainingDataBCE = () => {
  try {
    let data = fs.readFileSync("./trainingDataBCE.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading trainingDataBCE.json:", error.message)
  }
  return null
}
```

## Beispiel-Ausgabe:

```
training AI
training AI finished
Method: Mean Squared Error (MSE): 0.05650838056208461
AI:     Mean Squared Error (MSE): 0.17434214055538177
Method: Binary-Cross-Entropy (BCE): 0.6483441054978616
AI:     Binary-Cross-Entropy (BCE): 0.9996824860572815
```
