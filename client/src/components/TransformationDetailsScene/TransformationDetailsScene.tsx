import { Box } from '@material-ui/core';
import { useParams } from 'react-router';
import { useStyles } from './TransformationDetailsScene.styles';

export const TransformationDetailsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  return (
    <Box className={classes.root} data-testid="TransformationDetailsScene-root-container">
      Transformation Details Scene works {id}
    </Box>
  );
};
