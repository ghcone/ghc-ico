import { setupWeb3, getRound, getRoundNumber, updateTokenBalance, setupContract, setupToken, addEthereumAccounts, addTransaction, web3LoadingError } from "./actions";
import Web3 from "web3";
import { GHC_ADDRESS, GHC_ABI } from '../contract/ghc';
import { GHC_TOKEN_ADDRESS, GHC_TOKEN_ABI } from '../contract/ghcToken';

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
            getRoundAsync(contract, dispatch)

            const tokencontract = new web3.eth.Contract(
                GHC_ABI, GHC_ADDRESS
            );
            const ghTokencontract = new web3.eth.Contract(
                GHC_TOKEN_ABI, GHC_TOKEN_ADDRESS
            );
            dispatch(setupToken(tokencontract));

            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            console.log("balance balance", balance)
            dispatch(addEthereumAccounts(accounts));
            console.log("contract = ", tokencontract);
            console.log("contract.methods = ", contract.methods);

            tokenLeftAsync(tokencontract);
            updateGHCBalance(ghTokencontract, accounts, dispatch);
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
    console.log("after weiRaisedAsync  transaction ", receipt);
    // dispatch(addTransaction(transaction));
    return receipt

}
export const updateGHCBalance = async (tokenContract, accounts, dispatch) => {

    if (tokenContract && accounts) {
        let balance = await tokenContract.methods
            .balanceOf(accounts[0]).call();
        console.log("afterGHC Balance", balance);
        dispatch(updateTokenBalance(balance));
        return balance;
    }
}
export const getRoundAsync = async (contract, dispatch) => {
    // var etherAmount = web3.toBigNumber("70000");
    const currecntRound = await contract.methods
        .currentRound().call();
    dispatch(getRoundNumber(currecntRound));

    let rounds = await contract.methods
        .rounds(currecntRound).call();
    const raised = await contract.methods
        .roundDetails(currecntRound).call();
    rounds.raised = raised;
    let round = {
        startTime: rounds.startTime,
        stopTime: rounds.stopTime,
        duration: rounds.duration,
        roundCap: rounds.roundCap,
        rate: rounds.rate,
        raised: raised

    }

    console.log("after weiRaisedAsync  Round ", round);
    dispatch(getRound(rounds));
    // dispatch(addTransaction(transaction));
    return rounds

}