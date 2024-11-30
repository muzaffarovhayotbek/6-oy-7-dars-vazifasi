import './Card.css';

function Card(props) {
  const { code, info, type } = props;
  return (
    <div className="main">
      <h3>{code}</h3>
      <span>{info}</span>
      <p>{type}</p>
    </div>
  );
}

export default Card;
