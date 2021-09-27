import { ChangeEventHandler, FocusEventHandler, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import {
  connectToMetaMaskSnackMessage,
  generatePaymentAbandonSnackMessage
} from 'config/snacks/snacks';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import {
  createSetPayGeneratingLoadingAction,
  createSetSnackMessageAction
} from 'contexts/WalletContext/WalletContext.actions';
import { PayGeneratingResult } from 'models/PayGeneratingResult.model';
import { validateAccountConnection, validateUrl } from 'utils/validators';
import { useStyles } from './PayGenerateForm.styles';
import { resolveTransformationById } from 'utils/resolvers';
import { Transformation } from 'models/Transformations.model';

export const PayGenerateForm: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      contract,
      transformations,
      accounts,
      loading: { payGenerating: payGeneratingLoading }
    },
    dispatch
  } = useWallet();

  const [url, setUrl] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('Invalid URL provided');
  const [urlInputTouched, setUrlInputTouched] = useState(false);

  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value }
    } = event;
    setUrl(value);

    const isUrlValid = validateUrl(value);

    setUrlErrorMessage(isUrlValid ? '' : 'Invalid URL provided');
  };
  const handleUrlFocus: FocusEventHandler<HTMLInputElement> = (event) => event.target.select();

  const handleUrlBlur: FocusEventHandler<HTMLInputElement> = () => setUrlInputTouched(true);

  const handlePayGenerating = async () => {
    if (contract && selectedTransformationType) {
      // Loading finish is triggered either on payGenerating error or tokenTransferredEvent
      dispatch(createSetPayGeneratingLoadingAction(true));
      try {
        const payGeneratingResult: PayGeneratingResult = await contract.methods
          .payGenerating(selectedTransformationType.id, url)
          .send({ from: accounts[0], gas: 1_000_000 });

        console.debug('payGeneratingResult: ', payGeneratingResult);
      } catch (error) {
        console.error(error);
        dispatch(createSetPayGeneratingLoadingAction(false));
        dispatch(createSetSnackMessageAction(generatePaymentAbandonSnackMessage));
      }
    }
  };

  const handleUrlFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const isAccountConnected = validateAccountConnection(accounts);
    if (!isAccountConnected) {
      return dispatch(createSetSnackMessageAction(connectToMetaMaskSnackMessage));
    }

    const isUrlValid = validateUrl(url);
    if (isUrlValid) {
      handlePayGenerating();
    }
  };

  const [selectedTransformationType, setSelectedTransformationType] = useState<Transformation>();

  useEffect(() => {
    if (transformations) {
      setSelectedTransformationType(transformations[0]);
    }
  }, [transformations]);

  const handleSelectedTransformationTypeChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value: transformationId }
  }) =>
    transformations &&
    setSelectedTransformationType(resolveTransformationById(transformations, transformationId));

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleUrlFormSubmit}>
      {payGeneratingLoading || (
        <>
          <input
            className={classes.imageUrlInput}
            type="url"
            required
            name="url"
            value={url}
            disabled={payGeneratingLoading}
            onChange={handleUrlChange}
            onFocus={handleUrlFocus}
            onBlur={handleUrlBlur}
            placeholder="Add Image URL here"
          />
          <Typography
            className={`${classes.urlInfoMessage} ${
              urlInputTouched ? classes.urlInfoMessageVisible : ''
            }`}
            variant="body2"
          >
            {`${urlErrorMessage || !url ? urlErrorMessage : 'Ready for Liftoff'} `}
          </Typography>

          {transformations && selectedTransformationType && (
            <FormControl component="fieldset" className={classes.transformationFieldset}>
              <FormLabel component="legend">Transformation type</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="selectedTransformationType"
                value={selectedTransformationType.id}
                onChange={handleSelectedTransformationTypeChange}
              >
                {transformations.map((transformation) => (
                  <FormControlLabel
                    key={transformation.id}
                    value={transformation.id}
                    control={<Radio />}
                    label={transformation.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </>
      )}

      <Box className={classes.ctaButtonsContainer}>
        <Button
          className={classes.payGenerateButton}
          color="primary"
          variant="contained"
          type="submit"
          disabled={payGeneratingLoading}
        >
          Pay Image Generate
        </Button>
        <Button
          className={classes.backButton}
          color="secondary"
          variant="contained"
          onClick={handleBackClick}
        >
          Back
        </Button>
      </Box>
    </form>
  );
};
