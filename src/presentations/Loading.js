import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import Proptypes from 'prop-types';
import color from '../theme/color';

const Loading = ({ visible }) => (
  <Spinner 
    visible={visible} 
    size='large'
    color={color.primary}
    overlayColor='rgba(0, 0, 0, 0.7)'
  />       
);

Loading.proptypes = {
  visible : Proptypes.bool.isRequired,
};

const mapStateToProps = state => ({
  visible: state.loading,
});

export default connect(mapStateToProps, null)(Loading);