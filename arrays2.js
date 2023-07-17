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