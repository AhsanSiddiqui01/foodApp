import React, { Component } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import styles from './styles';
import ProductCard from '../../components/Sections/ProductCard';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { vh,vw } from '../../utils/Units';
import SearchInput from '../../components/Input/SearchInput';
import Banner from '../../components/ImageCarousel/Banner';
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
      setTimeout(async ()=>{
        // navigation.navigate('OurProudct')
        await this.props.getProductLists(data.keyword, success => { }, error => { });
      },2800)
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
          <SearchInput
            placeholder=" Search"
            onChangeText={(keyword) => this.onStateChange('keyword', keyword)}
          />
          <ScrollView>
          <Banner/>
  <FlatList 
  showsVerticalScrollIndicator={false}
  style={{width:92*vw}}
  data={item}
  renderItem={this._renderProductList}
  // showsVerticalScrollIndicator={false}
  // horizontal={true}
  numColumns={2}
  keyExtractor={item=>item.id}
  contentContainerStyle={{paddingBottom:10*vh,paddingTop:2*vh}}
  />
  </ScrollView>
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
