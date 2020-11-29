import React from "react";
import { oauth2 as SMART } from "fhirclient";
import config from "../config"
import { FhirClientContext } from "../FhirClientContext";

/**
 * Typically the launch page is an empty page with a `SMART.authorize`
 * call in it.
 *
 * This example demonstrates that the call to authorize can be postponed
 * and called manually. In this case we use ReactRouter which will match
 * the `/launch` path and render our component. Then, after our page is
 * rendered we start the auth flow.
 */
export default class Launcher extends React.Component {
    static contextType = FhirClientContext;

    /**
     * This is configured to make a Standalone Launch, just in case it
     * is loaded directly. An EHR can still launch it by passing `iss`
     * and `launch` url parameters
     */
    onChangeProvider(event,context) {
        console.log(event.target.value);
        const providerKey = event.target.value
        const fhirconfig = config[event.target.value]

        // put your client id in .env.local (ignored by .gitignore)
        const secret_client_id = "REACT_APP_CLIENT_ID_" + providerKey
        if( secret_client_id in process.env ) {
            fhirconfig.client_id = process.env[secret_client_id]
        }

        const options = {
            clientId: fhirconfig.client_id,
            scope: fhirconfig.scope,
            redirectUri: fhirconfig.redirectUri,

            // WARNING: completeInTarget=true is needed to make this work
            // in the codesandbox frame. It is otherwise not needed if the
            // target is not another frame or window but since the entire
            // example works in a frame here, it gets confused without
            // setting this!
            //completeInTarget: true
        }
        if( fhirconfig.client_id === 'OPEN' ) {
            options.fhirServiceUrl = fhirconfig.url
            options.patientId = fhirconfig.patientId
        } else {
            options.iss = fhirconfig.url
        }

        if(fhirconfig.patientId) {
            context.setPatientId(fhirconfig.patientId)
        }

        alert(`options:  ${JSON.stringify(options)}`)
        SMART.authorize(options);
    }

    renderOptions() {
        return (
            Object.keys(config).map((configKey, index) => {
                return <option key={configKey} >{configKey}</option>;
            })
        );
    }

    render() {
        return (
            <div>
                <span>Use the Selector to select a provider</span> :{" "}
                <select defaultValue="none" onChange={(event) => {
                    this.onChangeProvider(event,this.context)
                }}>
                    <option key="none" value="none" disabled hidden>
                        Select a Provider
                    </option>
                    {this.renderOptions()}
                </select>
            </div>
            )
    }
}
