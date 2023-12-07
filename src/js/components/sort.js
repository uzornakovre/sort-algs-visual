export default class Sort {
  constructor(container, delayInput, stopBtn) {
    this.delay = 30;
    this.maxDelay = 100;
    this.barsContainer = container;
    this.delayInput = delayInput;
    this.stopBtn = stopBtn;
    this.accentColor = "#ec0b0b";
    this.mainColor = "#e2cca5";
    this.isRunning = false;
    this.setEventListeners();
  }

  setEventListeners = () => {
    this.delayInput.addEventListener("input", this.handleChangeSpeed);
    this.stopBtn.addEventListener("click", this.stop);
  };

  setBar = (index, array, color, height = false) => {
    const bars = this.barsContainer.querySelectorAll(".bar");

    height &&
      (bars[index].style.height = `${(array[index] / array.length) * 100}%`);
    bars[index].style.backgroundColor = color;
  };

  stop = () => {
    this.isRunning = false;
  };

  sleep = (ms) => {
    return new Promise((res) => setTimeout(res, ms));
  };

  handleChangeSpeed = (evt) => {
    this.delay = this.maxDelay - evt.target.value;
  };

  bubbleSort = async (array) => {
    this.isRunning = true;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          if (!this.isRunning) return;

          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          this.setBar(j, array, this.accentColor, true);
          this.setBar(j + 1, array, this.accentColor, true);

          await this.sleep(50);

          this.setBar(j, array, this.mainColor);
          this.setBar(j + 1, array, this.mainColor);

          await this.sleep(this.delay);
        }
      }
      await this.sleep(this.delay);
    }

    return array;
  };

  quickSort = async (array) => {
    this.isRunning = true;
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

        bars[pivotIndex].style.height = `${
          (array[pivotIndex] / array.length) * 100
        }%`;
        bars[pivotIndex].style.backgroundColor = "#ec0b0b";
      } else {
        greater.push(array[i]);

        bars[pivotIndex].style.height = `${
          (array[pivotIndex] / array.length) * 100
        }%`;
        bars[pivotIndex].style.backgroundColor = "#ec0b0b";
      }

      // bars[i].style.height = `${(array[i] / array.length) * 100}%`;
      // bars[i].style.backgroundColor = "#ec0b0b";

      await this.sleep(this.delay);
    }

    return [...this.quickSort(less), pivot, ...this.quickSort(greater)];
  };

  selectionSort = async (array) => {
    this.isRunning = true;

    for (let i = 0; i < array.length; i++) {
      let smallestIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        let temp = smallestIndex;

        if (array[j] < array[smallestIndex]) {
          temp = smallestIndex;
          smallestIndex = j;
        }

        if (!this.isRunning) return;

        this.setBar(j, array, this.accentColor);

        await this.sleep(this.delay);

        this.setBar(j, array, this.mainColor);
        this.setBar(temp, array, this.mainColor);
        this.setBar(smallestIndex, array, this.accentColor);

        await this.sleep(this.delay);
      }
      let tmp = array[i];
      array[i] = array[smallestIndex];
      array[smallestIndex] = tmp;

      this.setBar(i, array, this.accentColor, true);
      this.setBar(smallestIndex, array, this.accentColor, true);

      await this.sleep(500);

      this.setBar(i, array, this.mainColor);
      this.setBar(smallestIndex, array, this.mainColor);

      await this.sleep(this.delay);
    }
    return array;
  };
}
