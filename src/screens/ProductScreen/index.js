import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import ProductCard from '../../components/Sections/ProductCard';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { vh,vw } from '../../utils/Units';
import MainInput from '../../components/Input/MainInput';
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', this._getProductLists);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus');
  }

  _getProductLists = () => {
    this.props.getProductLists(
      this.state.keyword,
      (success) => {
        if (success) {
          this.setState({
            refreshing: false,
          });
        }
      },
      (error) => {
        this.setState({
          refreshing: false,
        });
      },
    );
  };
  onStateChange = (type, text) => {
    this.setState({
      [type]: text,
    }, () => this._search());
  };
  _search = async () => {
    try {
      let data = {
        keyword: this.state.keyword,
      };

      const search = await this.props.getProductLists(data.keyword, success => { }, error => { });
    } catch (error) {
      showToast(error);
    }
  };
  _renderProductList = (item) => {
    return <ProductCard foodList={item}/>;
  };
  render() {
    var item = this.props.all_product_list
    return (
      <View style={styles.container}>
        <View style={styles.searhBar}>
          <MainInput
            placeholder=" Search Item"
            style={styles.inputField}
            onChangeText={(keyword) => this.onStateChange('keyword', keyword)}
          />
        </View>
  <FlatList 
  showsVerticalScrollIndicator={false}
  data={item}
  renderItem={this._renderProductList}
  // showsVerticalScrollIndicator={false}
  // horizontal={true}
  numColumns={2}
  keyExtractor={item=>item.id}
  contentContainerStyle={{paddingBottom:10*vh}}
  />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('Product state',state.GeneralReducer.name)
  return {
    all_product_list: state.GeneralReducer.all_product_list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductLists: (keyword,success, error) =>
      dispatch(actions.getProductLists(keyword,success, error)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductList);
