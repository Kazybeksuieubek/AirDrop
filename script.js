window.addEventListener('load', async () => {
    // Connect to the Ethereum network
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Connect to the Airdrop contract
    const contractAddress = '0x83306Ec2Cf960777441083529e6F9AA0e4a7041D';
    const contractABI = [{"inputs":[{"internalType":"address[]","name":"recipients","type":"address[]"}],"name":"distribute","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract Token","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract Token","name":"","type":"address"}],"stateMutability":"view","type":"function"}]; // ABI of Airdrop contract
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Get the input fields
    const recipient1Address = document.getElementById('recipient1');
    const recipient2Address = document.getElementById('recipient2');

    // Submit function
    const submit = async () => {
        // Disable the submit button
        document.querySelector('button[type="submit"]').setAttribute('disabled', true);

        // Get the recipient addresses
        const recipient1 = recipient1Address.value;
        const recipient2 = recipient2Address.value;

        // Call the distribute function
        if (!contract.functions.distribute) {
            console.error('The distribute function is not defined in the contract ABI');
            document.getElementById('message').innerHTML = 'The distribute function is not defined in the contract ABI';

            // Enable the submit button
            document.querySelector('button[type="submit"]').removeAttribute('disabled');
            return;
        }

        try {
            const tx = await contract.functions.distribute([recipient1, recipient2]);
            console.log(`Transaction hash: ${tx.hash}`);
            document.getElementById('message').innerHTML = 'Transaction submitted, please wait for confirmation...';
        } catch (error) {
            console.error(error);
            document.getElementById('message').innerHTML = 'Transaction failed...';
        
            // Enable the submit button
            document.querySelector('button[type="submit"]').removeAttribute('disabled');
        }
    };

    // Attach the submit function to the submit button
    document.querySelector('button[type="submit"]').addEventListener('click', submit);
});