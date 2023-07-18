//Q1)
function threeSumClosest(nums, target) {
    nums.sort((a, b) => a - b); // Sort the array in ascending order
    const n = nums.length;
    let closestSum = nums[0] + nums[1] + nums[2]; // Initialize the closest sum to the first three elements
  
    for (let i = 0; i < n - 2; i++) {
      let left = i + 1;
      let right = n - 1;
  
      while (left < right) {
        const currentSum = nums[i] + nums[left] + nums[right];
  
        // Update the closest sum if the current sum is closer to the target
        if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
          closestSum = currentSum;
        }
  
        if (currentSum < target) {
          left++; // Move the left pointer to increase the sum
        } else if (currentSum > target) {
          right--; // Move the right pointer to decrease the sum
        } else {
          return target; // Exact sum found, return it immediately
        }
      }
    }
  
    return closestSum;
  }
  
  // Test example
  const nums = [-1, 2, 1, -4];
  const target = 1;
  const result = threeSumClosest(nums, target);
  console.log(result); // Output: 2 (Sum of -1 + 2 + 1)

  //Q2)

  function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const quadruplets = [];

    for (let a = 0; a < n - 3; a++) {
        if (a > 0 && nums[a] === nums[a - 1]) {
            continue;
        }

        for (let b = a + 1; b < n - 2; b++) {
            if (b > a + 1 && nums[b] === nums[b - 1]) {
                continue;
            }

            let left = b + 1;
            let right = n - 1;

            while (left < right) {
                const total = nums[a] + nums[b] + nums[left] + nums[right];
                if (total === target) {
                    quadruplets.push([nums[a], nums[b], nums[left], nums[right]]);
                    left++;
                    right--;

                    while (left < right && nums[left] === nums[left - 1]) {
                        left++;
                    }

                    while (left < right && nums[right] === nums[right + 1]) {
                        right--;
                    }
                } else if (total < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return quadruplets;
}

// Example usage:
const nums = [1, 0, -1, 0, -2, 2];
const target = 0;
const result = fourSum(nums, target);
console.log(result); // Output: [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]

//Q3)
function nextPermutation(nums) {
  const n = nums.length;
  let i = n - 2;

  // Step 1: Find the first element that breaks the non-increasing suffix
  while (i >= 0 && nums[i] >= nums[i + 1]) {
      i--;
  }

  if (i >= 0) {
      let j = n - 1;

      // Step 2: Find the smallest element greater than the pivot in the non-increasing suffix
      while (j >= 0 && nums[j] <= nums[i]) {
          j--;
      }

      // Step 3: Swap the pivot with the smallest greater element in the non-increasing suffix
      [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  // Step 4: Reverse the non-increasing suffix to get the smallest possible lexicographical order
  reverse(nums, i + 1);
}

function reverse(nums, start) {
  let end = nums.length - 1;
  while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
  }
}

// Example usage:
let arr = [1, 2, 3];
nextPermutation(arr);
console.log(arr); // Output: [1, 3, 2]

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

  // When the target is not found, left will be pointing to the position where the target should be inserted
  return left;
}

// Example usage:
const sortedArray = [1, 3, 5, 6];
const target = 4;
const index = searchInsert(sortedArray, target);
console.log(index); // Output: 2 (4 should be inserted at index 2 to maintain the sorted order)

//Q5)
function incrementLargeInteger(digits) {
  const n = digits.length;
  let carry = 1;

  for (let i = n - 1; i >= 0; i--) {
      const sum = digits[i] + carry;
      digits[i] = sum % 10;
      carry = Math.floor(sum / 10);

      if (carry === 0) {
          break;
      }
  }

  // If there's still a carry left, we need to add a new digit (1) at the beginning of the array.
  if (carry > 0) {
      digits.unshift(carry);
  }

  return digits;
}

// Example usage:
const largeInteger = [9, 9, 9];
const result = incrementLargeInteger(largeInteger);
console.log(result); // Output: [1, 0, 0, 0]

//Q6)
function findSingleNumber(nums) {
  let result = 0;

  for (const num of nums) {
      result ^= num;
  }

  return result;
}

// Example usage:
const nums = [4, 1, 2, 1, 2];
const singleNumber = findSingleNumber(nums);
console.log(singleNumber); // Output: 4

//Q7)
function findMissingRanges(nums, lower, upper) {
  const result = [];
  
  const addRange = (start, end) => {
      if (start === end) {
          result.push(start.toString());
      } else {
          result.push(start + "->" + end);
      }
  };

  // Helper function to find the next number after the given one
  const getNextNumber = (num) => {
      return num + 1;
  };

  let prev = lower - 1;
  for (const num of nums) {
      if (num > prev + 1) {
          addRange(getNextNumber(prev), num - 1);
      }
      prev = num;
  }

  // Check if there's any missing number after the last number in nums
  if (upper > prev) {
      addRange(getNextNumber(prev), upper);
  }

  return result;
}

// Example usage:
const nums = [0, 1, 3, 50, 75];
const lower = 0;
const upper = 99;
const result = findMissingRanges(nums, lower, upper);
console.log(result); // Output: ["2", "4->49", "51->74", "76->99"]