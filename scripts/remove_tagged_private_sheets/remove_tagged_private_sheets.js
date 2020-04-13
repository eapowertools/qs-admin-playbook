/////////////////////////////////
////// Mandatory variables //////
/////////////////////////////////

const host = '<machine-name> or <FQDN>'
const TAG_TO_SEARCH_FOR = "<TagName>";

/////////////////////////////////
////// Optional variables  //////
/////////////////////////////////

const certificatesPath = 'C:/ProgramData/Qlik/Sense/Repository/Exported Certificates/.Local Certificates/';
const repositoryPort = 4242;
const enginePort = 4747;

/////////////////////////////////
//////        Main         //////
/////////////////////////////////

const enigma = require('enigma.js');
const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const schema = require('./node_modules/enigma.js/schemas/12.67.2.json');

const userHeader = 'UserDirectory=Internal;UserId=sa_api';
const ca = fs.readFileSync(certificatesPath + 'root.pem');
const cert = fs.readFileSync(certificatesPath + 'client.pem');
const key = fs.readFileSync(certificatesPath + 'client_key.pem');

var dateObject = new Date();
var outputFilePath = "output-" + dateObject.toISOString() + ".csv";
var logFilePath = "log-" + dateObject.toISOString() + ".txt";

var defaultHeaders = {
    'X-Qlik-User': userHeader,
    'Content-Type': 'application/json',
    'X-Qlik-Xrfkey': '0123456789ABCDEF'
};

var requestParams = {
    method: '',
    path: "",
    rejectUnauthorized: false,
    host: host,
    port: repositoryPort,
    cert: cert,
    key: key,
    headers: defaultHeaders,
    gzip: true,
    json: true
};

function createSession(appId) {
    return enigma.create({
        schema,
        url: `wss://${host}:${enginePort}/app/engineData`,
        createSocket: url => new WebSocket(url, {
            ca: ca,
            key: key,
            cert: cert,
            headers: {
                'X-Qlik-User': userHeader,
            },
            rejectUnauthorized: false
        }),
    });
}

function createDictionary(listOfSheets) {
    var sheetAppDictionary = [];
    listOfSheets.forEach((sheet) => {
        if (sheetAppDictionary[sheet['app']['id']] == undefined) {
            sheetAppDictionary[sheet['app']['id']] = [sheet['engineObjectId']]

        } else {
            sheetAppDictionary[sheet['app']['id']].push(sheet['engineObjectId']);
        }
    });

    return sheetAppDictionary;
};

function removeSheet(doc, appId, sheetList) {
    var sheetId = sheetList.pop();
    fs.appendFileSync(outputFilePath, appId + ',' + sheetId + '\n');
    fs.appendFileSync(logFilePath, "Removing sheet '" + sheetId + "' from app '" + appId + "'.\n");
    return doc.destroyObject(sheetId).then(() => {
        if (sheetList.length == 0) {
            return;
        } else {
            return removeSheet(doc, appId, sheetList);
        }
    });
}

async function doEngineWork(appSheetsDictionary) {
    var session = createSession();
    for (var app in appSheetsDictionary) {
        await session.open().then((global) => {
            fs.appendFileSync(logFilePath, "Session opened, connecting to app '" + app + "'.\n");
            return global.openDoc(app, "", "", "", true).then((doc) => {
                fs.appendFileSync(logFilePath, "Opened the app.\n");
                return removeSheet(doc, app, appSheetsDictionary[app]);
            });
        }).then(() => {
            session.close();
            fs.appendFileSync(logFilePath, "Session closed.\n");
        }).catch((err) => {
            fs.appendFileSync(logFilePath, "Error opening session: " + err + '\n');
        });
    }
    fs.appendFileSync(logFilePath, "Done.");
};

fs.writeFileSync(outputFilePath, "appId, sheetId\n");
fs.writeFileSync(logFilePath, "Preparing to remove any private sheet with tag '" + TAG_TO_SEARCH_FOR + "'.\n");

try {
    requestParams['method'] = 'GET';
    requestParams['path'] = "/qrs/app/object/full?filter=objectType+eq+'sheet'+and+published+eq+false+and+approved+eq+false+and+tags.name+eq+'" + TAG_TO_SEARCH_FOR + "'&xrfkey=0123456789ABCDEF";
    var req = https.request(requestParams, (res) => {
        var responseString = "";
        var statusCode = res.statusCode;
        res.on('error', function(err) {
            fs.appendFileSync(logFilePath, "Error performing sheet request: " + err + '\n');
        });
        res.on('data', function(data) {
            responseString += data;
        });
        res.on('end', function() {
            if (statusCode == 200) {
                var jsonBody = JSON.parse(responseString);
                if (jsonBody.length > 0) {
                    var dictionary = createDictionary(jsonBody);
                    doEngineWork(dictionary);
                } else {
                    fs.appendFileSync(logFilePath, "No private sheets with tag '" + TAG_TO_SEARCH_FOR + "' found.\nDone.\n");
                    return;
                }
            } else {
                fs.appendFileSync(logFilePath, "Error finding sheets, invalid status code returned - Status code returned was: " + statusCode + '.\n');
            }
        });
    }).on('error', function(requestError) {
        fs.appendFileSync(logFilePath, "Error connecting to server '" + host + "'.\n");
    });
    req.end();
} catch (e) {
    fs.appendFileSync(logFilePath, "Error connecting to server '" + host + "'.\n");
}
