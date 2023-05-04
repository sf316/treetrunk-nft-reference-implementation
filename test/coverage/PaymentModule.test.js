const PaymentModule = artifacts.require('PaymentModule');
const truffleAssert = require('truffle-assertions');

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
contract('PaymentModule', (accounts) => {
    const accAdmin = accounts[0];
    const accUser1 = accounts[1];
    const accUser2 = accounts[2];

    let paymentModule;

    before(async () => {
        paymentModule = await PaymentModule.deployed();
    });

    describe('Only owner can call update functions', async () => {
        it('addListNFT', async () => {
            await truffleAssert.reverts(paymentModule.addListNFT(ZERO_ADDRESS, [0], 0, '', { from: accAdmin }), '');
        });
        it('addRegisterPayment', async () => {
            await truffleAssert.reverts(paymentModule.addRegisterPayment(ZERO_ADDRESS, [0], 0, '', { from: accAdmin }), '');
        });
        it('removeRegisterPayment', async () => {
            await truffleAssert.reverts(paymentModule.removeRegisterPayment(ZERO_ADDRESS, [0], { from: accAdmin }), '');
        });
    });

    describe('Getter functions', async () => {
        it('getRegisterPayment for empty token', async () => {
            const result = await paymentModule.getRegisterPayment(1, { from: accAdmin });
            assert.equal(result.payment, 0);
        });
        it('checkRegisterPayment for empty token', async () => {
            const payment = await paymentModule.checkRegisterPayment(1, accUser1, { from: accAdmin });
            assert.equal(payment, 0);
        });
    });

    describe('Exist in NFT List', async =>{
        it('The seller of current token is the input address', async =>{
            assert,equal(ZERO_ADDRESS, accUser1);
        });
    });

    describe('addListNFT',async () =>{
        it('Check NFT Price', async () =>{
            const result = await paymentModule.addListNFT(ZERO_ADDRESS, [0], 0, '', { from: accAdmin });
            assert.equal(result.price,0);
        });
        it('Check if is already exist', async () =>{
            const result = await paymentModule.addListNFT(ZERO_ADDRESS, [0], 0, '', { from: accAdmin });
            assert(existsInListNFT(result.tokenId));
        });
        it('Check number of tokens listed', async() => {
            const result = await paymentModule.addListNFT(ZERO_ADDRESS, [0], 0, '', { from: accAdmin });
            const tokenIds = result.tokenIds;
            assert(tokenIds.length <= _maxListingNumber);
        });
    });

    describe('removeListNFT', async =>{
        it('Address of buyer should match', async() =>{
            const result = await paymentModule.removeRegisterPayment(ZERO_ADDRESS, [0], { from: accAdmin }, '');
            const buyer_address = registeredPayment[tokenId].buyer;
            assert.equal(buyer_address,result.buyer);
        })
    });
    describe('checkRegisteredPayment', async() =>{
        it('buyer of the token should match', async() =>{
            const result = await paymentModule.RegistedPayment(ZERO_ADDRESS, 0,0,'', { from: accAdmin });
            const check_buyer = await paymentModule.checkRegistedPayment(ZERO_ADDRESS, 0,0,'', { from: accAdmin });
            assert.equal(result[tokenId].buyer, check_buyer.buyer);
        });
        it('Peyment should equal the registered volume', async() => {
            const result = await paymentModule.RegistedPayment(ZERO_ADDRESS, 0,0,'', { from: accAdmin });
            const check = await paymentModule.checkRegistedPayment(ZERO_ADDRESS, 0,0,'', { from: accAdmin });
            assert.equal(result[tokenId].payment, check._payment);
        })
    })

});
