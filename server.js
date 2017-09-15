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
            "assetClass": "assetClass1",
            "amount": 21.43
        }, {
            "assetClass": "assetClass2",
            "amount": 23.42
        }, {
            "assetClass": "assetClass3",
            "amount": 19.31
        }, {
            "assetClass": "assetClass4",
            "amount": 17.42
        }, {
            "assetClass": "assetClass5",
            "amount": 20.00
        }],
        "ownership": false

    },
    {
        "pid": "12336746",
        "total": 12348.97,
        "growthYTD": -89332.42,
        "prfnPercent": -36.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "7",
        "type": "Discretionary",
        "assetClasses": [{
            "assetClass": "assetClass1",
            "amount": 21.43
        }, {
            "assetClass": "assetClass2",
            "amount": 23.42
        }, {
            "assetClass": "assetClass3",
            "amount": 19.31
        }, {
            "assetClass": "assetClass4",
            "amount": 17.42
        }, {
            "assetClass": "assetClass5",
            "amount": 20.00
        }],
        "ownership": true
    },
    {
        "pid": "12336747",
        "totalAmount": 2432.97,
        "growthYTD": -35.42,
        "prfnPercent": -43.10,
        "managementType": "Dynamik",
        "pfOwner": "Agen Äkbgfeend",
        "money": "EUR",
        "riskProfile": "low",
        "type": "Discretionary",
        "assetClasses": [{
            "assetClass": "assetClass1",
            "amount": 21.43
        }, {
            "assetClass": "assetClass2",
            "amount": 23.42
        }, {
            "assetClass": "assetClass3",
            "amount": 19.31
        }, {
            "assetClass": "assetClass4",
            "amount": 17.42
        }, {
            "assetClass": "assetClass5",
            "amount": 20.00
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
        default:

            console.log('No intents matched');
    }

    // res.send(JSON.stringify(resultVal));

    //debugging output for the terminal
    console.log('request is : ', req.body.result.action, req.body.result.parameters);
});



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
        'speechText': 'Please find Details of your portfolios'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find Details of your portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio History Service"
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

        'speechText': 'Please find comparision Details of your portfolios'
    };

    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find comparision Details of your portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio History Service"
    };
    console.log(result);

    res.send(JSON.stringify(result));
    return result;
}

function processAssetDtlRequest(data, contexts, res) {

    console.log('inside processPortfolioDtlRequest');

    console.log(contexts[0].parameters);
    var selectedportfolioID = contexts[0].parameters.number;
    var portfolioAssetDtl;

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
                "assetClass": "assetClass1",
                "amount": 21.43
            }, {
                "assetClass": "assetClass2",
                "amount": 23.42
            }, {
                "assetClass": "assetClass3",
                "amount": 19.31
            }, {
                "assetClass": "assetClass4",
                "amount": 17.42
            }, {
                "assetClass": "assetClass5",
                "amount": 20.00
            }],
            "ownership": false

        },
        {
            "pid": "12336746",
            "total": 12348.97,
            "growthYTD": -89332.42,
            "prfnPercent": -36.10,
            "managementType": "Dynamik",
            "pfOwner": "Agen Äkbgfeend",
            "money": "EUR",
            "riskProfile": "7",
            "type": "Discretionary",
            "assetClasses": [{
                "assetClass": "assetClass1",
                "amount": 21.43
            }, {
                "assetClass": "assetClass2",
                "amount": 23.42
            }, {
                "assetClass": "assetClass3",
                "amount": 19.31
            }, {
                "assetClass": "assetClass4",
                "amount": 17.42
            }, {
                "assetClass": "assetClass5",
                "amount": 20.00
            }],
            "ownership": true
        },
        {
            "pid": "12336747",
            "totalAmount": 2432.97,
            "growthYTD": -35.42,
            "prfnPercent": -43.10,
            "managementType": "Dynamik",
            "pfOwner": "Agen Äkbgfeend",
            "money": "EUR",
            "riskProfile": "low",
            "type": "Discretionary",
            "assetClasses": [{
                "assetClass": "assetClass1",
                "amount": 21.43
            }, {
                "assetClass": "assetClass2",
                "amount": 23.42
            }, {
                "assetClass": "assetClass3",
                "amount": 19.31
            }, {
                "assetClass": "assetClass4",
                "amount": 17.42
            }, {
                "assetClass": "assetClass5",
                "amount": 20.00
            }],
            "ownership": false
        }
    ];


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
        'speechText': 'Please find Asset Details of your portfolio'
    };
    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Please find Details of your portfolios",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Portfolio History Service"
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
            "portfolioslist": ["12336745", "12336746", "12336747"],
            "dataType": "clickablelist"
        }],
        // "portfolioDtl": portfolioDtl,
        'speechText': 'Please find list of available portfolios'
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


    console.log('processWelcomeRequest');
    console.log(contexts);
    var datareturn = {
        'botname': 'goku',
        'features': ['Portfolio Management', 'Virtual credit card', 'Questions', 'Incident requests'],
        'speechText': 'I can help you with you these things',
        // 'username':JSON.parse(contexts[0].name).name
        'username': 'abhijeeet'
    };


    var result = {
        "speech": JSON.stringify(datareturn),
        "displayText": "Welcome is returned from services",
        "data": JSON.stringify(datareturn),
        "contextOut": [],
        "source": "Welcome Service"
    };

    console.log(result);

    res.send(JSON.stringify(result));

    return result;
}


function processFaqRequest(data, res) {

    var datareturn = {
        'botname': 'goku',
        'features': ['Portfolio Management', 'Virtual credit card', 'Questions', 'Incident requests'],
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