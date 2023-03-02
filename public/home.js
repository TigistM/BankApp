const { Card } = ReactBootstrap;
const box = {
  
  fontSize: '30px',
  textAlign: 'center'
}
const shadow = {
  background: "#4fcc77",
  boxShadow: "1px 1px 1px 1px #cccd"
}
function Home() {
  return (

    <Card bg="Info" border="info" style={{ width: "30rem" }}>
      <Card.Header>BadBank Landing Module</Card.Header>
      <Card.Title style={{...box,...shadow}}> Welcome to our bank</Card.Title>
      <Card.Img variant="top" src="bank.svg" />
      <Card.Text> You can move around using the navigation bar.</Card.Text>
      {/* <Card.Body>
        {<img src="bank.png" className="img-fluid" alt="Responsive image" />}
      </Card.Body> */}
    </Card>
  );
}