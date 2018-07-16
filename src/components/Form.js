import React  from 'react';
import { connect } from 'react-redux';
import {v4} from 'node-uuid';
import Select from './Select';
import GetWeather from './GetWeather';

const API_KEY = '2ac075017f0ce2dec851a88821c340f8';
const userName = 'Hisuich';

class Form extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <form>
                    <Select />      
                    <GetWeather />
                </form>
        );
    }
    }
    

export default connect(state => {
    return {
    }
})(Form);