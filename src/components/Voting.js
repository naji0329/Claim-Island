import React, { useState, useEffect } from "react";
import { web3 } from "../web3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Progress, Button } from "reactstrap";
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Badge, Form, FormGroup, Label, Input
} from "reactstrap";

import {
  voteOptionOne,
  voteOptionTwo,
  voteOptionThree,
  votesForOptionOne,
  votesForOptionTwo,
  votesForOptionThree,
  hasAccountedVoted
} from '../web3/communityVoting';

const Voting = () => {
    const [progress, setProgress] = useState(50);
    const [hasAccountVoted, setAlreadyVoted] = useState(false);
    const [oneVotes, setOneVotes] = useState(0);
    const [twoVotes, setTwoVotes] = useState(0);
    const [threeVotes, setThreeVotes] = useState(0);

    const [connectedAccount, setConAccount] = useState('');

    const [modal, setModal] = useState(true);
    const toggle = () => setModal(!modal);

    if(web3 && web3.eth) {
      // detect if account is connected
      web3.eth.getAccounts().then( async (acc) => {
        setConAccount(acc[0] || '');
        const hasVoted = await hasAccountedVoted(acc[0]);
        console.log(hasVoted)
        setAlreadyVoted(hasVoted);
      });
    }

    const vote = async (connectedAccount, option) => {
      let hasVoted;
      switch (option) {
        case 1:
          await voteOptionOne(connectedAccount);
          hasVoted = await hasAccountedVoted(connectedAccount);
          setAlreadyVoted(hasVoted);
          break;
        case 2:
          await voteOptionTwo(connectedAccount);
          hasVoted = await hasAccountedVoted(connectedAccount);
          setAlreadyVoted(hasVoted);
          break;
        case 3:
          await voteOptionThree(connectedAccount);
          hasVoted = await hasAccountedVoted(connectedAccount);
          setAlreadyVoted(hasVoted);
          break;
      
        default:
          break;
      }

    }

  useEffect(() => {
    let isCancelled = false;

    if (hasAccountVoted) {
      async function updateAccData() {
        const oneVotes = await votesForOptionOne(connectedAccount);
        const twoVotes = await votesForOptionTwo(connectedAccount);
        const threeVotes = await votesForOptionThree(connectedAccount);
        setOneVotes(oneVotes);
        setTwoVotes(twoVotes);
        setThreeVotes(threeVotes);
      }
    }
  }, [hasAccountVoted]);

  const getPercVotes = (votes) => {
    const sum = oneVotes + twoVotes + threeVotes;
    if(sum > 0) {
      return votes / sum * 100;
    } else {
      return 0;
    }
  }

    return (
        <Modal isOpen={modal} centered={true} size="lg" toggle={toggle} className="voting-modal">
            <ModalHeader toggle={toggle}>
                When should $SHELL be unlocked ?
            </ModalHeader>
            <ModalBody>
                {hasAccountVoted ? 
                  <ul style={{listStyle: 'none'}}>
                      <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <Progress striped color="danger" value={getPercVotes(oneVotes)}>
                                Immediately {progress}% (oneVotes)
                            </Progress>
                          </div>
                      </li>
                      <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <Progress striped color="danger" value={getPercVotes(twoVotes)}>
                                After Clam Presale {progress}% (twoVotes)
                            </Progress>
                          </div>
                      </li>
                      <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <Progress striped color="danger" value={getPercVotes(threeVotes)}>
                                When Clam Island Opens {progress}% (threeVotes)
                            </Progress>
                          </div>
                      </li>
                  </ul>
                : <ul style={{listStyle: 'none'}}>
                    <li style={{marginBottom: '10px'}}>
                      <Button
                        color="danger"
                        onClick={() => vote(connectedAccount, 1)}>Immediately</Button>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                      <Button
                        color="warning"
                        onClick={() => vote(connectedAccount, 2)}>After Clam Presale</Button>
                    </li>
                    <li style={{marginBottom: '10px'}}>
                      <Button
                        color="success"
                        onClick={() => vote(connectedAccount, 3)}>When Clam Island Opens</Button>
                    </li>
                </ul>
                }
            </ModalBody>
            <ModalFooter>
                {/* {!hasAccountVoted ? 
                  <Button
                      color="success"
                      onClick={() => vote(connectedAccount)}
                      style={{}}>
                  VOTE
                  </Button>
                : ''} */}
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default Voting;