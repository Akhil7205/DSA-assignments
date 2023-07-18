

//Q1)
function convertTo2DArray(original, m, n) {
    const totalElements = m * n;

    if (original.length !== totalElements) {
        return [];
    }

    const result = new Array(m);
    for (let i = 0; i < m; i++) {
        result[i] = original.slice(i * n, (i + 1) * n);
    }

    return result;
}

// Example usage:
const original = [1, 2, 3, 4, 5, 6];
const m = 2;
const n = 3;
const result = convertTo2DArray(original, m, n);
console.log(result);
// Output:
// [
//   [1, 2, 3],
//   [4, 5, 6]
// ]

//Q2)
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

//Q3)
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

//Q4)
function findDistinctIntegers(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    const notInNums2 = [...set1].filter(num => !set2.has(num));
    const notInNums1 = [...set2].filter(num => !set1.has(num));

    return [notInNums2, notInNums1];
}

// Example usage:
const nums1 = [1, 2, 2, 3, 4, 5];
const nums2 = [3, 4, 4, 5, 6, 7];
const result = findDistinctIntegers(nums1, nums2);
console.log(result);
// Output: [[1, 2], [6, 7]]

//Q5)
function distanceValue(arr1, arr2, d) {
    let distance = 0;

    for (let i = 0; i < arr1.length; i++) {
        let isValid = true;

        for (let j = 0; j < arr2.length; j++) {
            if (Math.abs(arr1[i] - arr2[j]) <= d) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            distance++;
        }
    }

    return distance;
}

// Example usage:
const arr1 = [4, 5, 8];
const arr2 = [10, 9, 1, 8];
const d = 2;
const result = distanceValue(arr1, arr2, d);
console.log(result); // Output: 2 (elements in arr1 that have no close element in arr2: 4, 5)

//Q6)
function findDuplicates(nums) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1;

        if (nums[index] < 0) {
            result.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }

    return result;
}

// Example usage:
const nums = [4, 3, 2, 7, 8, 2, 1, 1];
const result = findDuplicates(nums);
console.log(result); // Output: [2, 1]

//Q7)
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[right]) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return nums[left];
}

// Example usage:
const nums = [4, 5, 6, 7, 0, 1, 2];
const minElement = findMin(nums);
console.log(minElement); // Output: 0

//Q8)
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

            if (numCountMap.get(doubleNum) > 0) {
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