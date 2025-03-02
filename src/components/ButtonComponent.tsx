import MuiButton, { ButtonProps } from '@mui/material/Button';
import styled from 'styled-components';

export const StyledButton = styled(MuiButton)<ButtonProps>`
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default function ButtonUsage() {
  return <StyledButton variant="contained">Hello world</StyledButton>;
}
