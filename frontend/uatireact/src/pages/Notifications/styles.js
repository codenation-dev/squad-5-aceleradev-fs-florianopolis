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

export const FakeExpand = styled.div`
    display: flex;
    flex-grow: 1;
    padding: 0 24px 0 24px;
    min-height: 48px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    margin-bottom: 15px;
    border-radius: 25px !important;
    background-color: #ecf0f5 !important;
    p{
      margin: 12px 0;
    }
    /* transition: margin 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
`;
