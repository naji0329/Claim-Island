import React, { useState, useEffect } from "react";
import { web3 } from "../web3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Progress, Button } from "reactstrap";
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Badge, Form, FormGroup, Label, Input
} from "reactstrap";

import { ToastContainer, toast } from 'react-toastify';

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
    const [hasAccountVoted, setAlreadyVoted] = useState(false);
    const [oneVotes, setOneVotes] = useState(50);
    const [twoVotes, setTwoVotes] = useState(80);
    const [threeVotes, setThreeVotes] = useState(120);

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
      try {
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
      } catch (e) {
        const formatError = !!e.message.split('"message": "')[1]
          ? e.message.split('"message": "')[1].split('",')[0]
          : e.message;
        toast(`There was an error during voting. ${formatError}`);
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
      const val = votes / sum * 100;
      return val;
    } else {
      return 0;
    }
  }

    return (
        <div>
        <ToastContainer />

        <Modal isOpen={modal} centered={true} size="lg" toggle={toggle} className="voting-modal" backdrop={false}>
            <ModalHeader toggle={toggle}>
                When should $SHELL be unlocked ?
            </ModalHeader>
            <ModalBody>
                {hasAccountVoted ? 
                  <ul style={{listStyle: 'none'}}>
                      <li>
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <div style={{width: '100%'}}>
                              <span style={{float: 'right'}}>{getPercVotes(oneVotes)}% ({oneVotes} votes)</span>
                              <span style={{float: 'left'}}>Immediately</span>
                            </div>
                            <Progress style={{clear: 'both'}} striped value={getPercVotes(oneVotes)} barStyle={{backgroundColor: '#3869d9'}}/>
                          </div>
                      </li>
                      <li>
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <div style={{width: '100%'}}>
                              <span style={{float: 'right'}}>{getPercVotes(twoVotes)}% ({twoVotes} votes)</span>
                              <span style={{float: 'left'}}>After Clam Presale</span>
                            </div>
                            <Progress style={{clear: 'both'}} striped value={getPercVotes(twoVotes)} barStyle={{backgroundColor: '#fdefc6'}}/>
                          </div>
                      </li>
                      <li>
                          <div style={{display: 'inline-block', width: '90%', marginLeft: '3%'}}>
                            <div style={{width: '100%'}}>
                              <span style={{float: 'right'}}>{getPercVotes(threeVotes)}% ({threeVotes} votes)</span>
                              <span style={{float: 'left'}}>When Clam Island Opens</span>
                            </div>
                            <Progress style={{clear: 'both'}} striped value={getPercVotes(threeVotes)} barStyle={{backgroundColor: '#23d0e3'}}/>
                          </div>
                      </li>
                  </ul>
                : <ul style={{listStyle: 'none'}}>
                    <li style={{marginBottom: '10px', display: 'inline-block', marginRight: '10px'}}>
                      <Button
                        color="primary"
                        style={{backgroundColor: '#3869d9'}}
                        onClick={() => vote(connectedAccount, 1)}>Immediately</Button>
                    </li>
                    <li style={{marginBottom: '10px', display: 'inline-block', marginRight: '10px'}}>
                      <Button
                        color="warning"
                        style={{backgroundColor: '#fdefc6'}}
                        onClick={() => vote(connectedAccount, 2)}>After Clam Presale</Button>
                    </li>
                    <li style={{marginBottom: '10px', display: 'inline-block', marginRight: '10px'}}>
                      <Button
                        color="primary"
                        style={{backgroundColor: '#23d0e3'}}
                        onClick={() => vote(connectedAccount, 3)}>When Clam Island Opens</Button>
                    </li>
                </ul>
                }
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
        </div>
    )
}

export default Voting;