import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import styles from './styles';
import ProductCard from '../../components/Sections/ProductCard';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { vh,vw } from '../../utils/Units';
import MainInput from '../../components/Input/MainInput';
import CircularBold from '../../components/Text/CircularBold';
import PoppinsRegular from '../../components/Text/PoppinsRegular';
import { icons } from '../../assets/images';
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
            placeholder="Search for biryani, burger..."
            leftIcon={icons.search}
            style={styles.inputField}
            onChangeText={(keyword) => this.onStateChange('keyword', keyword)}
          />
        </View>
        <View style={styles.sectionHeader}>
          <CircularBold style={styles.sectionTitle}>Today's Menu</CircularBold>
          <PoppinsRegular style={styles.sectionCount}>
            {(item || []).length} items
          </PoppinsRegular>
        </View>
  <FlatList 
  showsVerticalScrollIndicator={false}
  data={item}
  renderItem={this._renderProductList}
  // showsVerticalScrollIndicator={false}
  // horizontal={true}
  numColumns={2}
  keyExtractor={item=>item.id}
  contentContainerStyle={styles.listContent}
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
