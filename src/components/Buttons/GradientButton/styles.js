const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 12,
        backgroundColor: 'white',
        elevation: 6,
        shadowColor: '#1458C4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    grad:{
        borderRadius: 12,
        // flex:1,
        height: 52,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize: 16,
        letterSpacing: 0.5,
    }
})
export default styles