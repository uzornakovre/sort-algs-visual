export default class Sort {
  constructor(container, delayInput, stopBtn) {
    this.delay = 30;
    this.maxDelay = 100;
    this.barsContainer = container;
    this.delayInput = delayInput;
    this.stopBtn = stopBtn;
    this.accentColor = "#ec0b0b";
    this.auxColor = "#dbb676";
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

  swap = async (arr, a, b) => {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  };

  handleChangeSpeed = (evt) => {
    this.delay = this.maxDelay - evt.target.value;
  };

  quickSort = async (array) => {
    this.isRunning = true;

    await this.quickSortAsPartition(array, 0, array.length - 1);
    return array;
  };

  quickSortAsPartition = async (arr, startIndex, endIndex) => {
    if (startIndex >= endIndex || !this.isRunning) return;

    let index = await this.partition(arr, startIndex, endIndex);

    if (!this.isRunning) return;

    this.setBar(index, arr, this.mainColor, true);
    await this.sleep(this.delay);

    await Promise.all([
      this.quickSortAsPartition(arr, startIndex, index - 1),
      this.quickSortAsPartition(arr, index + 1, endIndex),
    ]);
  };

  partition = async (arr, startIndex, endIndex) => {
    for (let i = startIndex; i <= endIndex; i++) {
      this.setBar(i, arr, this.auxColor, true);
    }

    const pivotValue = arr[endIndex];
    let pivotIndex = startIndex;

    this.setBar(pivotIndex, arr, this.accentColor, true);
    await this.sleep(this.delay);

    for (let i = pivotIndex; i < endIndex; i++) {
      if (!this.isRunning) return;

      if (arr[i] <= pivotValue) {
        await this.swap(arr, i, pivotIndex);

        this.setBar(pivotIndex, arr, this.auxColor);
        await this.sleep(this.delay);

        pivotIndex++;

        this.setBar(pivotIndex, arr, this.accentColor);
        await this.sleep(this.delay);
      }
    }

    await this.swap(arr, pivotIndex, endIndex);

    for (let j = startIndex; j < endIndex; j++) {
      if (!this.isRunning) return;

      if (j != pivotIndex) {
        this.setBar(pivotIndex, arr, this.mainColor, true);
      } else {
        this.setBar(pivotIndex, arr, this.mainColor, true);
      }
    }

    this.setBar(startIndex, arr, this.mainColor, true);
    this.setBar(endIndex, arr, this.mainColor, true);
    this.setBar(pivotIndex, arr, this.mainColor, true);

    return pivotIndex;
  };

  bubbleSort = async (array) => {
    this.isRunning = true;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          if (!this.isRunning) return;

          await this.swap(array, j, j + 1);

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
      await this.swap(array, i, smallestIndex);

      this.setBar(i, array, this.accentColor, true);
      this.setBar(smallestIndex, array, this.accentColor, true);

      await this.sleep(500);

      this.setBar(i, array, this.mainColor);
      this.setBar(smallestIndex, array, this.mainColor);

      await this.sleep(this.delay);
    }
    return array;
  };

  gnomeSort = async (array) => {
    this.isRunning = true;

    let index = 0;

    while (index < array.length) {
      if (!this.isRunning) return;

      if (index === 0) index++;

      if (array[index] >= array[index - 1]) {
        index++;

        if (index < array.length) {
          this.setBar(index, array, this.accentColor);
          await this.sleep(this.delay);

          this.setBar(index, array, this.mainColor);
        }
      } else {
        this.setBar(index, array, this.accentColor);
        this.setBar(index - 1, array, this.accentColor);
        await this.sleep(this.delay);

        await this.swap(array, index, index - 1);

        this.setBar(index, array, this.accentColor, true);
        this.setBar(index - 1, array, this.accentColor, true);
        await this.sleep(this.delay);

        this.setBar(index, array, this.mainColor);
        this.setBar(index - 1, array, this.mainColor);

        index--;
      }
    }
    await this.sleep(this.delay);

    return array;
  };

  shellSort = async (array) => {
    this.isRunning = true;

    let gap = Math.floor(array.length / 2);

    while (gap > 0) {
      for (let i = 0; i < array.length; i++) {
        if (!this.isRunning) return;

        let temp = array[i];
        let j;

        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];

          this.setBar(j, array, this.accentColor, true);
          this.setBar(j - gap, array, this.auxColor, true);
          await this.sleep(this.delay);
          await this.sleep(this.delay);

          this.setBar(j, array, this.mainColor);
        }

        array[j] = temp;

        this.setBar(j, array, this.aux, true);
        await this.sleep(this.delay);

        this.setBar(j, array, this.mainColor);
      }
      gap = Math.floor(gap / 2);
    }

    return array;
  };
}
