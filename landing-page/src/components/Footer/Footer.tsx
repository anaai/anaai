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

  const handleDiscordClick = () => openInNewTab('https://discord.gg/MbZTRseVDT');
  const handleTwitterClick = () => openInNewTab('https://twitter.com/anaai_art');
  const handleEmailClick = () => openInNewTab('mailto:milan.keca@anaai.art');

  return (
    <Box className={classes.root} data-testid="Footer-root-container" id="footer-section">
      <Box className={classes.footerContentContainer}>
        <Button
          onClick={handleDiscordClick}
          className={classes.socialbutton}
          endIcon={<img className={classes.icon} src={DiscordIcon} alt="discord" />}
        >
          Discord
        </Button>
        <span>|</span>
        <Button
          onClick={handleTwitterClick}
          className={classes.socialbutton}
          endIcon={<TwitterIcon />}
        >
          Twitter
        </Button>
        <span>|</span>
        <Button onClick={handleEmailClick} className={classes.socialbutton} endIcon={<MailIcon />}>
          eMail
        </Button>
      </Box>
    </Box>
  );
};
