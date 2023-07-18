//Q1)
function commonElementsInThreeArrays(arr1, arr2, arr3) {
    const result = [];
    let i = 0, j = 0, k = 0;

    while (i < arr1.length && j < arr2.length && k < arr3.length) {
        if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
            result.push(arr1[i]);
            i++;
            j++;
            k++;
        } else if (arr1[i] < arr2[j]) {
            i++;
        } else if (arr2[j] < arr3[k]) {
            j++;
        } else {
            k++;
        }
    }

    return result;
}

// Example usage:
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 5, 7];
const arr3 = [3, 4, 5];
const result = commonElementsInThreeArrays(arr1, arr2, arr3);
console.log(result); // Output: [3, 5]

//Q2)
function distinctIntegersNotPresent(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    const notInNums2 = [...set1].filter(num => !set2.has(num));
    const notInNums1 = [...set2].filter(num => !set1.has(num));

    return [notInNums2, notInNums1];
}

// Example usage:
const nums1 = [1, 2, 2, 3, 4, 5];
const nums2 = [3, 4, 4, 5, 6, 7];
const result = distinctIntegersNotPresent(nums1, nums2);
console.log(result);
// Output: [[1, 2], [6, 7]]

//Q3)
function transposeMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // Initialize an empty 2D array for the transpose
    const transpose = Array(cols).fill(0).map(() => Array(rows).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            transpose[j][i] = matrix[i][j];
        }
    }

    return transpose;
}

// Example usage:
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const transposeResult = transposeMatrix(matrix);
console.log(transposeResult);
// Output:
// [
//   [1, 4, 7],
//   [2, 5, 8],
//   [3, 6, 9]
// ]

//Q4)
function arrayPairSum(nums) {
    nums.sort((a, b) => a - b);
    let maxSum = 0;

    for (let i = 0; i < nums.length; i += 2) {
        maxSum += nums[i];
    }

    return maxSum;
}

// Example usage:
const nums = [1, 4, 3, 2];
const result = arrayPairSum(nums);
console.log(result); // Output: 4 (pairs: (1, 2), (3, 4))

//Q5)
function arrangeCoins(n) {
    let left = 0;
    let right = n;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const currentSum = (mid * (mid + 1)) / 2;

        if (currentSum === n) {
            return mid; // Found exact number of complete rows
        } else if (currentSum < n) {
            left = mid + 1; // Check in the upper half
        } else {
            right = mid - 1; // Check in the lower half
        }
    }

    // If no exact match found, return the number of complete rows in the lower half
    return right;
}

// Example usage:
const n = 8;
const completeRows = arrangeCoins(n);
console.log(completeRows); // Output: 3 (complete rows: 1 + 2 + 3)

//Q6)
function sortedSquares(nums) {
    const n = nums.length;
    let left = 0;
    let right = n - 1;
    const result = new Array(n);

    for (let i = n - 1; i >= 0; i--) {
        const leftSquare = nums[left] ** 2;
        const rightSquare = nums[right] ** 2;

        if (leftSquare > rightSquare) {
            result[i] = leftSquare;
            left++;
        } else {
            result[i] = rightSquare;
            right--;
        }
    }

    return result;
}

// Example usage:
const nums = [-7, -3, 2, 3, 11];
const result = sortedSquares(nums);
console.log(result); // Output: [4, 9, 9, 49, 121]

//Q7)
function maxCount(m, n, ops) {
    let minRow = m;
    let minCol = n;

    for (const [ai, bi] of ops) {
        minRow = Math.min(minRow, ai);
        minCol = Math.min(minCol, bi);
    }

    return minRow * minCol;
}

// Example usage:
const m = 3;
const n = 3;
const ops = [
    [2, 2],
    [3, 3],
];
const result = maxCount(m, n, ops);
console.log(result); // Output: 4 (Maximum integers: [[1, 1, 0], [1, 1, 0], [0, 0, 0]])

//Q8)
function shuffleArray(nums, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(nums[i], nums[i + n]);
    }
    return result;
}

// Example usage:
const nums = [1, 2, 3, 4, 5, 6];
const n = 3;
const result = shuffleArray(nums, n);
console.log(result); // Output: [1, 4, 2, 5, 3, 6]
