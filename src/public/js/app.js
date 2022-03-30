let firstWord = []
let secondWord = []
let thirddWord = []
let quartertWord = []
let fifthWord = []
let sixthWord = []

let objArray = [
  firstWord,
  secondWord,
  thirddWord,
  quartertWord,
  fifthWord,
  sixthWord,
]

const keybContainer = document.getElementById("keybContainer")

const firstW = wordContainer.querySelectorAll("#firstWord")
const secondW = wordContainer.querySelectorAll("#secondWord")
const thirdW = wordContainer.querySelectorAll("#thirdWord")
const quarterW = wordContainer.querySelectorAll("#quarterWord")
const fifthW = wordContainer.querySelectorAll("#fifthWord")
const sixthW = wordContainer.querySelectorAll("#sixthWord")

let objArrayDOM = [firstW, secondW, thirdW, quarterW, fifthW, sixthW]

const btns = keybContainer.querySelectorAll("#keyb")
let i = 0

let disable = false

btns.forEach((btn) => {
  btn.addEventListener(
    "click",
    ({
      target: {
        dataset: { letter },
      },
    }) => {
      putLetter(letter, objArray[i], objArrayDOM[i])
    }
  )
})

function putLetter(letter, wordArray, wordArrayPut) {
  if (disable !== false) return null

  if (letter === "del") {
    wordArray.pop()
    wordArrayPut[wordArray.length].value = null
  } else {
    if (letter === "ent") {
      if (wordArray.length === 5) {
        i++
        verifyWord(wordArray)
      } else {
        console.log("Faltan letras")
      }
    } else {
      if (wordArray.length !== 5) {
        wordArray.push(letter) //array
        wordArrayPut[wordArray.length - 1].value = letter.toUpperCase()
      }
    }
  }
}

const btn_form = document.getElementById("btn-form")
btn_form.addEventListener("click", () => {
  putLetter("ent", objArray[i], objArrayDOM[i])
})

function verifyWord(wordArray) {
  const wordverifier = wordArray.join("")
  document.getElementById("hiddenWord").value = wordverifier
  document.form.submit()
  setTimeout(stopLoad, 1000)

  //Pistas
  setTimeout(tracks, 1000)

  disable = true
  setTimeout(() => {
    disable = false
  }, 700)

  if (i === 6) {
    disable = true
  }
}

function tracks() {
  const errors = document.cookie.substring(2, document.cookie.length).split("-")

  for (let y = 0; y < 5; y++) {
    let obj = objArrayDOM[i - 1][y].style
    obj.color = "white"
    obj.border = "none"
    if (errors[y] === "X") obj.backgroundColor = "#787C7E"
    if (errors[y] === "G") obj.backgroundColor = "#6AAA64"
    if (errors[y] === "P") obj.backgroundColor = "#C9B458"
  }
  if (errors.join("") === "GGGGG") {
    disable = true
    openModal("modal")
  }
}

function openModal(modalId) {
  modal = document.getElementById(modalId)
  modal.classList.remove("hidden")
  document.cookie = "e" + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
  console.log(document.cookie)
}

function closeModal() {
  modal = document.getElementById("modal")
  modal.classList.add("hidden")
}

function stopLoad() {
  window.stop()
}

document.addEventListener("keydown", (e) => {
  let letter = e.key

  if (e.code === "Backspace") letter = "del"
  if (e.code === "Enter") letter = "ent"
  if (e.code.includes("Key") || letter === "del" || letter === "ent")
    putLetter(letter.toLowerCase(), objArray[i], objArrayDOM[i])
})
