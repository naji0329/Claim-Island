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

export const SocialMediaButtons = () => {
  const shareUrl = window.location.href;

  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex="0" className="btn btn-ghost btn-sm">
        <FontAwesomeIcon icon={faShareAlt} />
      </div>
      <div className="dropdown-content">
        <div className="flex bg-gray-900 p-2 rounded-lg">
          <FacebookShareButton className="mr-2" url={shareUrl}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton className="mr-2" url={shareUrl}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <TelegramShareButton className="mr-2" url={shareUrl}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <RedditShareButton className="mr-2" url={shareUrl}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
          <PinterestShareButton className="mr-2" url={shareUrl}>
            <PinterestIcon size={32} round={true} />
          </PinterestShareButton>
          <WhatsappShareButton className="mr-2" url={shareUrl}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <LineShareButton className="mr-2" url={shareUrl}>
            <LineIcon size={32} round={true} />
          </LineShareButton>
          <WeiboShareButton className="mr-2" url={shareUrl}>
            <WeiboIcon size={32} round={true} />
          </WeiboShareButton>
          <EmailShareButton url={shareUrl}>
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
        </div>
      </div>
    </div>
  );
};
