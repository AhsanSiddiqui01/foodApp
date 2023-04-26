import { createStackNavigator } from '@react-navigation/stack';
import OrderListScreen from '../screens/OrderListScreen';
import { getNavigationOptions } from './NavigationOptions';
const OrderNavigator = createStackNavigator();

const OrderStack = () => {
    return (
        <OrderNavigator.Navigator screenOptions={getNavigationOptions}>
            <OrderNavigator.Screen component={OrderListScreen} name='OrderList'/>
        </OrderNavigator.Navigator>
    )
}
export default OrderStack
