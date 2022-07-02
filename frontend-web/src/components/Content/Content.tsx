import { ReactNode } from 'react';
import './style.css';

type ContentProps = {
  children?: ReactNode;
};

export function Content(props: ContentProps) {
  return <div className="content container">{props.children}</div>;
}
