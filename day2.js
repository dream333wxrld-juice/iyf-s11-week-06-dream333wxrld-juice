// Day 2: Promise Chain

// Create 3 functions that each return a promise after a random delay
function task1() {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
            console.log(`Task 1 completed after ${delay}ms`);
            resolve("Task 1 result");
        }, delay);
    });
}

function task2() {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
            console.log(`Task 2 completed after ${delay}ms`);
            resolve("Task 2 result");
        }, delay);
    });
}

function task3() {
    return new Promise(resolve => {
        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => {
            console.log(`Task 3 completed after ${delay}ms`);
            resolve("Task 3 result");
        }, delay);
    });
}

// Chain them together and time the total execution
async function runChain() {
    const startTime = Date.now();

    const result1 = await task1();
    const result2 = await task2();
    const result3 = await task3();

    const endTime = Date.now();
    const totalTime = endTime - startTime;

    console.log("All results:", [result1, result2, result3]);
    console.log(`Total execution time: ${totalTime}ms`);
}

runChain();