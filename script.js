// Initialize Block.io
const blockIO = new BlockIo({
    apiKey: 'f078-6a0d-a16c-53b1', // Replace with your Block.io API key
    version: 2
});

// Function to fetch balance and address
function fetchWalletInfo() {
    blockIO.get_balance({}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        document.getElementById('balance').textContent = response.data.available_balance + ' BTC';
    });

    blockIO.get_my_addresses({}, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        document.getElementById('address').textContent = response.data.addresses[0].address;
    });
}

// Function to send Bitcoin
function sendBitcoin() {
    const amount = document.getElementById('amount').value;
    const toAddress = document.getElementById('to-address').value; // Assuming you have an input field with id 'to-address' for the recipient's address
    blockIO.withdraw({ amount: amount, to_addresses: toAddress }, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Transaction ID:', response.data.txid);
        // Optionally, you can display a success message to the user
    });
}

// Function to show the menu on small screens
function showMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show-menu');
}

// Fetch wallet information when the page loads
window.onload = function() {
    fetchWalletInfo(); // Initial fetch
    setInterval(fetchWalletInfo, 60000); // Fetch every 1 minute
};