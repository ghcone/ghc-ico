export default (state, action) => {
    switch(action.type) {
      case 'DELETE_TRANSACTION':
        return {
          ...state,
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
      case 'ADD_TRANSACTION':
        return {
          ...state,
          transactions: [action.payload, ...state.transactions]
        }
        case 'BUY_TOKENS':
          return {
            ...state,
            tokens: action.payload
          }
      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      case 'SETUP_CONTRACT':
        return {
          ...state,
          contract: action.payload
        }
        case 'SETUP_TOKEN':
          return {
            ...state,
            tokencontract: action.payload
          }
          case 'UPDATE_TOKEN_BALANCE':
          return {
            ...state,
            GHCBalance: action.payload
          }
          case 'ROUND_NUMBER':
          return {
            ...state,
            roundNumber: action.payload
          }
      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
        case 'GET_ROUND':
        return {
          ...state,
          round: action.payload
        }
      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }
      default:
        return state;
    }
  }
  