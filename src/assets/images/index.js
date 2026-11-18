export const icons = {
    previous: require('./icons/previous.png'),
    hidePasswordGrey: require('./icons/hidePasswordGrey.png'),
    logout: require('./icons/power.png'),
    loadingIcon: require('./icons/fast-food.png'),
    coolIcon: require('./icons/cool.png'),
    checKActive:require('./icons/checkActive.png'),
    checkInactive:require('./icons/checkInactive.png'),
    emptyBaskey:require('./icons/emptyBasket.png'),
    orderCart:require('./icons/writing.png'),
    mail: require('./icons/mail.png'),
    lock: require('./icons/lock.png'),
    search: require('./icons/search.png'),
    plusWhite: require('./icons/plus-white.png'),
    trash: require('./icons/trash.png'),
  };
  export const tabIcons = {
    FoodActive:      require('./tabIcons/tab-food-active.png'),
    FoodInactive:    require('./tabIcons/tab-food.png'),
    OrderActive:     require('./tabIcons/tab-cart-active.png'),
    OrderInactive:   require('./tabIcons/tab-cart.png'),
    HistoryActive:   require('./tabIcons/tab-history-active.png'),
    HistoryInactive: require('./tabIcons/tab-history.png'),
    OrdersActive:    require('./tabIcons/tab-orders-active.png'),
    OrdersInactive:  require('./tabIcons/tab-orders.png'),
    TotalActive:     require('./tabIcons/tab-total-active.png'),
    TotalInactive:     require('./tabIcons/tab-total.png'),

    // powerActive: require('./tabIcons/powerActive.png'),
    // powerInactive: require('./tabIcons/powerInactive.png'),

  };
  export const TitleImages = {
    Logo : require('./TitleImages/login_illustration.png')
  };
  // Food photos bundled with the app; foodList.image can be one of these keys or a full https URL
  export const foodImages = {
    image1:  require('./Food-List/image1.jpg'),
    image2:  require('./Food-List/image2.jpg'),
    image3:  require('./Food-List/image3.jpg'),
    image4:  require('./Food-List/image4.jpg'),
    image5:  require('./Food-List/image5.jpg'),
    image6:  require('./Food-List/image6.jpg'),
    image7:  require('./Food-List/image7.jpg'),
    image8:  require('./Food-List/image8.jpg'),
    image9:  require('./Food-List/image9.jpg'),
    image10: require('./Food-List/image10.jpg'),
    image11: require('./Food-List/image11.jpg'),
    image12: require('./Food-List/image12.jpg'),
    image13: require('./Food-List/image13.jpg'),
    image14: require('./Food-List/image14.jpg'),
    image15: require('./Food-List/image15.jpg'),
    image16: require('./Food-List/image16.jpg'),
    'drink-cola':   require('./Extras/drink-cola.png'),
    'drink-pepsi':  require('./Extras/drink-pepsi.png'),
    'drink-sprite': require('./Extras/drink-sprite.png'),
    'drink-7up':    require('./Extras/drink-7up.png'),
    'drink-fanta':  require('./Extras/drink-fanta.png'),
    'drink-water':  require('./Extras/drink-water.png'),
  };
  export const getFoodImage = (image) => foodImages[image] || { uri: image };
  