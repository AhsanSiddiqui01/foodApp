// import { createStackNavigator } from "@react-navigation/stack";
// import { getNavigationOptions } from "./NavigationOptions";
// import History from "../screens/HistoryScreen";
// const HistoryNavigator = createStackNavigator()
// const HistoryStack = () => {
//     return(
//         <HistoryNavigator.Navigator screenOptions={{getNavigationOptions}}>
//             <HistoryNavigator.Screen name="EmployeeProfile" component={History}/>
//         </HistoryNavigator.Navigator> 
//     )
// }

// export default HistoryStack

import { createStackNavigator } from '@react-navigation/stack';
import History from '../screens/HistoryScreen'
import { getNavigationOptions } from './NavigationOptions';
const HistoryNavigator = createStackNavigator();

const HistoryStack = () => {
    return (
        <HistoryNavigator.Navigator screenOptions={getNavigationOptions}>
            <HistoryNavigator.Screen component={History} name='History'/>
        </HistoryNavigator.Navigator>
    )
}
export default HistoryStack
