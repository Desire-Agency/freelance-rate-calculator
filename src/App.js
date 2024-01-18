import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import MoveCalcItem from './MoveCalcItem/MoveCalcItem';
import MoveCalcItemTwoCol from './MoveCalcItemTwoCol/MoveCalcItemTwoCol';

const router = createBrowserRouter([
  {
    path: "one-col",
    element: (
      <MoveCalcItem />
    ),
  },
  {
    path: "two-cols",
    element: <MoveCalcItemTwoCol />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
