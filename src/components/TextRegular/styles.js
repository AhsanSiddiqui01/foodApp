import { themed } from '../../theme';
import {vh} from './../../utils/Units'

// Built per theme by useStyles / stylesFor (see src/theme)
const makeStyles = (c) => ({
    text:{
        fontSize:2.5*vh,
        color: c.text,
    }
})
export default themed(makeStyles);
