// Day 1: Delayed Promise

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Test using async/await
async function testDelay() {
    console.log("Waiting...");
    await delay(2000);
    console.log("This prints after 2 seconds");
}

testDelay();

// Test using .then()
console.log("Starting delay test with .then()");
delay(1000).then(() => {
    console.log("This prints after 1 second");
});