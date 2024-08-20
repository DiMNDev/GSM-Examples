import React from "react";

type Props = {
  username: string;
};

const WelcomeMessage = (props: Props) => {
  return <div className="text-[32px]">{`Welcome, ${props.username}`}</div>;
};

export default WelcomeMessage;
