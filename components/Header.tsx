import React from 'react';
import { Button, Grid, Text, Container } from '@nextui-org/react';
import Link from 'next/link';

type Props = {};

export default function Header({}: Props) {
  return (
    <Container lg>
      <Grid.Container gap={2} alignItems="flex-end" justify="space-between">
        <div>
          {/* <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $blue500 -20%, $pink500 50%',
            }}
            weight='bold'
          >
            Los
          </Text> */}
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $purple500 -20%, $pink500 100%',
            }}
            weight='bold'
          >
            Soluciones
          </Text>
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $yellow500 -20%, $red500 100%',
            }}
            weight='bold'
          >
            finalistas
          </Text>
        </div>
        <Button.Group color="secondary" size="md">
          <Link href="/C038GAYPZD5" passHref>
            <Button>4-voting-challenge-01</Button>
          </Link>
          <Link href="/C038Q9Q47PY" passHref>
            <Button>4-voting-challenge-02</Button>
          </Link>
          <Link href="/C038QA2T0SJ" passHref>
              <Button>4-voting-challenge-03</Button>
          </Link>
        </Button.Group>
      </Grid.Container>
    </Container>
  );
}
