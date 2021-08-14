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
  header: {
    width: width,
    marginBottom: 5,
    borderBottomColor: '#E9E9E9',
    borderBottomWidth: 1,
    padding: 10,
  },
  title: {
    fontFamily: bold,
    fontSize: 22,
    marginVertical: 5,
    color: lgreen,
    marginLeft: 10,
  },
  between: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default style;
