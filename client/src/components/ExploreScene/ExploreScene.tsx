import { Box, Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import { useStyles } from './ExploreScene.styles';

const galleryTypes = ['generated', 'bought'] as const;
type GalleryType = typeof galleryTypes[number];

export const ExploreScene: React.FC<Record<string, unknown>> = () => {
  const [selectedGalleryType, setSelectedGalleryType] = useState(
    galleryTypes[galleryTypes.length - 1]
  );

  const handleTabChange = (
    event: React.ChangeEvent<Record<string, unknown>>,
    newValue: GalleryType
  ) => {
    setSelectedGalleryType(newValue);
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      ExploreScene works
      <Tabs value={selectedGalleryType} onChange={handleTabChange}>
        {galleryTypes.map((galleryType) => (
          <Tab key={`${galleryType}-tab`} label={galleryType} value={galleryType} />
        ))}
      </Tabs>
      {galleryTypes.map((galleryType) => (
        <TabPanel
          key={`${galleryType}-panel`}
          selectedGalleryType={selectedGalleryType}
          galleryType={galleryType}
        />
      ))}
    </Box>
  );
};

interface TabPanelProps {
  selectedGalleryType: GalleryType;
  galleryType: GalleryType;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, selectedGalleryType, galleryType, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedGalleryType !== galleryType}
      aria-labelledby={`${galleryType}-images-gallery-tab`}
      {...other}
    >
      {selectedGalleryType === galleryType && children}
    </div>
  );
};
