import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface ILoaderProps {
  inverted?: boolean;
  content?: string;
}

export default function ContentLoader({ inverted = true, content = 'Loading...' }: ILoaderProps): JSX.Element {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={ content} />
    </Dimmer>
  );
}