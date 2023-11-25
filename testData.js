import fs from "fs"

const generateTestDataMSE = size => {
  const yTrue = [],
    yPred = []
  for (let i = 0; i < size; i++) {
    yTrue.push(Math.random())
    yPred.push(Math.random())
  }
  return { yTrue, yPred }
}
const generateTestDataBCE = size => {
  const trueLabels = []
  const predictedProbabilities = []
  for (let i = 0; i < size; i++) {
    trueLabels.push(Math.round(Math.random()))
    predictedProbabilities.push(Math.random())
  }
  return { trueLabels, predictedProbabilities }
}
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

const getTrainingDataMSE = () => {
  try {
    let data = fs.readFileSync("./trainingDataMSE.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading trainingDataMSE.json:", error.message)
  }
  return null
}
const getTrainingDataBCE = () => {
  try {
    let data = fs.readFileSync("./trainingDataBCE.json", "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading trainingDataBCE.json:", error.message)
  }
  return null
}

export {
  getTrainingDataBCE,
  getTrainingDataMSE,
  generateTrainingData,
  generateTestDataMSE,
  generateTestDataBCE,
}
