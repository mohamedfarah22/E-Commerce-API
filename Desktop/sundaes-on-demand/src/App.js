import Container from "react-bootstrap/ Container";
import OrderEntry from "./pages/OrderEntry";
import { OrderDetailsProvider } from "./Context/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* confirmation page does not need provider*/}
    </Container>
  );
}

export default App;
