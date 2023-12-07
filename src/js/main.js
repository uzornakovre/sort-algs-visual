import "../assets/styles/index.scss";
import Controller from "./components/controller";
import Sort from "./components/sort";

const randomizeArrayBtn = document.querySelector("#randomize_array_btn");
const sortBtn = document.querySelector("#sort_btn");
const barsContainer = document.querySelector(".bars");
const delayInput = document.querySelector("#speed");
const arrayLengthInput = document.querySelector("#length");
const algorithmSelect = document.querySelector("#algorithm");

const sort = new Sort(barsContainer);

const SORT_ALGORITHMS = {
  bubble: sort.bubbleSort,
  quick: sort.quickSort,
  selection: "selection",
};

const controller = new Controller(
  barsContainer,
  arrayLengthInput,
  algorithmSelect,
  randomizeArrayBtn,
  sortBtn,
  SORT_ALGORITHMS
);

window.addEventListener("load", controller.init);
delayInput.addEventListener("input", sort.handleChangeSpeed);
