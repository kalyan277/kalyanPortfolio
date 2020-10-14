'use strict'

const dialogflow = require("dialogflow");
const configkeys = require("../config/keys");
const structjson =require('../../services/structjson');
const projectID =configkeys.googleProjectID;
const credentials ={
    client_email:configkeys.googleClientEmail,
    private_key:configkeys.googlePrivateKey
};
const sessionClient = new dialogflow.SessionsClient({
  projectID: projectID,
  credentials: credentials,
});
const sessionPath = sessionClient.sessionPath(
    configkeys.googleProductID,
    configkeys.dialogFlowSessionId
  );

exports.postDialog = async(req, res) => {
  // The text query request.

 const parameters = req.body.parameters ? req.body.parameters:{};
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: configkeys.dialogFlowSessionLanguageCode,
      },
    },
    queryParams: {
      payload: {
        data: parameters,
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  return res.json(responses);
};

exports.eventDialog = async(req,res)=>{

      try {
           const parameters = req.body.parameters ? req.body.parameters : {};
            //let self = module.exports;
            const request = {
            session: sessionPath,
            queryInput: {
                event: {
                name: req.body.event,
                parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                languageCode: configkeys.dialogFlowSessionLanguageCode,
                },
            },
            };

            let responses = await sessionClient.detectIntent(request);
            return res.json(responses);
      } catch (error) {
          console.log(error);
      }

    }
   

  









