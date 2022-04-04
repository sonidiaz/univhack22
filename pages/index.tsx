import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { Grid, Container } from '@nextui-org/react';
import SlackConnect from '../services/slackConnect'
import Messages from '../components/Messages';

const Home: NextPage = () => {
  const SlConnect = new SlackConnect();
  const channelHar = ['C038QA2T0SJ', 'C038Q9Q47PY']
  const [listPublications, setlistPublications] = useState([]);
  useEffect(() => {
      (async() => {
        const data = await SlConnect.getMessageChannel(channelHar[0]);
        setlistPublications(data);
      })()
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Container>
          <Grid.Container gap={2} justify='center'>
            <Messages messages={listPublications} />
          </Grid.Container>
        </Container>
      </main>
    </div>
  );
};

export default Home;
