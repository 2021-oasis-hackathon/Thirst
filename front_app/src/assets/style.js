import {Dimensions} from 'react-native';
import {lgreen} from './color';
import {bold} from './font';

const {width, height} = Dimensions.get('window');

const style = {
  navView: {
    borderBottomColor: lgreen,
    paddingBottom: 10,
    borderBottomWidth: 1,
    width: width,
    paddingVertical: 10,
    left: -20,
  },
  navText: {
    fontFamily: bold,
    fontSize: 20,
    marginLeft: 30,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  icon: {
    width: 30,
    height: 29,
  },
};

export default style;
