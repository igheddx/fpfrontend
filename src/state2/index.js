import {createGlobalState} from 'react-hooks-global-state';


let accountsData = sessionStorage.getItem('cloundAccountData')
accountsData = JSON.parse(accountsData)

const {setGlobalState, useGlobalState} = createGlobalState({accountId: 0, accountName: "Test", defaultAccountId: 0});

    export {useGlobalState, setGlobalState};