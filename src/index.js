import React, {Component,Fragment} from 'react';
import { Root,StyleProvider } from "native-base";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { Provider } from 'react-redux';
import store from './reducers/';
import App from './App';
import Loading from './presentations/Loading';

export default class PetBenefits extends Component {

    render() {
        return (
        <Provider store={store}>
            <Root>
                <StyleProvider style={getTheme(material)}>
                    <Fragment>
                        <Loading />
                        <App />
                    </Fragment>
                </StyleProvider>
            </Root>
        </Provider>
        );
    }
}
