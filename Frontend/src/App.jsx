import AddMedicine from "./components/AddMedicine";
import ShowMedicine from "./components/ShowMedicine";
import './App.css';

function App() {
  return (
    <div className="container"> 
      <h2 className="heading" style={{display: "flex", justifyContent: "center"}}>Medicine Store</h2>
      <AddMedicine />
      <ShowMedicine />
    </div>
  );
}


export default App;
