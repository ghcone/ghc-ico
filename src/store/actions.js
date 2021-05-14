// Actions
export const deleteTransaction = (id)=> {
    return {
        type: 'DELETE_TRANSACTION',
        payload: id
    };
}

export const addTransaction = (transaction)=> {
    return {
        type: 'ADD_TRANSACTION',
        payload: transaction
    };
}

export const buyTokens = (tokens)=> {
    return {
        type: 'BUY_TOKENS',
        payload: tokens
    };
}

export const setupWeb3 = (web3) => {
    return {
        type: 'SETUP_WEB3',
        payload: web3
    };
}

export const setupContract = (contract) => {
    return {
        type: 'SETUP_CONTRACT',
        payload: contract
    };
}
export const setupToken = (tokenContract) => {
    return {
        type: 'SETUP_TOKEN',
        payload: tokenContract
    };
}
export const getRound = (receipt) => {
    return {
        type: 'GET_ROUND',
        payload: receipt
    };
}
export const getRoundNumber = (receipt) => {
    return {
        type: 'ROUND_NUMBER',
        payload: receipt
    };
}
export const updateTokenBalance = (balance) => {
    return {
        type: 'UPDATE_TOKEN_BALANCE',
        payload: balance
    };
}
export const addEthereumAccounts = (accounts) => {
    return {
        type: 'ADD_ETHEREUM_ACCOUNTS',
        payload: accounts
    };
}


export const web3LoadingError = (errorMessage) => {
    return {
        type: 'WEB3_LOADING_ERROR',
        errorMessage: errorMessage
    };
}