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

  const shareUrl = window.location.href;
  const title = `${assetName} #${assetId} - Clam Island"`;

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex="0" className="w-16 flex justify-end p-2">
        <FontAwesomeIcon className="cursor-pointer" icon={faShareAlt} />
      </div>
      <div className="dropdown-content">
        <div className="flex bg-gray-900 p-2 rounded-lg">
          <FacebookShareButton className="mr-2" url={shareUrl} quote={title}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton className="mr-2" url={shareUrl} title={title}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <TelegramShareButton className="mr-2" url={shareUrl} title={title}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <RedditShareButton className="mr-2" url={shareUrl} title={title}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <PinterestShareButton className="mr-2" url={shareUrl} description={title}>
            <PinterestIcon size={32} round={true} />
          </PinterestShareButton>
          <WhatsappShareButton className="mr-2" url={shareUrl} title={title}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <LineShareButton className="mr-2" url={shareUrl} title={title}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <WeiboShareButton className="mr-2" url={shareUrl} title={title}>
            <WeiboIcon size={32} round={true} />
          </WeiboShareButton>
          <EmailShareButton url={shareUrl} subject={title}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};
