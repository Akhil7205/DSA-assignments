//Q1)
function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [left + 1, right + 1];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    // No pair found
    return [];
}

// Example usage:
const numbers = [2, 7, 11, 15];
const target = 9;
const result = twoSum(numbers, target);
console.log(result); // Output: [1, 2] (numbers[1] + numbers[2] = 7 + 2 = 9)

//Q2)
function searchRange(nums, target) {
    let start = -1;
    let end = -1;

    // Binary search to find the first occurrence of the target
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            start = mid;
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Binary search to find the last occurrence of the target
    left = 0;
    right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            end = mid;
            left = mid + 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return [start, end];
}

// Example usage:
const nums = [5, 7, 7, 8, 8, 10];
const target = 8;
const result = searchRange(nums, target);
console.log(result); // Output: [3, 4] (the target 8 is found at positions 3 and 4)

//Q3)
function findPeakElement(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[mid + 1]) {
            // nums[mid] is a peak element
            right = mid;
        } else {
            // Search on the right side
            left = mid + 1;
        }
    }

    return left;
}

// Example usage:
const nums = [1, 2, 1, 3, 5, 6, 4];
const peakIndex = findPeakElement(nums);
console.log(peakIndex); // Output: Either 1 or 5 (indexes of peak elements: 2 and 6)

//Q4)
function searchInsert(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
}

// Example usage:
const nums = [1, 3, 5, 6];
const target = 5;
const index = searchInsert(nums, target);
console.log(index); // Output: 2 (index of target value 5 in the array)

//Q5)
function findMajorityElement(nums) {
    let candidate = null;
    let count = 0;

    // Step 1 and Step 2 of the Boyer-Moore Voting Algorithm
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
            count++;
        } else if (num === candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Step 3: Verify if candidate is the majority element
    count = 0;
    for (const num of nums) {
        if (num === candidate) {
            count++;
        }
    }

    // Step 4: Check if candidate is the majority element
    if (count > nums.length / 2) {
        return candidate;
    } else {
        return null;
    }
}

// Example usage:
const nums = [3, 3, 4, 2, 4, 4, 2, 4, 4];
const majorityElement = findMajorityElement(nums);
console.log(majorityElement); // Output: 4 (4 appears more than n/2 times)

//Q6)
function isBadVersion(version) {
    // This function is provided as an API and checks if a version is bad.
    // It returns true if the version is bad, false otherwise.
    // You can implement this function based on your specific product's logic.
    // For the sake of example, we will use a mock implementation here:
    return version >= 4; // Assuming version 4 and higher are bad versions.
}

function firstBadVersion(n) {
    let left = 1;
    let right = n;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (isBadVersion(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left; // 'left' contains the index of the first bad version.
}

// Example usage:
const n = 10;
const firstBad = firstBadVersion(n);
console.log(firstBad); // Output: 4 (the first bad version)

//Q7)

function mergeSort(arr) {
    if (arr.length <= 1) {
      return { sortedArray: arr, inversions: 0 };
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    const { sortedArray: leftSorted, inversions: leftInversions } = mergeSort(left);
    const { sortedArray: rightSorted, inversions: rightInversions } = mergeSort(right);
  
    let sortedArray = [];
    let inversions = leftInversions + rightInversions;
    let i = 0;
    let j = 0;
  
    while (i < leftSorted.length && j < rightSorted.length) {
      if (leftSorted[i] <= rightSorted[j]) {
        sortedArray.push(leftSorted[i]);
        i++;
      } else {
        sortedArray.push(rightSorted[j]);
        j++;
        inversions += leftSorted.length - i; // Count inversions when merging
      }
    }
  
    sortedArray = sortedArray.concat(leftSorted.slice(i)).concat(rightSorted.slice(j));
  
    return { sortedArray, inversions };
  }
  
  // Example usage:
  const arr = [2, 4, 1, 3, 5];
  const { inversions } = mergeSort(arr);
  console.log(inversions); // Output: 3 (There are 3 inversions: (2, 1), (4, 1), (4, 3))

//Q8)

function findCommonElements(ar1, ar2, ar3) {
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
  
    while (p1 < ar1.length && p2 < ar2.length && p3 < ar3.length) {
      if (ar1[p1] === ar2[p2] && ar2[p2] === ar3[p3]) {
        console.log(ar1[p1]); // Print the common element
        p1++;
        p2++;
        p3++;
      } else if (ar1[p1] <= ar2[p2] && ar1[p1] <= ar3[p3]) {
        p1++;
      } else if (ar2[p2] <= ar1[p1] && ar2[p2] <= ar3[p3]) {
        p2++;
      } else {
        p3++;
      }
    }
  }
  
  // Example usage:
  const ar1 = [1, 5, 10, 20, 40, 80];
  const ar2 = [6, 7, 20, 80, 100];
  const ar3 = [3, 4, 15, 20, 30, 70, 80, 120];
  
  findCommonElements(ar1, ar2, ar3);
  // Output: 20 and 80 (These are the common elements in all three arrays)
