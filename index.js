import {
  getTrainingDataBCE,
  getTrainingDataMSE,
  generateTrainingData,
  generateTestDataMSE,
  generateTestDataBCE,
} from "./testData.js"

import brain from "brain.js"
const expectedInputSize = 2

const config = { inputSize: expectedInputSize * 2 }
const netMSE = new brain.NeuralNetwork(config)
const netBCE = new brain.NeuralNetwork(config)
// Testdaten für MSE
const { yTrue, yPred } = generateTestDataMSE(expectedInputSize)
// Testdaten für BCE
const { trueLabels, predictedProbabilities } =
  generateTestDataBCE(expectedInputSize)
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
const flattenArray = arr => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(
      Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten
    )
  }, [])
}
//generate for AI
generateTrainingData(mse, bce, expectedInputSize)

console.log("training AI")
//trainAI
const MSEdata = getTrainingDataMSE()
const BCEdata = getTrainingDataBCE()
netMSE.train(MSEdata)
netBCE.train(BCEdata)

console.log("training AI finished")

//execute
const resultMSE = netMSE.run([...yTrue, ...yPred])
const resultBCE = netBCE.run([...yTrue, ...yPred])

console.log(`Method:\tMean Squared Error (MSE): ${mse(yTrue, yPred)}`)
console.log(`AI:\tMean Squared Error (MSE): ${resultMSE}`)
console.log(
  `Method:\tBinary-Cross-Entropy (BCE): ${bce(
    trueLabels,
    predictedProbabilities
  )}`
)
console.log(`AI:\tBinary-Cross-Entropy (BCE): ${resultBCE}`)
