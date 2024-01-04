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
      boxSizing: 'border-box',
      backgroundColor: index === carriage - 1 ? 'orange' : 'white',
      }}
  >{index + 1}</div>
  ));

  return (
    <>
      <div style={{ display: 'flex', paddingLeft: '16px', paddingRight: '16px' }}><div style={{
        height: '30px',
        width:'40px',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'white',
          WebkitClipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
        }}></div>
      </div>{boxes}</div>
    </>
  )
}