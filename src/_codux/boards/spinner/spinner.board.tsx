import { createBoard } from "@wixc3/react-board";
import { Spinner } from "../../../view/components/Spinner";

export default createBoard({
  name: "Spinner",
  Board: () => <Spinner />,
  isSnippet: true,
});
