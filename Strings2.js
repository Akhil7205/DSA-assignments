//Q1)
function isIsomorphic(s, t) {
    if (s.length !== t.length) {
        return false;
    }

    const sToTMap = new Map();
    const tToSMap = new Map();

    for (let i = 0; i < s.length; i++) {
        const sChar = s[i];
        const tChar = t[i];

        if ((sToTMap.has(sChar) && sToTMap.get(sChar) !== tChar) || (tToSMap.has(tChar) && tToSMap.get(tChar) !== sChar)) {
            return false;
        }

        sToTMap.set(sChar, tChar);
        tToSMap.set(tChar, sChar);
    }

    return true;
}

// Example usage:
const s = "egg";
const t = "add";
const result = isIsomorphic(s, t);
console.log(result); // Output: true (s and t are isomorphic)

//Q2)
function isStrobogrammatic(num) {
    const strobogrammaticPairs = {
        '0': '0',
        '1': '1',
        '6': '9',
        '8': '8',
        '9': '6',
    };

    let left = 0;
    let right = num.length - 1;

    while (left <= right) {
        const leftDigit = num[left];
        const rightDigit = num[right];

        if (!(leftDigit in strobogrammaticPairs && strobogrammaticPairs[leftDigit] === rightDigit)) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// Example usage:
const num = "69";
const result = isStrobogrammatic(num);
console.log(result); // Output: true (69 is a strobogrammatic number)

//Q3)
function addStrings(num1, num2) {
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    let result = "";

    while (i >= 0 || j >= 0 || carry > 0) {
        const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
        const digit2 = j >= 0 ? parseInt(num2[j]) : 0;

        const sum = digit1 + digit2 + carry;
        const currentDigit = sum % 10;
        carry = Math.floor(sum / 10);

        result = currentDigit.toString() + result;

        i--;
        j--;
    }

    return result;
}

// Example usage:
const num1 = "123";
const num2 = "45";
const result = addStrings(num1, num2);
console.log(result); // Output: "168" (123 + 45 = 168)

//Q4)
function reverseWords(s) {
    const words = s.split(" ");
    const reversedWords = words.map(word => reverseWord(word));
    return reversedWords.join(" ");
}

function reverseWord(word) {
    return word.split("").reverse().join("");
}

// Example usage:
const s = "Let's code together";
const result = reverseWords(s);
console.log(result); // Output: "s'teL edoc rehtegot"

//Q5)
function reverseStr(s, k) {
    const arr = s.split("");
    const n = s.length;

    for (let i = 0; i < n; i += 2 * k) {
        let start = i;
        let end = Math.min(i + k - 1, n - 1);

        while (start < end) {
            const temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }

    return arr.join("");
}

// Example usage:
const s = "abcdefg";
const k = 2;
const result = reverseStr(s, k);
console.log(result); // Output: "bacdfeg"

//Q6)
function canShiftToGoal(s, goal) {
    const concatenatedS = s + s;
    return concatenatedS.includes(goal);
}

// Example usage:
const s = "abcde";
const goal = "cdeab";
const result = canShiftToGoal(s, goal);
console.log(result); // Output: true (cdeab can be obtained from abcde after some shifts)

//Q7)
function processString(str) {
    const stack = [];
    for (const char of str) {
        if (char !== '#') {
            stack.push(char);
        } else {
            stack.pop();
        }
    }
    return stack.join('');
}

function backspaceCompare(s, t) {
    return processString(s) === processString(t);
}

// Example usage:
const s = "ab#c";
const t = "ad#c";
const result = backspaceCompare(s, t);
console.log(result); // Output: true (both strings result in "ac" after backspacing)

//Q8)
function checkStraightLine(coordinates) {
    const n = coordinates.length;
    if (n <= 2) {
        return true; // Any two points or a single point always form a straight line
    }

    // Calculate the cross product for the first three points
    const crossProduct = (x1, y1, x2, y2, x3, y3) => {
        return (x2 - x1) * (y3 - y2) - (x3 - x2) * (y2 - y1);
    };

    const [x1, y1] = coordinates[0];
    const [x2, y2] = coordinates[1];
    for (let i = 2; i < n; i++) {
        const [x3, y3] = coordinates[i];
        if (crossProduct(x1, y1, x2, y2, x3, y3) !== 0) {
            return false;
        }
    }

    return true;
}

// Example usage:
const coordinates = [[1,2], [2,3], [3,4], [4,5], [5,6]];
const result = checkStraightLine(coordinates);
console.log(result); // Output: true (all points lie on a straight line)