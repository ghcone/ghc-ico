import { setupWeb3, setupContract, setupToken,addEthereumAccounts, addTransaction, web3LoadingError } from "./actions";
import Web3 from "web3";
import { EXPENSE_TRACKER_ABI, EXPENSE_TRACKER_ADDRESS } from '../contract/ExpenseTrackerContract';
import {FYNIX_ADDRESS ,FYNIX_ABI } from '../contract/fynxABI';
import {FYNIX_ICO_ADDRESS , FYNIX_ICO_ABI} from '../contract/fynxIcoABI';
// import {FYNIX_ADDRESS , FYNIX_ABI} from '../contract/fynxABI'

export const loadBlockchain = async(dispatch) =>{
    try {
        console.log("Web3 = ",Web3);
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        if(Web3.givenProvider){
            const web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(
                FYNIX_ICO_ABI,FYNIX_ICO_ADDRESS
                );
                const tokencontract = new web3.eth.Contract(
                    FYNIX_ABI,FYNIX_ADDRESS
                    );
                    dispatch(setupToken(tokencontract));

            dispatch(setupContract(contract));
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            console.log("contract = ",tokencontract);
            console.log("contract.methods = ",contract.methods);
            
           
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
        if(error.code===4001){
            
            dispatch(web3LoadingError(error.message));
        }
    }
}


// export const addTransactionAsync = async(contract, accounts, transaction, dispatch)=>{
//     console.log("before transaction");
//     const receipt =  await contract.methods.buyTokens(transaction.transactionDescription, transaction.amount).send({from : accounts[0]});
//     console.log("after  transaction ", receipt);
//     dispatch(addTransaction(transaction));
// }


// export const buyTokensAsync = async( beneficiary,accounts,contract ,etherValue ,dispatch)=>{
//     console.log("before transaction");
//     const web3 = new Web3(Web3.givenProvider);
//     // var etherAmount = web3.toBigNumber("70000");
//     const price = etherValue.toString(); //change it

//     const receipt = await contract.methods
//     .buyTokens(beneficiary)
//     .send({ from: accounts[0],gasLimit: 1 ,value: price }); 
//        console.log("after  transaction ", receipt);
//     // dispatch(addTransaction(transaction));
// }

export const buyTokensAsync = async( beneficiary,accounts,contract ,etherValue ,dispatch)=>{
    console.log("before transaction");
    const web3 = new Web3(Web3.givenProvider);
    // var etherAmount = web3.toBigNumber("70000");
    const price = etherValue.toString(); //change it
    // const web3 = new Web3(Web3.givenProvider);

    const receipt = await web3.eth.sendTransaction({ from: accounts[0],to: "0xafD4c866548e33ab5dDE00EB9aA524DC955c6bBC" ,value: price }); 
       console.log("after  transaction ", receipt);
    // dispatch(addTransaction(transaction));
}

// contract.deposit({'value': put_here_deposit_inputvalue_in_wei}, function (err, result){
// }