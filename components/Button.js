import { primary } from '@/lib/colors'
import styled, { css } from 'styled-components'

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  cursor: pointer;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.$block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.$white && !props.$outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.$white && props.$outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.$black && !props.$outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.$black && props.$outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.$primary && !props.$outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color: #fff;
  `}
  ${props => props.$primary && props.$outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
  `}
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

const Button = (props) => {
  return (
    <StyledButton {...props}>{props.children}</StyledButton>
  )
}

export default Button
