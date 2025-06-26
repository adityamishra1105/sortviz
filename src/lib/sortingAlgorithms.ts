export interface SortStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  description: string;
  auxiliaryArray?: number[]; // For showing extra space usage
  stableIndicator?: boolean; // For showing if current operation maintains stability
}

export interface SortingResult {
  steps: SortStep[];
  comparisons: number;
  swaps: number;
}

// Utility function to create a copy of array
const copyArray = (arr: number[]): number[] => [...arr];

export const bubbleSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Bubble Sort - Compare adjacent elements and swap if needed",
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Show comparison
      steps.push({
        array: copyArray(arr),
        comparing: [j, j + 1],
        sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
        description: `Comparing elements at positions ${j} and ${j + 1}: ${arr[j]} vs ${arr[j + 1]}`,
      });

      if (arr[j] > arr[j + 1]) {
        // Show swap
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push({
          array: copyArray(arr),
          swapping: [j, j + 1],
          sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
          description: `Swapping ${arr[j + 1]} and ${arr[j]}`,
        });
      }
    }

    if (!swapped) {
      steps.push({
        array: copyArray(arr),
        sorted: Array.from({ length: n }, (_, k) => k),
        description: "No swaps needed - array is sorted!",
      });
      break;
    }
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Bubble Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const selectionSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Selection Sort - Find minimum element and place it at the beginning",
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: copyArray(arr),
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Finding minimum element from position ${i} onwards`,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      steps.push({
        array: copyArray(arr),
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Comparing current minimum ${arr[minIdx]} with ${arr[j]}`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: copyArray(arr),
          comparing: [minIdx],
          sorted: Array.from({ length: i }, (_, k) => k),
          description: `New minimum found: ${arr[minIdx]} at position ${minIdx}`,
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      steps.push({
        array: copyArray(arr),
        swapping: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Swapping ${arr[minIdx]} with ${arr[i]}`,
      });
    }
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Selection Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const insertionSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    sorted: [0],
    description:
      "Starting Insertion Sort - Build sorted array one element at a time",
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: copyArray(arr),
      comparing: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      description: `Inserting element ${key} into sorted portion`,
    });

    while (j >= 0 && arr[j] > key) {
      comparisons++;

      steps.push({
        array: copyArray(arr),
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
        description: `Moving ${arr[j]} one position ahead`,
      });

      arr[j + 1] = arr[j];
      swaps++;
      j = j - 1;
    }

    if (j >= 0) comparisons++;

    arr[j + 1] = key;

    steps.push({
      array: copyArray(arr),
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Placed ${key} at position ${j + 1}`,
    });
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Insertion Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const quickSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Quick Sort - Divide and conquer using pivot elements",
  });

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: copyArray(arr),
      pivot: high,
      description: `Partitioning with pivot ${pivot} at position ${high}`,
    });

    for (let j = low; j < high; j++) {
      comparisons++;

      steps.push({
        array: copyArray(arr),
        comparing: [j],
        pivot: high,
        description: `Comparing ${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;

          steps.push({
            array: copyArray(arr),
            swapping: [i, j],
            pivot: high,
            description: `Swapping ${arr[j]} and ${arr[i]}`,
          });
        }
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;

    steps.push({
      array: copyArray(arr),
      swapping: [i + 1, high],
      description: `Placing pivot ${pivot} at final position ${i + 1}`,
    });

    return i + 1;
  };

  const quickSortHelper = (low: number, high: number): void => {
    if (low < high) {
      const pi = partition(low, high);

      steps.push({
        array: copyArray(arr),
        sorted: [pi],
        description: `Pivot ${arr[pi]} is now in correct position`,
      });

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: arr.length }, (_, k) => k),
    description: "Quick Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const mergeSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Merge Sort - Divide array into smaller subarrays and merge them",
  });

  const merge = (left: number, mid: number, right: number): void => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    steps.push({
      array: copyArray(arr),
      comparing: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      description: `Merging subarrays [${left}...${mid}] and [${mid + 1}...${right}]`,
    });

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;

      steps.push({
        array: copyArray(arr),
        comparing: [k - 1],
        description: `Placing ${arr[k - 1]} at position ${k - 1}`,
      });
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      j++;
      k++;
    }

    steps.push({
      array: copyArray(arr),
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      description: `Merged subarray [${left}...${right}]`,
    });
  };

  const mergeSortHelper = (left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: arr.length }, (_, k) => k),
    description: "Merge Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const heapSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description: "Starting Heap Sort - Build max heap then extract elements",
  });

  const heapify = (n: number, i: number): void => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comparisons++;
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      comparisons++;
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;

      steps.push({
        array: copyArray(arr),
        swapping: [i, largest],
        description: `Heapifying: swapping ${arr[largest]} and ${arr[i]}`,
      });

      heapify(n, largest);
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    array: copyArray(arr),
    description: "Max heap built - largest element is at root",
  });

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;

    steps.push({
      array: copyArray(arr),
      swapping: [0, i],
      sorted: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      description: `Moving largest element ${arr[i]} to position ${i}`,
    });

    heapify(i, 0);
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Heap Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const shellSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description: "Starting Shell Sort - Use gap sequence to sort subarrays",
  });

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push({
      array: copyArray(arr),
      description: `Using gap of ${gap} to sort subarrays`,
    });

    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      steps.push({
        array: copyArray(arr),
        comparing: [i],
        description: `Inserting element ${temp} using gap ${gap}`,
      });

      while (j >= gap && arr[j - gap] > temp) {
        comparisons++;

        steps.push({
          array: copyArray(arr),
          comparing: [j, j - gap],
          description: `Comparing ${arr[j - gap]} with ${temp} (gap ${gap})`,
        });

        arr[j] = arr[j - gap];
        swaps++;
        j -= gap;

        steps.push({
          array: copyArray(arr),
          swapping: [j + gap, j],
          description: `Moving ${arr[j + gap]} to position ${j + gap}`,
        });
      }

      if (j >= gap) comparisons++;
      arr[j] = temp;

      if (j !== i) {
        steps.push({
          array: copyArray(arr),
          description: `Placed ${temp} at position ${j}`,
        });
      }
    }

    steps.push({
      array: copyArray(arr),
      description: `Completed gap ${gap} phase`,
    });
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Shell Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const countingSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description: "Starting Counting Sort - Count occurrences of each element",
  });

  // Find the maximum element
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  steps.push({
    array: copyArray(arr),
    description: `Range: ${min} to ${max}, creating count array of size ${range}`,
  });

  // Create count array
  const count = new Array(range).fill(0);

  // Count each element
  for (let i = 0; i < n; i++) {
    count[arr[i] - min]++;
    steps.push({
      array: copyArray(arr),
      comparing: [i],
      description: `Counting element ${arr[i]} at position ${i}`,
    });
  }

  steps.push({
    array: copyArray(arr),
    description: "Finished counting, now reconstructing sorted array",
  });

  // Reconstruct the sorted array
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      arr[index] = i + min;
      swaps++;

      steps.push({
        array: copyArray(arr),
        swapping: [index],
        description: `Placing ${i + min} at position ${index}`,
      });

      index++;
      count[i]--;
    }
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Counting Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const radixSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Radix Sort - Sort by each digit from least to most significant",
  });

  // Find the maximum number to know number of digits
  const max = Math.max(...arr);
  const maxDigits = max.toString().length;

  steps.push({
    array: copyArray(arr),
    description: `Maximum value: ${max}, requires ${maxDigits} digit passes`,
  });

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const digit = Math.log10(exp) + 1;

    steps.push({
      array: copyArray(arr),
      description: `Sorting by digit ${digit} (place value ${exp})`,
    });

    // Counting sort by current digit
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
      const digitValue = Math.floor(arr[i] / exp) % 10;
      count[digitValue]++;

      steps.push({
        array: copyArray(arr),
        comparing: [i],
        description: `Element ${arr[i]} has digit ${digitValue} at position ${digit}`,
      });
    }

    // Change count[i] to actual position
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const digitValue = Math.floor(arr[i] / exp) % 10;
      output[count[digitValue] - 1] = arr[i];
      count[digitValue]--;
      swaps++;

      steps.push({
        array: copyArray(arr),
        swapping: [i],
        description: `Placing ${arr[i]} based on digit ${digitValue}`,
      });
    }

    // Copy output array back to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    steps.push({
      array: copyArray(arr),
      description: `Completed digit ${digit} pass`,
    });
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Radix Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const bucketSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Bucket Sort - Distribute elements into buckets and sort each",
  });

  if (n <= 1) {
    steps.push({
      array: copyArray(arr),
      sorted: Array.from({ length: n }, (_, k) => k),
      description: "Array has 1 or fewer elements, already sorted!",
    });
    return { steps, comparisons, swaps };
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.min(n, 10); // Use up to 10 buckets
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);

  steps.push({
    array: copyArray(arr),
    description: `Using ${bucketCount} buckets, each covering range of ${bucketSize}`,
  });

  // Create buckets
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      Math.floor((arr[i] - min) / bucketSize),
      bucketCount - 1,
    );
    buckets[bucketIndex].push(arr[i]);

    steps.push({
      array: copyArray(arr),
      comparing: [i],
      description: `Placing ${arr[i]} into bucket ${bucketIndex}`,
    });
  }

  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      steps.push({
        array: copyArray(arr),
        description: `Sorting bucket ${i} with ${buckets[i].length} elements`,
      });

      // Sort bucket using insertion sort
      buckets[i].sort((a, b) => {
        comparisons++;
        return a - b;
      });

      // Place sorted bucket elements back into array
      for (let j = 0; j < buckets[i].length; j++) {
        arr[index] = buckets[i][j];
        swaps++;

        steps.push({
          array: copyArray(arr),
          swapping: [index],
          description: `Placing ${buckets[i][j]} from bucket ${i} to position ${index}`,
        });

        index++;
      }
    }
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Bucket Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const timSort = (array: number[]): SortingResult => {
  const steps: SortStep[] = [];
  const arr = copyArray(array);
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  steps.push({
    array: copyArray(arr),
    description:
      "Starting Tim Sort - Hybrid stable sorting algorithm (merge + insertion)",
  });

  const MIN_MERGE = 32;

  // Simple insertion sort for small arrays
  const insertionSort = (arr: number[], left: number, right: number) => {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= left && arr[j] > key) {
        comparisons++;
        arr[j + 1] = arr[j];
        swaps++;
        j--;
      }

      arr[j + 1] = key;

      steps.push({
        array: copyArray(arr),
        comparing: [i],
        description: `Insertion sort: placing ${key} at position ${j + 1}`,
      });
    }
  };

  // Merge function
  const merge = (arr: number[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    steps.push({
      array: copyArray(arr),
      comparing: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      description: `Merging subarrays [${left}...${mid}] and [${mid + 1}...${right}]`,
    });

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      swaps++;
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      j++;
      k++;
    }

    steps.push({
      array: copyArray(arr),
      sorted: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
      description: `Merged subarray [${left}...${right}]`,
    });
  };

  // Sort individual subarrays of size MIN_MERGE using insertion sort
  for (let i = 0; i < n; i += MIN_MERGE) {
    const end = Math.min(i + MIN_MERGE - 1, n - 1);
    insertionSort(arr, i, end);
  }

  // Start merging from size MIN_MERGE
  let size = MIN_MERGE;
  while (size < n) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);

      if (mid < end) {
        merge(arr, start, mid, end);
      }
    }
    size *= 2;
  }

  steps.push({
    array: copyArray(arr),
    sorted: Array.from({ length: n }, (_, k) => k),
    description: "Tim Sort completed!",
  });

  return { steps, comparisons, swaps };
};

export const algorithms = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  quick: quickSort,
  merge: mergeSort,
  heap: heapSort,
  shell: shellSort,
  counting: countingSort,
  radix: radixSort,
  bucket: bucketSort,
  tim: timSort,
};

export type AlgorithmKey = keyof typeof algorithms;
