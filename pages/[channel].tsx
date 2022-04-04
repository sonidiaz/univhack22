
import { Container, Grid } from '@nextui-org/react';
import { useRouter  } from 'next/router'
import React, { useEffect,useState } from 'react'
import Messages from '../components/Messages';
import SlackConnect from '../services/slackConnect';
import styles from '../styles/Home.module.css';



type Props = {}

const Channel = (props: Props) => {
  const params:{} = useRouter()
  const SlConnect = new SlackConnect();
  const [listPublications, setlistPublications] = useState([]);
  useEffect(() => {
    (async() => {
      const data = await SlConnect.getMessageChannel(params.query.channel);
      setlistPublications(data);
    })()
  }, [params.query.channel]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Container lg>
          <Grid.Container gap={2} justify='center'>
            <Messages messages={listPublications} />
          </Grid.Container>
        </Container>
      </main>
    </div>
  )
}

export default Channel