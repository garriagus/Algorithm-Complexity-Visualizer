const algorithmData = {
    name: "Insertion Sort",
    description: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.",
    complexity: {
        best: "O(n)",
        average: "O(n^2)",
        worst: "O(n^2)"
    },
    category: "Sorting",
    code: `function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
        return arr;
    }`,
    example_input: "[5, 2, 9, 1, 5, 6]",
    example_output: "[1, 2, 5, 5, 6, 9]",
    code_snippets: ["function insertionSort(arr) { ... }"]
};
