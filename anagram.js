function groupAnagram(strArr) {
    let hashmap = {};
    for (let str of strArr) {
        // Array to store char value
        let count = new Array(26).fill(0);

        for (let char of str) {
            count[char.charCodeAt() - 97]++;
        }
        let key = count.join("");
        hashmap[key] ? hashmap[key].push(str) : hashmap[key] = [str];
    }
    let res = Object.values(hashmap)
    return res;
};

let stringsArr = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']
console.log(groupAnagram(stringsArr))