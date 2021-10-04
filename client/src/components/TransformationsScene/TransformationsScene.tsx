import { Box } from '@material-ui/core';
import { TransformationCard } from 'components/TransformationCard/TransformationCard';
import { transformationNames } from 'config/transformations/transformations';
import { useStyles } from './TransformationsScene.styles';

export const TransformationsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="TransformationsScene-root-container">
      {transformationNames.map((transformationName) => (
        <TransformationCard key={transformationName} transformationName={transformationName} />
      ))}
    </Box>
  );
};
