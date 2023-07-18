//Q1)
function minimumDeleteSum(s1, s2) {
    const m = s1.length;
    const n = s2.length;

    // Create a 2D DP table filled with zeros
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the DP table using the recurrence relation
    for (let i = 1; i <= m; i++) {
        dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
    }

    for (let j = 1; j <= n; j++) {
        dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + s1.charCodeAt(i - 1),
                    dp[i][j - 1] + s2.charCodeAt(j - 1)
                );
            }
        }
    }

    return dp[m][n];
}

// Example usage:
const s1 = "sea";
const s2 = "eat";
const result = minimumDeleteSum(s1, s2);
console.log(result); // Output: 231 (delete 's' and 'e' from s1, delete 't' from s2)


//Q2)
function isValid(s) {
    const stack = [];
    const asterisks = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            stack.push(i);
        } else if (s[i] === '*') {
            asterisks.push(i);
        } else {
            if (stack.length > 0) {
                stack.pop();
            } else if (asterisks.length > 0) {
                asterisks.pop();
            } else {
                return false;
            }
        }
    }

    while (stack.length > 0 && asterisks.length > 0) {
        const leftParenIndex = stack.pop();
        const asteriskIndex = asterisks.pop();
        if (leftParenIndex > asteriskIndex) {
            return false;
        }
    }

    return stack.length === 0;
}

// Example usage:
const s = "(*))";
const result = isValid(s);
console.log(result); // Output: true (the string is valid)

//Q3)
function minSteps(word1, word2) {
    const m = word1.length;
    const n = word2.length;

    // Create a 2D DP table filled with zeros
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // Fill the DP table using the recurrence relation
    for (let i = 1; i <= m; i++) {
        dp[i][0] = i; // Minimum number of steps to make word1[0:i-1] empty
    }

    for (let j = 1; j <= n; j++) {
        dp[0][j] = j; // Minimum number of steps to make word2[0:j-1] empty
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
            }
        }
    }

    return dp[m][n];
}

// Example usage:
const word1 = "sea";
const word2 = "eat";
const result = minSteps(word1, word2);
console.log(result); // Output: 2 (delete 's' and 'e' from word1 to make it 'a', delete 't' from word2 to make it 'a')

//Q4)
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function buildTree(s) {
    let index = 0;

    const parseInteger = () => {
        let num = '';
        while (index < s.length && /\d/.test(s[index])) {
            num += s[index];
            index++;
        }
        return parseInt(num);
    };

    const buildSubTree = () => {
        if (s[index] === '(') {
            index++; // Skip the opening parenthesis
            const rootVal = parseInteger();
            const root = new TreeNode(rootVal);
            root.left = buildSubTree(); // Construct the left subtree
            if (s[index] === ')') {
                index++; // Skip the closing parenthesis
                root.right = buildSubTree(); // Construct the right subtree
            }
            if (s[index] === ')') {
                index++; // Skip the closing parenthesis
            }
            return root;
        } else {
            return null; // No subtree, return null
        }
    };

    return buildSubTree();
}

// Example usage:
const s = "4(2(3)(1))(6(5))";
const root = buildTree(s);
console.log(root);

//Q5)
function compress(chars) {
    let read = 0;
    let write = 0;

    while (read < chars.length) {
        let count = 1;

        // Count consecutive repeating characters
        while (read + 1 < chars.length && chars[read] === chars[read + 1]) {
            read++;
            count++;
        }

        chars[write] = chars[read]; // Write the current character

        // Compress characters if count > 1
        if (count > 1) {
            const countStr = count.toString();
            for (let i = 0; i < countStr.length; i++) {
                write++;
                chars[write] = countStr[i];
            }
        }

        read++;
        write++;
    }

    return write;
}

// Example usage:
const chars = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
const compressedLength = compress(chars);
console.log(chars.slice(0, compressedLength)); // Output: ['a', '2', 'b', '2', 'c', '3']

//Q6)

function findAnagrams(s, p) {
    const result = [];
    const pFreqMap = new Map();
    const windowFreqMap = new Map();
    const pSize = p.length;
    const sSize = s.length;

    // Helper function to compare frequency maps
    const isAnagram = () => {
        for (const [char, freq] of pFreqMap) {
            if (windowFreqMap.get(char) !== freq) {
                return false;
            }
        }
        return true;
    };

    // Initialize frequency map for string p
    for (const char of p) {
        pFreqMap.set(char, (pFreqMap.get(char) || 0) + 1);
    }

    let left = 0;
    for (let right = 0; right < sSize; right++) {
        const charRight = s[right];

        // Update frequency map for the window
        windowFreqMap.set(charRight, (windowFreqMap.get(charRight) || 0) + 1);

        // Shrink the window if it exceeds the size of p
        if (right - left + 1 > pSize) {
            const charLeft = s[left];
            if (windowFreqMap.get(charLeft) === 1) {
                windowFreqMap.delete(charLeft);
            } else {
                windowFreqMap.set(charLeft, windowFreqMap.get(charLeft) - 1);
            }
            left++;
        }

        // Check if the window and p are anagrams
        if (right - left + 1 === pSize && isAnagram()) {
            result.push(left);
        }
    }

    return result;
}

// Example usage:
const s = "cbaebabacd";
const p = "abc";
const result = findAnagrams(s, p);
console.log(result); // Output: [0, 6] (substring "cba" and "bac" in s are anagrams of "abc")

//Q7)
function decodeString(s) {
    const stack = [];
    let num = 0;
    let currentString = '';

    for (const char of s) {
        if (char === '[') {
            stack.push(currentString);
            stack.push(num);
            currentString = '';
            num = 0;
        } else if (char === ']') {
            let prevNum = stack.pop();
            let prevString = stack.pop();
            currentString = prevString + currentString.repeat(prevNum);
        } else if (/\d/.test(char)) {
            num = num * 10 + parseInt(char);
        } else {
            currentString += char;
        }
    }

    return currentString;
}

// Example usage:
const encodedString = "3[a2[c]]";
const decodedString = decodeString(encodedString);
console.log(decodedString); // Output: "accaccacc"

//Q8)
function canSwapTwoLetters(s, goal) {
    if (s.length !== goal.length) {
        return false;
    }

    if (s === goal) {
        return true;
    }

    const diffIndices = [];
    const diffChars = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] !== goal[i]) {
            diffIndices.push(i);
            diffChars.push(s[i]);
            diffChars.push(goal[i]);
        }
    }

    if (diffIndices.length !== 2 || diffChars[0] !== diffChars[3] || diffChars[1] !== diffChars[2]) {
        return false;
    }

    return true;
}

// Example usage:
const s = "abcd";
const goal = "cbad";
console.log(canSwapTwoLetters(s, goal)); // Output: true

