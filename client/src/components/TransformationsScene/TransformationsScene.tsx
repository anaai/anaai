import { Box, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { TransformationCard } from 'components/TransformationCard/TransformationCard';
import { useStyles } from './TransformationsScene.styles';
import { Transformation } from 'models/Transformations.model';

export const TransformationsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const {
    state: { transformations }
  } = useWallet();

  return (
    <Box className={classes.root} data-testid="TransformationsScene-root-container">
      {transformations && (
        <>
          <Typography variant="h2" gutterBottom>
            Transformations
          </Typography>
          {transformations.map((transformation) => (
            <TransformationCard
              key={transformation.name}
              transformation={transformation as Transformation}
            />
          ))}
        </>
      )}
    </Box>
  );
};
