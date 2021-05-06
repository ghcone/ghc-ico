import { setupWeb3, setupContract, setupToken, addEthereumAccounts, addTransaction, web3LoadingError } from "./actions";
import Web3 from "web3";
import { GHC_ADDRESS, GHC_ABI } from '../contract/ghc';

export const loadBlockchain = async (dispatch) => {
    try {
        console.log("Web3 = ", Web3);
        console.log("Web3.givenProvider = ", Web3.givenProvider);
        if (Web3.givenProvider) {
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(
                GHC_ABI, GHC_ADDRESS
            );
            const tokencontract = new web3.eth.Contract(
                GHC_ABI, GHC_ADDRESS
            );
            dispatch(setupToken(tokencontract));

            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            console.log("contract = ", tokencontract);
            console.log("contract.methods = ", contract.methods);

            tokenLeftAsync(tokencontract)
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch (error) {
        console.log("Error in loading Web3 = ", error);
        if (error.code === 4001) {

            dispatch(web3LoadingError(error.message));
        }
    }
}



export const buyTokensAsync = async (beneficiary, accounts, contract, etherValue, dispatch) => {
    console.log("before transaction");
    const price = etherValue.toString();
    const receipt = await contract.methods
        .buyTokens(beneficiary)
        .send({ from: accounts[0], value: price });
    console.log("after  transaction ", receipt);
}

export const tokenLeftAsync = async (contract) => {
    // var etherAmount = web3.toBigNumber("70000");
    const receipt = await contract.methods
        .weiRaised().call();
    console.log("after weiRaisedAsync  transaction ", receipt );
    // dispatch(addTransaction(transaction));
    return receipt

}