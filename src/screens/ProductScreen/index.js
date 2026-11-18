import React, { Component } from 'react';
import { FlatList, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { CATEGORIES, categoryOf } from '../../data/categories';
import styles from './styles';
import ProductCard from '../../components/Sections/ProductCard';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { vh,vw } from '../../utils/Units';
import MainInput from '../../components/Input/MainInput';
import CircularBold from '../../components/Text/CircularBold';
import PoppinsRegular from '../../components/Text/PoppinsRegular';
import { icons } from '../../assets/images';
import FoodSlider from '../../components/Sections/FoodSlider';
class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      category: 'all',
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
  _renderCategories = (menu) => {
    // Only show categories that have dishes on today's menu
    const available = CATEGORIES.filter(
      (category) => category.key === 'all' || menu.some((food) => categoryOf(food) === category.key),
    );
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {available.map((category) => {
          const selected = this.state.category === category.key;
          return (
            <TouchableOpacity
              key={category.key}
              activeOpacity={0.8}
              onPress={() => this.setState({ category: category.key })}
              style={[
                styles.chip,
                { backgroundColor: selected ? category.color : category.background },
              ]}
            >
              <Text style={styles.chipEmoji}>{category.emoji}</Text>
              <Text style={[styles.chipText, { color: selected ? 'white' : category.color }]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  render() {
    var menu = this.props.all_product_list || []
    var item = this.state.category === 'all'
      ? menu
      : menu.filter((food) => categoryOf(food) === this.state.category)
    const activeCategory = CATEGORIES.find((category) => category.key === this.state.category)
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
  <FlatList
  showsVerticalScrollIndicator={false}
  data={item}
  renderItem={this._renderProductList}
  // showsVerticalScrollIndicator={false}
  // horizontal={true}
  numColumns={2}
  keyExtractor={item=>item.id}
  contentContainerStyle={styles.listContent}
  ListHeaderComponent={
    <View>
      {/* Featured banners only on the full menu, not while searching */}
      {this.state.keyword.trim() === '' && (
        <View style={styles.sliderWrap}>
          <FoodSlider items={menu}/>
        </View>
      )}
      <View style={styles.sliderWrap}>
        {this._renderCategories(menu)}
      </View>
      <View style={styles.sectionHeader}>
        <CircularBold style={styles.sectionTitle}>
          {this.state.keyword.trim() !== ''
            ? 'Search Results'
            : this.state.category === 'all' ? "Today's Menu" : activeCategory.label}
        </CircularBold>
        <PoppinsRegular style={styles.sectionCount}>
          {(item || []).length} items
        </PoppinsRegular>
      </View>
    </View>
  }
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
