//Q1)
function reconstructPermutation(s) {
    const n = s.length + 1;
    let low = 0;
    let high = n;

    const perm = new Array(n);

    for (let i = 0; i < n - 1; i++) {
        if (s[i] === 'I') {
            perm[i] = low++;
        } else {
            perm[i] = high--;
        }
    }

    perm[n - 1] = low; // Fill the last element with the remaining number

    return perm;
}

// Example usage:
const s = 'IDID';
const result = reconstructPermutation(s);
console.log(result); // Output: [0, 4, 1, 3, 2]

//Q2)
function searchMatrix(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / n)][mid % n];

        if (midValue === target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

// Example usage:
const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
];
const target = 3;
const result = searchMatrix(matrix, target);
console.log(result); // Output: true

//Q3)
function validMountainArray(arr) {
    const n = arr.length;
    let i = 0;

    // Find the increasing part of the mountain
    while (i < n - 1 && arr[i] < arr[i + 1]) {
        i++;
    }

    // Check if there's an increasing part and a decreasing part
    if (i === 0 || i === n - 1) {
        return false;
    }

    // Find the decreasing part of the mountain
    while (i < n - 1 && arr[i] > arr[i + 1]) {
        i++;
    }

    // If we have traversed the entire array, then it's a valid mountain array
    return i === n - 1;
}

// Example usage:
const arr = [2, 3, 1]; // Example of a valid mountain array
const result = validMountainArray(arr);
console.log(result); // Output: true

//Q4)
function findMaxLength(nums) {
    const countMap = new Map();
    countMap.set(0, -1); // Initialize count of 0s as -1 at index -1 (before the array starts)
    let count = 0;
    let maxLength = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count--;
        } else {
            count++;
        }

        if (countMap.has(count)) {
            maxLength = Math.max(maxLength, i - countMap.get(count));
        } else {
            countMap.set(count, i);
        }
    }

    return maxLength;
}

// Example usage:
const nums = [0, 1, 0, 0, 1, 1, 0]; // Example binary array
const maxLength = findMaxLength(nums);
console.log(maxLength); // Output: 6 (the subarray [0, 1, 0, 0, 1, 1] has an equal number of 0s and 1s)

//Q5)
function minProductSum(nums1, nums2) {
    nums1.sort((a, b) => a - b); // Sort nums1 in ascending order
    nums2.sort((a, b) => b - a); // Sort nums2 in descending order

    let minProductSum = 0;

    for (let i = 0; i < nums1.length; i++) {
        minProductSum += nums1[i] * nums2[i];
    }

    return minProductSum;
}

// Example usage:
const nums1 = [1, 2, 3, 4];
const nums2 = [5, 2, 3, 1];
const result = minProductSum(nums1, nums2);
console.log(result); // Output: 22 (minimum product sum of the arrays [1,2,3,4] and [5,2,3,1])

//Q6)
function findOriginalArray(changed) {
    if (changed.length % 2 !== 0) {
        return [];
    }

    const original = [];
    const numCountMap = new Map();

    // Count the occurrences of each element in changed
    for (const num of changed) {
        numCountMap.set(num, (numCountMap.get(num) || 0) + 1);
    }

    // Iterate through each element of changed and find the corresponding elements in original
    for (const num of changed) {
        if (numCountMap.get(num) > 0) {
            const doubleNum = num * 2;

            if (num === 0) {
                if (numCountMap.get(0) % 2 !== 0) {
                    return [];
                } else {
                    original.push(0);
                    numCountMap.set(0, numCountMap.get(0) - 2);
                }
            } else if (numCountMap.get(doubleNum) > 0) {
                original.push(num);
                numCountMap.set(num, numCountMap.get(num) - 1);
                numCountMap.set(doubleNum, numCountMap.get(doubleNum) - 1);
            } else {
                return [];
            }
        }
    }

    return original;
}

// Example usage:
const changed = [2, 2, 4, 4, 6, 6];
const result = findOriginalArray(changed);
console.log(result); // Output: [1, 2, 3]

//Q7)
function generateMatrix(n) {
    const matrix = new Array(n).fill().map(() => new Array(n).fill(0));
    let num = 1;
    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;

    while (num <= n * n) {
        // Fill top row
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        // Fill right column
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        // Fill bottom row (in reverse)
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--;

        // Fill left column (in reverse)
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num++;
        }
        left++;
    }

    return matrix;
}

// Example usage:
const n = 3;
const result = generateMatrix(n);
console.log(result); // Output: [[1, 2, 3], [8, 9, 4], [7, 6, 5]]

//Q8)
function multiplySparseMatrices(mat1, mat2) {
    const m = mat1.length;
    const k = mat1[0].length;
    const n = mat2[0].length;

    const result = new Array(m).fill().map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let l = 0; l < k; l++) {
                result[i][j] += mat1[i][l] * mat2[l][j];
            }
        }
    }

    return result;
}

// Example usage:
const mat1 = [
    [1, 0, 0],
    [-1, 0, 3]
];

const mat2 = [
    [7, 0, 0],
    [0, 0, 0],
    [0, 0, 1]
];

const result = multiplySparseMatrices(mat1, mat2);
console.log(result);
// Output: [[7, 0, 0], [-7, 0, 3]]