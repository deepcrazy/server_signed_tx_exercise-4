## Exercise-4: Send Signed transaction to the smart contract.

### Name: Deepanshu Gupta
### Student Id: 101253525

#### Steps:
    1. Run ganache-cli -d
    2. Deploy stockOracleContract.sol file on remix by connecting remix to ganache using the very 1st account.
        Note: If in case, you want to use another account, then change the 'account' param (at line: 55 in app.js) and 'private key' param (at line: 56 in app.js).
    3. Run npm install.
    4. Run npm start and go to browser and browse: https://localhost:3000/
        - Make sure, it is running and able to see Express home page.
    5. On Terminal, the transaction hash will be generated.
    6. Go the remix and check the getprice and getvolume functions to check where the txns have been posted by the javascript code.

*Note: All the code is written in app.js file*