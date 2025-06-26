import { AlgorithmKey } from "./sortingAlgorithms";

export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  explanation: string;
  howItWorks: string[];
  pros: string[];
  cons: string[];
  useCase: string;
  code: {
    javascript: string;
    python: string;
    java: string;
    cpp: string;
  };
}

export const algorithmData: Record<AlgorithmKey, AlgorithmInfo> = {
  bubble: {
    name: "Bubble Sort",
    description:
      "A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    explanation:
      "Bubble Sort gets its name because smaller elements 'bubble' to the beginning of the list, just like air bubbles rise to the surface of water.",
    howItWorks: [
      "Start with the first element and compare it with the next element",
      "If the first element is greater than the second, swap them",
      "Continue this process for the entire array",
      "After each pass, the largest element moves to its correct position",
      "Repeat until no more swaps are needed",
    ],
    pros: [
      "Simple to understand and implement",
      "No additional memory space needed",
      "Stable sorting algorithm",
      "Can detect if the list is already sorted",
    ],
    cons: [
      "Poor performance on large datasets",
      "More comparisons and writes compared to other algorithms",
      "Generally considered inefficient for practical use",
    ],
    useCase:
      "Educational purposes and very small datasets where simplicity is more important than efficiency.",
    code: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
      cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
    },
  },
  selection: {
    name: "Selection Sort",
    description:
      "An in-place comparison sorting algorithm that divides the input list into sorted and unsorted regions, and repeatedly selects the smallest element from the unsorted region.",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    explanation:
      "Selection Sort works by finding the minimum element in the unsorted portion and placing it at the beginning of the sorted portion.",
    howItWorks: [
      "Find the minimum element in the array",
      "Swap it with the element at the first position",
      "Find the minimum element in the remaining unsorted array",
      "Swap it with the element at the second position",
      "Continue until the entire array is sorted",
    ],
    pros: [
      "Simple to understand and implement",
      "In-place sorting (constant space complexity)",
      "Performs well on small lists",
      "Minimizes the number of swaps",
    ],
    cons: [
      "Poor performance on large datasets",
      "Does not adapt to the data (always O(n²))",
      "Not stable (may change relative order of equal elements)",
      "More comparisons than insertion sort",
    ],
    useCase:
      "Small datasets where memory is limited and the cost of swapping is high.",
    code: {
      javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
      cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`,
    },
  },
  insertion: {
    name: "Insertion Sort",
    description:
      "A simple sorting algorithm that builds the final sorted array one item at a time, similar to how you might sort playing cards in your hands.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: true,
    inPlace: true,
    explanation:
      "Insertion Sort works by taking elements from the unsorted portion and inserting them into their correct position in the sorted portion.",
    howItWorks: [
      "Start with the second element (assume first is sorted)",
      "Compare it with elements in the sorted portion",
      "Shift larger elements to the right",
      "Insert the current element in its correct position",
      "Repeat for all remaining elements",
    ],
    pros: [
      "Simple implementation",
      "Efficient for small datasets",
      "Adaptive (performs well on nearly sorted data)",
      "Stable and in-place",
      "Online (can sort a list as it receives it)",
    ],
    cons: [
      "Inefficient for large datasets",
      "More writes than selection sort",
      "O(n²) average and worst-case time complexity",
    ],
    useCase:
      "Small datasets, nearly sorted data, or as a subroutine in hybrid algorithms like Timsort.",
    code: {
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      java: `public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      cpp: `void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    },
  },
  quick: {
    name: "Quick Sort",
    description:
      "A highly efficient divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, then recursively sorts the sub-arrays.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    stable: false,
    inPlace: true,
    explanation:
      "Quick Sort uses the divide-and-conquer strategy to efficiently sort arrays by partitioning them around a pivot element.",
    howItWorks: [
      "Choose a pivot element from the array",
      "Partition the array so elements smaller than pivot go left, larger go right",
      "Recursively apply quick sort to the sub-arrays",
      "Combine the results (no explicit merge needed)",
      "Base case: arrays with 0 or 1 elements are already sorted",
    ],
    pros: [
      "Very efficient on average (O(n log n))",
      "In-place sorting (low memory usage)",
      "Cache-efficient due to good locality of reference",
      "Widely used in practice",
    ],
    cons: [
      "Worst-case performance is O(n²)",
      "Not stable (may change relative order of equal elements)",
      "Performance depends on pivot selection",
      "Recursive implementation may cause stack overflow",
    ],
    useCase:
      "General-purpose sorting for large datasets where average-case performance is important.",
    code: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
      cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
    },
  },
  merge: {
    name: "Merge Sort",
    description:
      "A stable, divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
    explanation:
      "Merge Sort consistently provides O(n log n) performance by dividing the problem into smaller subproblems and merging the solutions.",
    howItWorks: [
      "Divide the array into two halves",
      "Recursively sort both halves",
      "Merge the two sorted halves into a single sorted array",
      "Base case: arrays with 1 element are already sorted",
      "The merge step combines two sorted arrays efficiently",
    ],
    pros: [
      "Guaranteed O(n log n) time complexity",
      "Stable sorting algorithm",
      "Predictable performance",
      "Works well with linked lists",
      "Parallelizable",
    ],
    cons: [
      "Requires O(n) extra space",
      "Not in-place",
      "May be slower than quick sort in practice",
      "More complex for small datasets",
    ],
    useCase:
      "When stable sorting is required or when dealing with large datasets where worst-case performance matters.",
    code: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

private static void merge(int[] arr, int left, int mid, int right) {
    int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
    int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);

    int i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }

    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
}`,
      cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);

    int i = 0, j = 0, k = left;

    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
    }

    while (i < leftArr.size()) arr[k++] = leftArr[i++];
    while (j < rightArr.size()) arr[k++] = rightArr[j++];
}`,
    },
  },
  heap: {
    name: "Heap Sort",
    description:
      "A comparison-based sorting algorithm that uses a binary heap data structure. It divides input into sorted and unsorted regions and extracts the maximum element from the heap.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    explanation:
      "Heap Sort leverages the heap data structure to efficiently find and extract the maximum (or minimum) element repeatedly.",
    howItWorks: [
      "Build a max heap from the input array",
      "Extract the maximum element (root) and place it at the end",
      "Reduce heap size and heapify the root",
      "Repeat until heap size becomes 1",
      "The array is now sorted in ascending order",
    ],
    pros: [
      "Guaranteed O(n log n) time complexity",
      "In-place sorting (O(1) space)",
      "Not affected by input distribution",
      "No quadratic worst-case behavior",
    ],
    cons: [
      "Not stable",
      "Poor cache performance",
      "More complex than simple algorithms",
      "Constant factors are relatively large",
    ],
    useCase:
      "When consistent O(n log n) performance and minimal memory usage are required.",
    code: {
      javascript: `function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}`,
      python: `def heap_sort(arr):
    n = len(arr)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

    return arr`,
      java: `public static void heapSort(int[] arr) {
    int n = arr.length;

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        heapify(arr, i, 0);
    }
}`,
      cpp: `void heapSort(vector<int>& arr) {
    int n = arr.size();

    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
    },
  },
  shell: {
    name: "Shell Sort",
    description:
      "An optimization over insertion sort that allows the exchange of items that are far apart, using a sequence of gaps that gradually decrease to 1.",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n^1.25)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    stable: false,
    inPlace: true,
    explanation:
      "Shell Sort improves upon insertion sort by comparing elements separated by a gap, which starts large and shrinks to 1.",
    howItWorks: [
      "Start with a large gap between compared elements",
      "Perform insertion sort on elements separated by this gap",
      "Reduce the gap and repeat the process",
      "Continue until the gap becomes 1",
      "Final pass with gap=1 is regular insertion sort",
    ],
    pros: [
      "Better than O(n²) for most inputs",
      "In-place sorting algorithm",
      "Simple to implement",
      "Good performance on medium-sized arrays",
    ],
    cons: [
      "Gap sequence affects performance significantly",
      "Not stable",
      "Worst-case is still O(n²)",
      "Complex analysis of time complexity",
    ],
    useCase:
      "Medium-sized arrays where simplicity is valued over optimal performance.",
    code: {
      javascript: `function shellSort(arr) {
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }
  }

  return arr;
}`,
      python: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i

            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap

            arr[j] = temp

        gap //= 2

    return arr`,
      java: `public static void shellSort(int[] arr) {
    int n = arr.length;

    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }
    }
}`,
      cpp: `void shellSort(vector<int>& arr) {
    int n = arr.size();

    for (int gap = n / 2; gap > 0; gap /= 2) {
        for (int i = gap; i < n; i++) {
            int temp = arr[i];
            int j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }
    }
}`,
    },
  },
  counting: {
    name: "Counting Sort",
    description:
      "A non-comparison sorting algorithm that counts the frequency of each distinct element and uses this information to place elements in their correct position.",
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
    },
    spaceComplexity: "O(k)",
    stable: true,
    inPlace: false,
    explanation:
      "Counting Sort works by counting the number of objects having distinct key values, where k is the range of input.",
    howItWorks: [
      "Find the range of input values (min to max)",
      "Create a count array to store frequency of each value",
      "Count the frequency of each element",
      "Modify count array to store actual positions",
      "Build output array using the count information",
    ],
    pros: [
      "Linear time complexity O(n+k)",
      "Stable sorting algorithm",
      "Simple to implement",
      "Efficient for small range of integers",
    ],
    cons: [
      "Only works with integers or objects that can be mapped to integers",
      "Requires extra space proportional to range",
      "Inefficient if range is much larger than number of elements",
      "Not suitable for general comparison-based sorting",
    ],
    useCase:
      "Sorting integers with a small, known range, or as a subroutine in radix sort.",
    code: {
      javascript: `function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Count frequencies
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  // Reconstruct sorted array
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (count[i] > 0) {
      output[index++] = i + min;
      count[i]--;
    }
  }

  return output;
}`,
      python: `def counting_sort(arr):
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)

    # Count frequencies
    for i in range(len(arr)):
        count[arr[i] - min_val] += 1

    # Reconstruct sorted array
    index = 0
    for i in range(range_val):
        while count[i] > 0:
            output[index] = i + min_val
            index += 1
            count[i] -= 1

    return output`,
      java: `public static int[] countingSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int range = max - min + 1;
    int[] count = new int[range];
    int[] output = new int[arr.length];

    // Count frequencies
    for (int i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    // Reconstruct sorted array
    int index = 0;
    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            output[index++] = i + min;
            count[i]--;
        }
    }

    return output;
}`,
      cpp: `vector<int> countingSort(vector<int>& arr) {
    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;
    vector<int> count(range, 0);
    vector<int> output(arr.size());

    // Count frequencies
    for (int i = 0; i < arr.size(); i++) {
        count[arr[i] - min_val]++;
    }

    // Reconstruct sorted array
    int index = 0;
    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            output[index++] = i + min_val;
            count[i]--;
        }
    }

    return output;
}`,
    },
  },
  radix: {
    name: "Radix Sort",
    description:
      "A non-comparison sorting algorithm that sorts integers by processing individual digits, starting from the least significant digit to the most significant.",
    timeComplexity: {
      best: "O(d × (n + k))",
      average: "O(d × (n + k))",
      worst: "O(d × (n + k))",
    },
    spaceComplexity: "O(n + k)",
    stable: true,
    inPlace: false,
    explanation:
      "Radix Sort processes digits one by one, using counting sort as a stable subroutine for each digit position.",
    howItWorks: [
      "Find the maximum number to determine digit count",
      "For each digit position (starting from least significant)",
      "Use counting sort to sort by current digit",
      "Maintain stability to preserve relative order",
      "Continue until all digits are processed",
    ],
    pros: [
      "Linear time complexity for fixed-width integers",
      "Stable sorting algorithm",
      "Can be faster than comparison sorts for integers",
      "Deterministic performance",
    ],
    cons: [
      "Only works with integers or fixed-width data",
      "Requires extra space",
      "Performance depends on number of digits",
      "Not suitable for arbitrary comparison functions",
    ],
    useCase:
      "Sorting large arrays of integers, especially when the range is not significantly larger than the number of elements.",
    code: {
      javascript: `function radixSort(arr) {
  const max = Math.max(...arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(arr, exp);
  }

  return arr;
}

