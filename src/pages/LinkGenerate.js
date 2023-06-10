import React, { useState } from 'react';
import { Button } from '@mui/material';
import './Admin.css';
import { Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';

const LinkGenerate = () => {
  const [isLinkGenerated, setIsLinkGenerated] = useState(false);
  const [publishingLink, setPublishingLink] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  function generate(length) {
    let chars =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      result = '';
    for (var i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  const genereateLink = () => {
    const videoMeetLinkBaseUrl = 'https://video-meetings-942ca.web.app/';
    const videoMeetLink = videoMeetLinkBaseUrl + generate(5);

    setPublishingLink(videoMeetLink);
    setIsLinkGenerated(true);
  };

  const handleCopy = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(publishingLink);
    } else {
      document.execCommand('copy', true, publishingLink);
    }
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 1500);
  };

  return (
    <div>
      {isLinkGenerated ? (
        <div className='outerUrlContainer'>
          <h4 className='urlHeading'>Virtual Conference Link: </h4>
          <div className='copyUrlContainer'>
            <p className='urlLink'>{`${publishingLink}`} </p>{' '}
            <Tooltip title={isLinkCopied ? 'Copied!' : 'Copy Link'}>
              {!isLinkCopied ? (
                <ContentCopyIcon className='urlLogo' onClick={handleCopy} />
              ) : (
                <ContentCopyTwoToneIcon className='urlLogo' />
              )}
            </Tooltip>
          </div>
        </div>
      ) : (
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
          sx={{ backgroundColor: '#243f5f' }}
          onClick={genereateLink}
        >
          Click to generate Virtual Conference Link
        </Button>
      )}
    </div>
  );
};

export default LinkGenerate;
