export const CarriageDiagram = ({ carriage }) => {
  const boxes = Array.from({ length: 8 }, (_, index) => (
  <div
      key={index}
      style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '30px',
      border: '1px solid black',
      boxSizing: 'border-box',
      backgroundColor: index === carriage - 1 ? 'orange' : 'white',
      }}
  >{index + 1}</div>
  ));

  return <div style={{ display: 'flex', paddingLeft: '16px', paddingRight: '16px' }}>{boxes}</div>;
}