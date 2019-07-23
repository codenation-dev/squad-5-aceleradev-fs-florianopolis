import styled from "styled-components";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

export const ExpansionPanelStyled = styled(ExpansionPanel)`
  margin-bottom: 15px;
  border-radius: 25px !important;
  background-color: #ecf0f5 !important;
  ::before {
    background-color: #fff !important;
  }
`;

export const ExpansionPanelDetailsStyled = styled(ExpansionPanelDetails)`
  /* background-color: #fff !important; */
  margin: 0px 15px;
  padding: 0px !important;
`;
export const ClienteName = styled.div`
  border-bottom: 1px solid #ecf0f5;
`;
