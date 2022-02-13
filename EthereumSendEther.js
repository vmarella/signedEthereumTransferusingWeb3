var Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/953671583e7043bf8b83535f1235e02f')
const account1 = 'PUBLIC KEY OF ACCOUNT1'
const account2 = 'PUBLIC KEY OF ACCOUNT2'
const PRIVATE_KEY_1 = Buffer.from('PRIVATE KEY OF ACCOUNT1', 'hex')
const PRIVATE_KEY_2 = Buffer.from('PRIVATE KEY OF ACCOUNT2', 'hex')

//PRIVATE Keys must be converted to Binary to be able to Sign the transactions. 
// We convert them to Binary using Buffer.


web3.eth.getTransactionCount(account1, (err, txCount) => {
    //Build the transaction
    const txObject = {
        nonce: web3.utils.toHex(txCount),  //helps to prevent double attack
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei('0.1','ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        chainID: 4
    }

    //Sign the transaction
    const tx = new Tx(txObject)
    tx.sign(PRIVATE_KEY_1)

    //Serialization of transaction
    const serializedTransaction = tx.serialize()
    const raw = '0x' + serializedTransaction.toString('hex')

    //Broadcast the transaction
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
    })
})











