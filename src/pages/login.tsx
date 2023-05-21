import { CssBaseline, Grid, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import LoginForm from "../modules/login/components/login-form";

interface Props {
}

const defaultTheme = createTheme();

export default function Login(props: Props) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/soccer-wallpapper.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <LoginForm />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}