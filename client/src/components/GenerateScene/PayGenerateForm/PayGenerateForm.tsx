import { ChangeEventHandler, FocusEventHandler, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
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
import { TransformationName } from 'config/transformations/transformations';
import InfoIcon from '@material-ui/icons/Info';

interface PayGenerateFormParams {
  transformationName: TransformationName;
}

export const PayGenerateForm: React.FC<Record<string, unknown>> = () => {
  const { transformationName } = useParams<PayGenerateFormParams>();

  const {
    state: {
      contract,
      transformations,
      accounts,
      loading: { payGenerating: payGeneratingLoading }
    },
    dispatch
  } = useWallet();

  const transformationEntity = transformations?.find(
    (transformation) => transformation.name === transformationName
  );

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
    if (contract && transformationName && transformationEntity) {
      // Loading finish is triggered either on payGenerating error or tokenTransferredEvent
      dispatch(createSetPayGeneratingLoadingAction(true));
      try {
        const payGeneratingResult: PayGeneratingResult = await contract.methods
          .payGenerating(transformationEntity.id, url)
          .send({ from: accounts[0], gas: 1_000_000, value: transformationEntity.price });

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

  const history = useHistory();

  const handleSelectedTransformationTypeChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { value: transformationName }
  }) => {
    transformations && history.replace(`/generate/${transformationName}`);
  };

  const handleBackClick = () => {
    history.goBack();
  };

  const handleTransformationInfoClick = (transfomationName: TransformationName) => {
    history.push(`/transformations/${transfomationName}`);
  };

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onSubmit={handleUrlFormSubmit}
      data-testid="PayGenerateForm-root-container"
    >
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

          {transformations && transformationName && (
            <FormControl component="fieldset" className={classes.transformationFieldset}>
              <FormLabel component="legend">Transformation type</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="selectedTransformationType"
                value={transformationName}
                onChange={handleSelectedTransformationTypeChange}
                className={classes.transformationsRadioGroup}
              >
                {transformations.map((transformation) => (
                  <FormControlLabel
                    className={classes.transformationFormControlLabel}
                    key={transformation.id}
                    value={transformation.name}
                    control={<Radio />}
                    label={
                      <span className={classes.transformationLabelSpan}>
                        {transformation.name}
                        <IconButton
                          onClick={() => handleTransformationInfoClick(transformation.name)}
                        >
                          <InfoIcon />
                        </IconButton>
                      </span>
                    }
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
          Generate Your Art
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
