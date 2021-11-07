import { Box, Button } from '@material-ui/core';
import { useStyles } from './Footer.styles';
import DiscordIcon from 'assets/images/icons/discord-icon.svg';
import TwitterIcon from '@material-ui/icons/Twitter';
import MailIcon from '@material-ui/icons/Mail';

export const Footer: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const handleDiscordClick = () => openInNewTab('https://discord.gg/BevCBhDv');
  const handleTwitterClick = () => openInNewTab('https://twitter.com/anaai_art');
  const handleEmailClick = () => openInNewTab('mailto:milan.keca@anaai.art');

  return (
    <Box className={classes.root} data-testid="Footer-root-container">
      <Box className={classes.footerContentContainer}>
        <Button
          size="small"
          onClick={handleDiscordClick}
          className={classes.socialbutton}
          endIcon={<img className={classes.icon} src={DiscordIcon} alt="discord" />}
        >
          Discord
        </Button>
        |
        <Button
          size="small"
          onClick={handleTwitterClick}
          className={classes.socialbutton}
          endIcon={<TwitterIcon />}
        >
          Twitter
        </Button>
        |
        <Button
          size="small"
          onClick={handleEmailClick}
          className={classes.socialbutton}
          endIcon={<MailIcon />}
        >
          eMail
        </Button>
      </Box>
    </Box>
  );
};
