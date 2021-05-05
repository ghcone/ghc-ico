import * as S from "./style";

const SvgIcon = ({ src, width, height }) => (
  <img src={`${src}`} alt={src} with={width} height={height} style={{marginTop: '-30px'}} />
);

export default SvgIcon;
                            