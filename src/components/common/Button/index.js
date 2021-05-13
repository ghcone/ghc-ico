import * as S from "./styles";

const Button = ({ color, width, children, onClick,bools }) => (
  <S.Button color={color} width={width} onClick={onClick} disabled={bools} >
    {children}
  </S.Button>
);

export default Button;
