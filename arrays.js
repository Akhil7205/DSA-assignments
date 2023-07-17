// Q1)
function arrayPairSum(nums) {
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
  
    // Initialize the sum variable to store the maximum sum
    let maxSum = 0;
  
    // Iterate through the array and pair up the elements
    for (let i = 0; i < nums.length; i += 2) {
      // Take the minimum of each pair and add it to the sum
      maxSum += Math.min(nums[i], nums[i + 1]);
    }
  
    return maxSum;
  }
  
  // Test example
  const nums = [1, 4, 3, 2, 7, 5, 8, 6];
  const result = arrayPairSum(nums);
  console.log(result); // Output: 16


  //Q2)
  function maxCandies(candyType) {
    const n = candyType.length;
    const maxCandiesToEat = n / 2;
    
    // Use a Set to keep track of unique candy types
    const uniqueCandies = new Set();
  
    // Iterate through the candyType array to find different types of candies
    for (let i = 0; i < n && uniqueCandies.size < maxCandiesToEat; i++) {
      uniqueCandies.add(candyType[i]);
    }
  
    // Return the maximum number of different types of candies Alice can eat
    return uniqueCandies.size;
  }
  
  // Test example
  const candyType = [1, 1, 2, 2, 3, 3];
  const result = maxCandies(candyType);
  console.log(result); // Output: 3


  //Q3)
  function findLHS(nums) {
    const numFreq = new Map();
    let maxLength = 0;
  
    // Count the frequency of each number in the array
    for (const num of nums) {
      numFreq.set(num, (numFreq.get(num) || 0) + 1);
    }
  
    // Check for harmonious subsequence
    for (const [num, count] of numFreq) {
      if (numFreq.has(num + 1)) {
        const subsequenceLength = count + numFreq.get(num + 1);
        maxLength = Math.max(maxLength, subsequenceLength);
      }
    }
  
    return maxLength;
  }
  
  // Test example
  const nums = [1, 3, 2, 2, 5, 2, 3, 7];
  const result = findLHS(nums);
  console.log(result); // Output: 5

  //Q4)
  function canPlaceFlowers(flowerbed, n) {
    const length = flowerbed.length;
    let count = 0;
  
    for (let i = 0; i < length; i++) {
      if (flowerbed[i] === 0) {
        // Check if adjacent plots are also empty
        const prevEmpty = i === 0 ? 1 : flowerbed[i - 1] === 0;
        const nextEmpty = i === length - 1 ? 1 : flowerbed[i + 1] === 0;
  
        if (prevEmpty && nextEmpty) {
          flowerbed[i] = 1; // Plant a flower in the current plot
          count++; // Increment the number of planted flowers
        }
      }
    }
  
    return count >= n;
  }
  
  // Test example
  const flowerbed = [1, 0, 0, 0, 1];
  const n = 1;
  const result = canPlaceFlowers(flowerbed, n);
  console.log(result); // Output: true


  //Q5)
  function maximumProduct(nums) {
    // Sort the array in ascending order
    nums.sort((a, b) => a - b);
  
    const n = nums.length;
  
    // Case 1: Product of three largest positive numbers
    const product1 = nums[n - 1] * nums[n - 2] * nums[n - 3];
  
    // Case 2: Product of two smallest negative numbers and the largest positive number
    const product2 = nums[0] * nums[1] * nums[n - 1];
  
    // Return the maximum of the two products
    return Math.max(product1, product2);
  }
  
  // Test example
  const nums = [-4, -2, 1, 3, 5];
  const result = maximumProduct(nums);
  console.log(result); // Output: 60 (Product of 5 * 3 * 5)

  //Q6)
  function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
  
      if (nums[mid] === target) {
        return mid; // Found the target, return its index
      } else if (nums[mid] < target) {
        left = mid + 1; // Target is on the right half
      } else {
        right = mid - 1; // Target is on the left half
      }
    }
  
    return -1; // Target not found in the array
  }
  
  // Test example
  const nums = [-1, 0, 3, 5, 9, 12];
  const target = 9;
  const result = binarySearch(nums, target);
  console.log(result); // Output: 4 (index of target 9 in the array)


  //Q7)
  function isMonotonic(nums) {
    const n = nums.length;
    let increasing = true;
    let decreasing = true;
  
    for (let i = 1; i < n; i++) {
      if (nums[i] < nums[i - 1]) {
        increasing = false;
      }
      if (nums[i] > nums[i - 1]) {
        decreasing = false;
      }
    }
  
    return increasing || decreasing;
  }
  
  // Test examples
  console.log(isMonotonic([1, 2, 2, 3])); // Output: true (monotone increasing)
  console.log(isMonotonic([6, 5, 4, 4])); // Output: true (monotone decreasing)
  console.log(isMonotonic([1, 3, 2])); // Output: false (not monotonic)


  //Q8)
  function minScore(nums, k) {
    nums.sort((a, b) => a - b); // Sort the array in ascending order
  
    const n = nums.length;
    let left = 0;
    let right = n - 1;
  
    // Apply the operation to minimize the score
    while (left < right) {
      const maxDiff = Math.abs(nums[right] - nums[left]);
      const addMin = Math.min(k, maxDiff);
  
      nums[left] += addMin;
      nums[right] -= addMin;
  
      left++;
      right--;
    }
  
    // Calculate the minimum score
    return Math.max(...nums) - Math.min(...nums);
  }
  
  // Test example
  const nums = [1, 3, 6];
  const k = 3;
  const result = minScore(nums, k);
  console.log(result); // Output: 0 (After the operation: [3, 3, 3])