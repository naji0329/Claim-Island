import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
  WeiboShareButton,
  WeiboIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

export const SocialMediaButtons = (props) => {
  const { assetId, assetName } = props;

  const sharedUrl = `${window.location.origin}/saferoom/${assetName.toLowerCase()}/inspect/${assetId}`;
  const title = `${assetName} #${assetId} - Clam Island`;

  return (
    <div className="dropdown dropdown-hover cursor-pointer">
      <div tabIndex="0" className="flex justify-end ml-4">
        <FontAwesomeIcon icon={faShareAlt} size="lg" />
      </div>
      <div className="dropdown-content pt-2">
        <div className="flex bg-gray-900 p-2 rounded-lg">
          <FacebookShareButton className="mr-2" url={sharedUrl} quote={title}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton className="mr-2" url={sharedUrl} title={title}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <TelegramShareButton className="mr-2" url={sharedUrl} title={title}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <RedditShareButton className="mr-2" url={sharedUrl} title={title}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <PinterestShareButton className="mr-2" url={sharedUrl} description={title}>
            <PinterestIcon size={32} round={true} />
          </PinterestShareButton>
          <WhatsappShareButton className="mr-2" url={sharedUrl} title={title}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <LineShareButton className="mr-2" url={sharedUrl} title={title}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <WeiboShareButton className="mr-2" url={sharedUrl} title={title}>
            <WeiboIcon size={32} round={true} />
          </WeiboShareButton>
          <EmailShareButton url={sharedUrl} subject={title}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};
