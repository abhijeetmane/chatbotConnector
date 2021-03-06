//require the express nodejs module
// import * as firebase from 'firebase';

var portfolioDetails = [{
        "pid": "12336745",
        "dataType": "checkboxText",
        "total": 1024061.97,
        "growthYTD": -21149.42,
        "prfnPercent": -3.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "7",
        "type": "Discretionary",
        "assetClasses": [{
            "amount": 21.43,
            "assetClass": "Liquidity"
        }, {
            "amount": 23.42,
            "assetClass": "Fixed Income"
        }, {
            "amount": 17.31,
            "assetClass": "Equities"
        }, {
            "amount": 17.42,
            "assetClass": "Alternative Investments"
        }, {
            "amount": 20.42,
            "assetClass": "Futures and Options"
        }],
        "ownership": false
    },
    {
        "pid": "53367461",
        "total": 12348.97,
        "growthYTD": -89332.42,
        "prfnPercent": -36.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "7",
        "type": "Discretionary",
        "assetClasses": [{
            "amount": 9,
            "assetClass": "Liquidity"
        }, {
            "amount": 29,
            "assetClass": "Fixed Income"
        }, {
            "amount": 21,
            "assetClass": "Equities"
        }, {
            "amount": 27,
            "assetClass": "Alternative Investments"
        }, {
            "amount": 14,
            "assetClass": "Futures and Options"
        }],
        "ownership": true
    },
    {
        "pid": "3888332",
        "totalAmount": 2432.97,
        "growthYTD": -35.42,
        "prfnPercent": -43.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "low",
        "type": "Discretionary",
        "assetClasses": [{
            "amount": 11,
            "assetClass": "Liquidity"
        }, {
            "amount": 2,
            "assetClass": "Fixed Income"
        }, {
            "amount": 65,
            "assetClass": "Equities"
        }, {
            "amount": 9,
            "assetClass": "Alternative Investments"
        }, {
            "amount": 13,
            "assetClass": "Futures and Options"
        }],
        "ownership": false
    },
    {
        "pid": "92174565",
        "totalAmount": 8332.97,
        "growthYTD": -35.42,
        "prfnPercent": -43.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "low",
        "type": "Discretionary",
        "assetClasses": [{
            "amount": 9,
            "assetClass": "Liquidity"
        }, {
            "amount": 3,
            "assetClass": "Fixed Income"
        }, {
            "amount": 63,
            "assetClass": "Equities"
        }, {
            "amount": 12,
            "assetClass": "Alternative Investments"
        }, {
            "amount": 13,
            "assetClass": "Futures and Options"
        }],
        "ownership": false
    }, {
        "pid": "12336749",
        "totalAmount": 7645.97,
        "growthYTD": -35.42,
        "prfnPercent": -43.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "low",
        "type": "Discretionary",
        "assetClasses": [{
            "amount": 5,
            "assetClass": "Liquidity"
        }, {
            "amount": 7,
            "assetClass": "Fixed Income"
        }, {
            "amount": 60,
            "assetClass": "Equities"
        }, {
            "amount": 12,
            "assetClass": "Alternative Investments"
        }, {
            "amount": 16,
            "assetClass": "Futures and Options"
        }],
        "ownership": false
    }
];


var firebase = require('firebase'),

    express = require('express'),
    //set an instance of exress
    app = express(),
    //require the body-parser nodejs module
    bodyParser = require('body-parser'),
    //require the path nodejs module
    path = require("path"),


    config = {
        apiKey: "AIzaSyD6jFXalt-AXrK0JsiHHp9MuxumTSXUZ_M",
        authDomain: "awesome-flash-99616.firebaseapp.com",
        databaseURL: "https://awesome-flash-99616.firebaseio.com",
        projectId: "awesome-flash-99616",
        storageBucket: "awesome-flash-99616.appspot.com",
        messagingSenderId: "64543180480"
    },
    name;

firebase.initializeApp(config);

