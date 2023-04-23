import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const lightTheme = createTheme({
    palette: {
        mode:'light',
        background: {
            default: '#b9d2dc'
        },
        primary: {
            main: '#4a148c'
        },
        secondary:{
            main: '#19857b'
        },
        error:{
            main: red.A400
        },
    },

    components:{
        MuiAppBar:{
            defaultProps:{
                elevation: 0
            },
            styleOverrides:{
                root:{
                    backgroundColor: '#aaa1c8',
                }
            }
        }

    }
});