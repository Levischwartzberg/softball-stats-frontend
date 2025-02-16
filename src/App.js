import './App.css';
import SoftballStatsApp from "./pages/SoftballStatsApp";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <SoftballStatsApp />
        </Provider>
    </div>
  );
}

export default App;