function countingSortByDigit(arr, exp) {
  const output = new Array(arr.length);
  const count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let i = 0; i < arr.length; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // Change count[i] to actual position
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
    count[Math.floor(arr[i] / exp) % 10]--;
  }

  // Copy output back to arr
  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }
}`,
      python: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1

    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    output = [0] * len(arr)
    count = [0] * 10

    # Count occurrences of each digit
    for i in range(len(arr)):
        index = arr[i] // exp
        count[index % 10] += 1

    # Change count[i] to actual position
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output array
    i = len(arr) - 1
    while i >= 0:
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
        i -= 1

    # Copy output back to arr
    for i in range(len(arr)):
        arr[i] = output[i]`,
      java: `public static void radixSort(int[] arr) {
    int max = Arrays.stream(arr).max().getAsInt();

    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
      cpp: `void radixSort(vector<int>& arr) {
    int max_val = *max_element(arr.begin(), arr.end());

    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}`,
    },
  },
  bucket: {
    name: "Bucket Sort",
    description:
      "A distribution sorting algorithm that distributes elements into buckets, sorts individual buckets, and then concatenates the sorted buckets.",
    timeComplexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n + k)",
    stable: true,
    inPlace: false,
    explanation:
      "Bucket Sort works by distributing elements into buckets based on their values, then sorting each bucket individually.",
    howItWorks: [
      "Create empty buckets based on the range of input values",
      "Distribute elements into appropriate buckets",
      "Sort individual buckets using another algorithm",
      "Concatenate all sorted buckets to get final result",
      "Works best when input is uniformly distributed",
    ],
    pros: [
      "Can achieve linear time with uniform distribution",
      "Stable if underlying sort is stable",
      "Good for floating-point numbers",
      "Parallelizable (buckets can be sorted independently)",
    ],
    cons: [
      "Performance depends on input distribution",
      "Requires extra space for buckets",
      "Worst case can be O(n²)",
      "Choosing optimal bucket size can be challenging",
    ],
    useCase:
      "Sorting floating-point numbers or when input is uniformly distributed over a range.",
    code: {
      javascript: `function bucketSort(arr) {
  if (arr.length <= 1) return arr;

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);

  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.min(
      Math.floor((arr[i] - min) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIndex].push(arr[i]);
  }

  // Sort individual buckets and concatenate
  let result = [];
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      buckets[i].sort((a, b) => a - b);
      result.push(...buckets[i]);
    }
  }

  return result;
}`,
      python: `def bucket_sort(arr):
    if len(arr) <= 1:
        return arr

    max_val = max(arr)
    min_val = min(arr)
    bucket_count = int(len(arr) ** 0.5)
    bucket_size = (max_val - min_val + 1) // bucket_count + 1

    buckets = [[] for _ in range(bucket_count)]

    # Distribute elements into buckets
    for num in arr:
        bucket_index = min((num - min_val) // bucket_size, bucket_count - 1)
        buckets[bucket_index].append(num)

    # Sort individual buckets and concatenate
    result = []
    for bucket in buckets:
        if bucket:
            bucket.sort()
            result.extend(bucket)

    return result`,
      java: `public static int[] bucketSort(int[] arr) {
    if (arr.length <= 1) return arr;

    int max = Arrays.stream(arr).max().getAsInt();
    int min = Arrays.stream(arr).min().getAsInt();
    int bucketCount = (int) Math.sqrt(arr.length);
    int bucketSize = (max - min) / bucketCount + 1;

    List<List<Integer>> buckets = new ArrayList<>();
    for (int i = 0; i < bucketCount; i++) {
        buckets.add(new ArrayList<>());
    }

    // Distribute elements into buckets
    for (int num : arr) {
        int bucketIndex = Math.min((num - min) / bucketSize, bucketCount - 1);
        buckets.get(bucketIndex).add(num);
    }

    // Sort individual buckets and concatenate
    List<Integer> result = new ArrayList<>();
    for (List<Integer> bucket : buckets) {
        if (!bucket.isEmpty()) {
            Collections.sort(bucket);
            result.addAll(bucket);
        }
    }

    return result.stream().mapToInt(i -> i).toArray();
}`,
      cpp: `vector<int> bucketSort(vector<int>& arr) {
    if (arr.size() <= 1) return arr;

    int max_val = *max_element(arr.begin(), arr.end());
    int min_val = *min_element(arr.begin(), arr.end());
    int bucket_count = sqrt(arr.size());
    int bucket_size = (max_val - min_val) / bucket_count + 1;

    vector<vector<int>> buckets(bucket_count);

    // Distribute elements into buckets
    for (int num : arr) {
        int bucket_index = min((num - min_val) / bucket_size, bucket_count - 1);
        buckets[bucket_index].push_back(num);
    }

    // Sort individual buckets and concatenate
    vector<int> result;
    for (auto& bucket : buckets) {
        if (!bucket.empty()) {
            sort(bucket.begin(), bucket.end());
            result.insert(result.end(), bucket.begin(), bucket.end());
        }
    }

    return result;
}`,
    },
  },
  tim: {
    name: "Tim Sort",
    description:
      "A hybrid stable sorting algorithm derived from merge sort and insertion sort. It's the default sorting algorithm for Python and Java.",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    stable: true,
    inPlace: false,
    explanation:
      "Tim Sort identifies existing runs of ordered data and uses insertion sort for small segments and merge sort for larger ones.",
    howItWorks: [
      "Identify natural runs of ascending or descending data",
      "Use insertion sort for small runs (< 64 elements)",
      "Merge adjacent runs using an advanced merge technique",
      "Optimize for patterns commonly found in real-world data",
      "Use binary insertion sort and galloping mode for efficiency",
    ],
    pros: [
      "Adaptive - performs well on many kinds of partially ordered arrays",
      "Stable sorting algorithm",
      "Optimized for real-world data patterns",
      "Best-case linear time complexity",
      "Used as default in Python and Java",
    ],
    cons: [
      "Complex implementation",
      "Requires O(n) extra space",
      "May be overkill for simple random data",
      "More overhead than simple algorithms for small arrays",
    ],
    useCase:
      "Production systems where you need a general-purpose stable sort with good performance on real-world data.",
    code: {
      javascript: `function timSort(arr) {
  const MIN_MERGE = 32;
  const n = arr.length;

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

  return arr;
}`,
      python: `def tim_sort(arr):
    MIN_MERGE = 32
    n = len(arr)

    # Sort individual subarrays using insertion sort
    for i in range(0, n, MIN_MERGE):
        end = min(i + MIN_MERGE - 1, n - 1)
        insertion_sort(arr, i, end)

    # Start merging
    size = MIN_MERGE
    while size < n:
        for start in range(0, n, size * 2):
            mid = start + size - 1
            end = min(start + size * 2 - 1, n - 1)

            if mid < end:
                merge(arr, start, mid, end)
        size *= 2

    return arr`,
      java: `public static void timSort(int[] arr) {
    int MIN_MERGE = 32;
    int n = arr.length;

    // Sort individual subarrays using insertion sort
    for (int i = 0; i < n; i += MIN_MERGE) {
        int end = Math.min(i + MIN_MERGE - 1, n - 1);
        insertionSort(arr, i, end);
    }

    // Start merging
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int start = 0; start < n; start += 2 * size) {
            int mid = start + size - 1;
            int end = Math.min(start + 2 * size - 1, n - 1);

            if (mid < end) {
                merge(arr, start, mid, end);
            }
        }
    }
}`,
      cpp: `void timSort(vector<int>& arr) {
    const int MIN_MERGE = 32;
    int n = arr.size();

    // Sort individual subarrays using insertion sort
    for (int i = 0; i < n; i += MIN_MERGE) {
        int end = min(i + MIN_MERGE - 1, n - 1);
        insertionSort(arr, i, end);
    }

    // Start merging
    for (int size = MIN_MERGE; size < n; size = 2 * size) {
        for (int start = 0; start < n; start += 2 * size) {
            int mid = start + size - 1;
            int end = min(start + 2 * size - 1, n - 1);

            if (mid < end) {
                merge(arr, start, mid, end);
            }
        }
    }
}`,
    },
  },
};

export const getAlgorithmInfo = (key: AlgorithmKey): AlgorithmInfo => {
  return algorithmData[key];
};

export const getAllAlgorithms = (): {
  key: AlgorithmKey;
  info: AlgorithmInfo;
}[] => {
  return Object.entries(algorithmData).map(([key, info]) => ({
    key: key as AlgorithmKey,
    info,
  }));
};
