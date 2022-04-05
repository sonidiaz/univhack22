import React from 'react';
import { Grid, Card, Col, Text, Row } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown'
import { Button } from '@nextui-org/react';
function Messages({ messages }: any) {
  const host = 'http://localhost:3000/';
  const bgImage = [
    'bg-premios.jpg',
    'header-premio-abs-conocimiento.png',
    'bg-section-logo.jpg',
  ];
  const getOnlyWinIcon = (data: []) => data.filter((icon: { name: string }) => icon.name === 'vote');

  return messages.map(
    (data: { message: string; files: string; reactions: [], permalink: string }, index: number) => {
      return (
        <Grid xs={12} sm={4} key={index}>
          <Card cover>
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
              <Col>
                <Text
                  size={12}
                  weight='bold'
                  transform='uppercase'
                  color='#ffffffAA'
                >
                  Solucion
                </Text>
                <Text h4 color='white'>
                <div style={{height: "150px", overflow: "hidden"}}>
                  <ReactMarkdown>{data.message}</ReactMarkdown>
                </div>
                </Text>
                <Text>
                  {getOnlyWinIcon(data.reactions).map(
                    (reac: { count: string }, i) => (
                      <Text b color='secondary' key={i} size={80}>
                        {reac.count}
                      </Text>
                    )
                  )}
                </Text>
                {/* <img src={data.thumb_video} alt="" /> */}
                {/* <div>
                  <video width="300px" height="auto" controls src={data.mp4_low}>
                  </video> */}
                {/* </div> */}
                
              </Col>
            </Card.Header>
            <Card.Image
              src={(host === 'http://localhost:3000/' ? 'http://localhost:3000/' : '/') + bgImage[2]}
              height={340}
              width='100%'
              alt='Card image background'
            />
            <Card.Footer>
              <Row wrap='wrap' justify='space-between' align='center'>
                {/* <Text size={24} b>
                  <i className='bx bxs-heart'></i>
                </Text> */}
                
                <Button color="secondary"><a href={data.permalink} rel="noopener noreferrer" target="_blank">Ver Video</a></Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      );
    }
  );
}

export default Messages;
