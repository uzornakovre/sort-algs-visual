export default class Sort {
  constructor(container) {
    this.delay = 30;
    this.maxDelay = 100;
    this.barsContainer = container;
  }

  sleep = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  handleChangeSpeed = (evt) => {
    this.delay = this.maxDelay - evt.target.value;
  };

  bubbleSort = async (array) => {
    const bars = this.barsContainer.querySelectorAll(".bar");

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "#e2cca5";
            }
          }

          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          bars[j].style.height = `${(array[j] / array.length) * 100}%`;
          bars[j].style.backgroundColor = "#ec0b0b";

          bars[j + 1].style.height = `${(array[j + 1] / array.length) * 100}%`;
          bars[j + 1].style.backgroundColor = "#ec0b0b";

          await this.sleep(this.delay);
        }
      }
      await this.sleep(this.delay);
    }

    return array;
  };

  quickSort = async (array) => {
    const bars = this.barsContainer.querySelectorAll(".bar");

    if (array.length < 2) {
      return array;
    }

    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array[pivotIndex];
    let less = [];
    let greater = [];

    for (let i = 0; i < array.length; i++) {
      if (i === pivotIndex) continue;
      if (array[i] < pivot) {
        less.push(array[i]);
      } else {
        greater.push(array[i]);
      }

      bars[i].style.height = `${(array[i] / array.length) * 100}%`;
      bars[i].style.backgroundColor = "#ec0b0b";

      // bars[j + 1].style.height = `${(array[j + 1] / array.length) * 100}%`;
      // bars[j + 1].style.backgroundColor = "#ec0b0b";

      await this.sleep(this.delay);
    }

    return [...this.quickSort(less), pivot, ...this.quickSort(greater)];
  };
}
