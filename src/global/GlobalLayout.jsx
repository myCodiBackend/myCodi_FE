import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return (
    <div>
      <StGlobalLayout>{children}</StGlobalLayout>
    </div>
  );
};

const StGlobalLayout = styled.div`
  width: 100%;
  border: 1px solid red;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
`;

export default GlobalLayout;
