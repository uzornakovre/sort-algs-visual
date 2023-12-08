import "../assets/styles/index.scss";
import Controller from "./components/controller";
import Sort from "./components/sort";

const randomizeArrayBtn = document.querySelector("#randomize_array_btn");
const sortBtn = document.querySelector("#sort_btn");
const stopBtn = document.querySelector("#stop_btn");
const barsContainer = document.querySelector(".bars");
const delayInput = document.querySelector("#speed");
const arrayLengthInput = document.querySelector("#length");
const algorithmSelect = document.querySelector("#algorithm");

const sort = new Sort(barsContainer, delayInput, stopBtn);

const SORT_ALGORITHMS = {
  bubble: sort.bubbleSort,
  quick: sort.quickSort,
  selection: sort.selectionSort,
  gnome: sort.gnomeSort,
};

const controller = new Controller(
  barsContainer,
  arrayLengthInput,
  algorithmSelect,
  randomizeArrayBtn,
  sortBtn,
  stopBtn,
  SORT_ALGORITHMS
);

window.addEventListener("load", controller.init);
