import { Box } from '@material-ui/core';
import { useStyles } from './RootView.styles';
import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Header />

      <Footer />
    </Box>
  );
};
