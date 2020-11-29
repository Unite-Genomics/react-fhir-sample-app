import React from "react";
import { oauth2 as SMART } from "fhirclient";
import { FhirClientContext } from "../FhirClientContext";

export default class FhirClientProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: null,
            error: null
        };
        this.setClient = client => this.setState({ client });
    }

    render() {
        if (this.state.error) {
            return <pre>{this.state.error.message}</pre>;
        }
        return (
            <FhirClientContext.Provider
                value={{
                    client: this.state.client,
                    setClient: this.setClient
                }}
            >
                <FhirClientContext.Consumer>
                    {({ client }) => {
                        if (!client) {
                            SMART.ready()
                                .then(client => {
                                    console.error(`client.getPatientId(): ${client.getPatientId()}`);
                                    console.error(`client.patient.id: ${client.patient.id}`);
                                    this.setState({ client }) }
                                )
                                .catch(error => this.setState({ error }));
                            return null;
                        }
                        return this.props.children;
                    }}
                </FhirClientContext.Consumer>
            </FhirClientContext.Provider>
        );
    }
}