let getFireName = (callback) => {
    /* Code for reading from  firebase database */

    console.log('inside getFireName');
    // return firebase.database().ref('/').on('value', callback);

    /* Code for loadeing data once which isn't expected to change frequently */
    // firebase.database().ref('/').once('value').then(function(snapshot) {

    //     snapshot.forEach(function(childSnapshot) {
    //         var childKey = childSnapshot.key;
    //         var childData = childSnapshot.val();
    //         console.log('childData=' + childData); // ...
    //         // ...
    //     });

    // });

    /* Code for wrtiting to firebase database */

    // firebase.database().ref('/').set({
    //     name: 'abhijeeet'
    // });
}

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//tell express what to do when the /form route is requested
app.post('/fulfillment', function(req, res) {
    var resultVal = {};
    res.setHeader('Content-Type', 'application/json');
    console.log('req.body.result');
    console.log(req.body.result);
    switch (req.body.result.action) {

        case 'portfoliolist':
            resultVal = processPortfolioRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'history':
            resultVal = processHistoryRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'portfolio.compareportfolio':
            resultVal = comparePortfolios(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'portfolio.compareportfolioOptions':
            resultVal = processPortfoliocheckboxRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'faq':
            resultVal = processFaqRequest(req.body.result.parameters, res);
            break;
        case 'welcome':
            resultVal = processWelcomeRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'portfolio.portfoliodetails':
            resultVal = processPortfolioDtlRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'portfolio.assetdetails':
            resultVal = processAssetDtlRequest(req.body.result.parameters, req.body.result.contexts, res);
            break;
        case 'vc.showaccounts':
            resultVal = vcShowAccounts(req.body.result.parameters, res);
            break;
        case 'vc.accountBalance':
            resultVal = vcAccountBalance(req.body.result.parameters, res);
            break;
        case 'vc.showVcCreditCard':
            resultVal = vcShowVcCreditCard(req.body.result.parameters, res);
            break;
        case 'vc.showCreditCards':
            resultVal = vcShowCreditCards(req.body.result.parameters, res);
            break;
        default:

            console.log('No intents matched');
    }

    // res.send(JSON.stringify(resultVal));

    //debugging output for the terminal
    console.log('request is : ', req.body.result.action, req.body.result.parameters);
});



function vcShowAccounts(data, res) {

    var datareturn = {
        "userId": "abhijeet",
        "accounts": [{
            "id": "NL91ABNA0417164300",
            "type": "Savings",
            "accountNumber": "0417164300",
            "acccountHolder": "Abhijeet Mane",
            "iban": "NL91ABNA0417164300",
            "currency": "EUR",
            "accountBalance": 7843.28,
            "creditcardCount": 1,
            "creditcardsTotalBalance": -496.4,
            "creditcardsTotalCurrency": "EUR"
        }],
        'speechText': 'Account details of your Account'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find Details of your portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Account details of your Account"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function vcAccountBalance(data, res) {
    var datareturnaccount = {
        "userId": "abhijeet",
        "accountId": "NL91ABNA0417164300",
        "creditcards": [{
            "creditcardId": "675654",
            "cardNumber": "567191XXXXXX3686",
            "cardHolder": "Abhijeet Mane",
            "cardType": "VISA CLASSIC international",
            "cardBalance": -496.4,
            "cardBalanceDate": "16/09/2017",
            "cardCurrency": "EUR"
        }],
        'speechText': 'Balance details of your Account'
    };

    var datareturnCC = {
        "userId": "abhijeet",
        "accountId": "NL91ABNA0417164300",
        "creditcards": [{
            "creditcardId": "675654",
            "cardNumber": "567191XXXXXX3686",
            "cardHolder": "Abhijeet Mane",
            "cardType": "VISA CLASSIC international",
            "cardBalance": -496.4,
            "cardBalanceDate": "16/09/2017",
            "cardCurrency": "EUR"
        }],
        'speechText': 'Balance details of your Account'
    };

    if (data.number === null || data.number === undefined || data.number === "") {
        var datareturn = {
            "accountKey": "Please enter account number or credit card number you want to retrieve balance"
        };
    } else if (data.number === "NL91ABNA0417164300") {
        var datareturn = datareturnaccount;
    } else {
        var datareturn = datareturnCC;
    }

    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find Details of your portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Balance details of your Account"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;

}

function vcShowVcCreditCard(data, res) {
    var datareturn = {
        "userId": "abhijeet",
        "accountId": "NL91ABNA0417164300",
        "creditcardId": "675654",
        "virtualCards": [{
            "id": "875655",
            "cardNumber": "2937816292739723",
            "cardType": "VISA CLASSIC international",
            "cardInitialBalance": 30,
            "cardRemainingBalance": 30,
            "cardBalanceDate": "16/09/2017",
            "cardCurrency": "EUR",
            "cardValidFrom": "16/09/2017",
            "cardValidTill": "31/10/2017",
            "cardStatus": "Active"
        }],
        'speechText': 'Your virtual credit card'
    };

    console.log("input data");
    console.log(data.number);
    if (data.number === null || data.number === undefined || data.number === "") {
       var datareturn = {
            "amountKey": "Please enter amount"
        };
    }
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": JSON.stringify(datareturn),
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Your virtual credit card"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;

}

function vcShowCreditCards(data, res) {
    var datareturn = {
        "userId": "abhijeet",
        "accountId": "NL91ABNA0417164300",
        "creditcards": [{
            "creditcardId": "675654",
            "cardNumber": "567191XXXXXX3686",
            "cardHolder": "Abhijeet Mane",
            "cardType": "VISA CLASSIC international",
            "cardBalance": -496.4,
            "cardBalanceDate": "16/09/2017",
            "cardCurrency": "EUR",
            "virtualCards": [{
                "id": "875655",
                "cardNumber": "2937816292739723",
                "cardType": "VISA CLASSIC international",
                "cardInitialBalance": 30,
                "cardRemainingBalance": 30,
                "cardBalanceDate": "16/09/2017",
                "cardCurrency": "EUR",
                "cardValidFrom": "16/09/2017",
                "cardValidTill": "31/10/2017",
                "cardStatus": "Active"
            }]
        }],
        'speechText': 'Your credit cards'
    }
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find the accounts",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Your credit cards"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;

}

function processPortfolioDtlRequest(data, contexts, res) {

    console.log('inside processPortfolioDtlRequest');

    console.log(contexts[0].parameters);
    var selectedportfolioID = contexts[0].parameters.number;
    var portfolioDtl;


    for (var i = 0; i < portfolioDetails.length; i++) {
        console.log(portfolioDetails.length + ' ' + i);

        if (portfolioDetails[i].pid == selectedportfolioID) {
            portfolioDtl = portfolioDetails[i];
        }

    }

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeet',
        "portfolioDtl": portfolioDtl,
        'speechText': 'Details of your portfolio are'
    }
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Details of your portfolio are",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Details of your portfolio are"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}



function comparePortfolios(data, contexts, res) {

    console.log('inside comparePortfolios');

    console.log(contexts[0].parameters);
    var selectedportfolioID1 = contexts[0].parameters.number;
    var selectedportfolioID2 = contexts[0].parameters.number1;
    var portfolioAssetDtl;

    var assetsArray1 = [];
    var assetsArray2 = [];
    var assetsArray = [];

    for (var i = 0; i < portfolioDetails.length; i++) {
        console.log(portfolioDetails.length + ' ' + i);

        if (portfolioDetails[i].pid == selectedportfolioID1) {

            for (var j = 0; j < portfolioDetails[i].assetClasses.length; j++) {
                assetsArray1.push(portfolioDetails[i].assetClasses[j].amount);

            }

        }

        if (portfolioDetails[i].pid == selectedportfolioID2) {

            for (var k = 0; k < portfolioDetails[i].assetClasses.length; k++) {
                assetsArray2.push(portfolioDetails[i].assetClasses[k].amount);

            }

        }

    }

    assetsArray.push(assetsArray1);
    assetsArray.push(assetsArray2);
    console.log(assetsArray);

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeet',
        'comparedArray': {
            "data": assetsArray,
            "dataType": "performanceGraph",
            "series": [selectedportfolioID1, selectedportfolioID2],
            "labels": ["Liquidität", "Rentenanlagen", "Aktienanlagen", "Alternative Investments", "Futures und Optionen"]
        },

        'speechText': 'Comparision Details of your portfolio'
    };

    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Comparision Details of your portfolio",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Comparision Details of your portfolio"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processAssetDtlRequest(data, contexts, res) {

    console.log('inside processPortfolioDtlRequest');

    console.log(contexts[0].parameters);
    var selectedportfolioID = contexts[0].parameters.number;
    if (!contexts[0].parameters.number) {
        selectedportfolioID = contexts[0].parameters.defaultNumber;
    }
    var portfolioAssetDtl;

    for (var i = 0; i < portfolioDetails.length; i++) {
        console.log(portfolioDetails.length + ' ' + i);

        if (portfolioDetails[i].pid == selectedportfolioID) {
            portfolioAssetDtl = portfolioDetails[i].assetClasses;
        }

    }

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeet',
        'portfoliolist': {
            "chartData": portfolioAssetDtl,
            "dataType": "donutChart"
        },
        'speechText': 'Asset Details of your portfolio'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Asset Details of your portfolio",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Asset Details of your portfolio"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}


function processPortfolioRequest(data, contexts, res) {

    console.log('inside processPortfolioRequest');

    console.log(contexts[0].parameters);

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeet',
        'portfoliolist': [{
            "portfolioslist": ["12336745", "53367461", "3888332", "92174565", "12336749"],
            "dataType": "clickablelist"
        }],
        // "portfolioDtl": portfolioDtl,
        'speechText': 'List of Available portfolios'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "List of Available portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "List of Available portfolios"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processPortfoliocheckboxRequest(data, contexts, res) {

    console.log('inside processPortfoliocheckboxRequest');

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeet',
        'portfoliocheckboxlist': {
            "multOptions": ["12336745", "53367461", "3888332", "92174565", "12336749"],
            "dataType": "checkboxText"
        },
        // "portfolioDtl": portfolioDtl,
        'speechText': 'Select portfolios for Comparision'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Select portfolios for Comparision",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Select portfolios for Comparision"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processHistoryRequest(data, contexts, res) {

    console.log('inside history');

    console.log(contexts);
    console.log(contexts[0].name);

    var datareturn = {
        // 'username':JSON.parse(contexts[0].name).name,
        'username': 'abhijeeet',
        'portfolioDetails': 'Advisory Portfolio',
        'richDataSrc': 'http://2010annualreport.edprenovaveis.pt/images/economic_portfolio_graph1.png',
        'speechText': 'List of available portfolios'
    };

    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Portfolio History is returned from services",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio History Service"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;

}

function processAccountRequest(data, res) {
    var result = {
        "speech": "Portfolio account is returned from services",
        "displayText": "Portfolio account is returned from services",
        "data": JSON.stringify(data),
        "contextOut": [],
        "source": "Portfolio account Service"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processWelcomeRequest(data, contexts, res) {

    var datareturn = {
        'botname': 'Dobby',
        'username': 'abhijeet',
        'botFeatures': {
            "featurelist": ['Portfolio Management', 'Virtual Credit card'],
            "dataType": "clickablelist"
        },
        // "portfolioDtl": portfolioDtl,
        'speechText': 'Dobby welcomes you'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Dobby welcomes you",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Dobby welcomes you"
    };

    console.log(result);

    res.send(JSON.stringify(result));

    return result;
}


function processFaqRequest(data, res) {

    var datareturn = {
        'botname': 'Dobby',
        'features': ['Portfolio Management', 'Virtual Credit card'],
        'whatelse': 'I am working on more functionality',
        'speechText': 'I can help you with you these things'
    };


    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Portfolio FAQ is returned from services",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio FAQ Service"
    };

    console.log(result);

    res.send(JSON.stringify(result));

    return result;
}
//wait for a connection
app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running. Point your browser to: http://localhost:3000');
});